//@ts-check

import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";
import semver from "semver";

const packageJsonPath = resolve(process.cwd(), "package.json");
const packageData = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const baseVersion = semver.valid(packageData.version);

if (baseVersion === null) {
  throw new Error(`Не валидная версия "${packageData.version}"`);
}

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
const branchName =
  execSync("git rev-parse --abbrev-ref HEAD").toString().trim() || commitHash || "unknown";

const newVersion = semver.inc(baseVersion, "prerelease", branchName);

execSync(`npx standard-version --release-as ${newVersion}`, {
  stdio: "inherit",
});
