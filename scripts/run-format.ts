import { exec } from "child_process";
import { doLicense } from "./license";

async function runFormat() {
    const prettierPromise = new Promise<boolean>((resolve) => {
        exec(
            'yarn prettier --write "scripts/**/*.ts"',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error) {
                    resolve(false);
                }
                resolve(true);
            }
        );
    });
    try {
        await prettierPromise;
        await doLicense(true);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

runFormat();
