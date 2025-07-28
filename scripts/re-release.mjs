//@ts-check

import { execSync } from "child_process";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
const branchName =
  execSync("git rev-parse --abbrev-ref HEAD").toString().trim() || commitHash || "unknown";

execSync(`npx standard-version --prerelease ${branchName}`, {
  stdio: "inherit",
});
