import fs from "fs";
const { join } = require("path");
const { globSync } = require("glob");

const licenseHeader = fs.readFileSync(
    join(__dirname, "./license.txt"),
    "utf-8"
);

const copyrightPattern = /Copyright \d{4} ascen/;
const globPattern = "+(scripts|apps)/**/*.+(ts|mjs|cjs|js|tsx|jsx)";

async function readFiles(paths: string[]) {
    const fileContents = paths.map((path) => fs.readFileSync(path, "utf-8"));
    return fileContents.map((text, idx) => ({
        contents: text,
        path: paths[idx],
    }));
}

function addLicenseTag(contents: string) {
    const lines = contents.split("\n");
    let newLines: string[] = [];
    for (const line of lines) {
        if (line.match(copyrightPattern)) {
            const indent = line.split("*")[0]; // Get whitespace to match
            newLines.push(indent + "* @license");
        }
        newLines.push(line);
    }
    return newLines.join("\n");
}

export async function doLicense(write: boolean): Promise<boolean> {
    let count = 0;

    const filesToChange: string[] = globSync(globPattern, {
        ignore: ["**/node_modules/**", "./node_modules/**", "**/dist/**"],
    });

    console.log(`Validating license headers in ${filesToChange.length} files.`);
    const files = await readFiles(filesToChange);

    await Promise.all(
        files.map(({ contents, path }) => {
            let result = contents;

            // Files with no license block at all.
            if (result.match(copyrightPattern) == null) {
                result =
                    licenseHeader.replace(
                        String(new Date().getFullYear() - 1),
                        String(new Date().getFullYear())
                    ) + result;
                console.log(`Adding license to ${path}.`);
            }

            // Files with no @license tag.
            if (result.match(/@license/) == null) {
                result = addLicenseTag(result);
                console.log(`Adding @license tag to ${path}.`);
            }

            if (contents !== result) {
                count++;
                if (write) {
                    fs.writeFileSync(path, result, "utf-8");
                    console.log(`[INSERTED] ${path}.`);
                }
            } else {
                return Promise.resolve();
            }
        })
    );
    if (count === 0) {
        console.log(`No files needed license changes.`);
        return false;
    } else {
        console.log(`[SUCCESS] ${count} files had license headers updated.`);
        return true;
    }
}
