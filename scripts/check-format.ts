import { exec } from "child_process";
import { doLicense } from "./license";

async function checkFormat() {
    const prettierPromise = new Promise<boolean>((resolve) => {
        exec(
            'yarn prettier -c "scripts/**/*.ts" "apps/**/*.ts"',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error) {
                    resolve(true);
                }
                resolve(false);
            }
        );
    });
    const prettierUpdated = await prettierPromise;
    const licensesUpdated = await doLicense(false);
    let exitCode = 0;
    if (licensesUpdated) {
        console.log(
            "[ALERT] License headers were changed. Make sure to run `yarn format:run && yarn format`."
        );
        exitCode = 1;
    }
    if (prettierUpdated) {
        console.log(
            "[ALERT] Formatting needs fixes. Make sure to run `yarn format:run && yarn format`."
        );
        exitCode = 1;
    }
    process.exit(exitCode);
}

checkFormat();
