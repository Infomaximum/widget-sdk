//@ts-check

import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";
import semver from "semver";

/**
 *
 * @param {string} input
 * @returns
 */
function normalizePrerelease(input) {
  if (!input || typeof input !== "string") {
    throw new Error("Не должна быть пустая строка");
  }

  const result = input
    .trim()
    .toLowerCase()
    .replace(/_/g, "-") // underscore → dash
    .replace(/[^0-9a-z.-]/g, "-") // запрещённые символы → dash
    .replace(/-+/g, "-") // схлопываем повторяющиеся -
    .replace(/\.+/g, ".") // схлопываем повторяющиеся .
    .replace(/^[.-]+|[.-]+$/g, ""); // убираем точки/дефисы по краям

  const segments = result
    .split(".")
    .filter(Boolean)
    .map((seg) => {
      if (/^\d+$/.test(seg)) {
        return String(Number(seg));
      }
      return seg;
    });

  if (!segments.length) {
    throw new Error("Невалидная версия после нормализации");
  }

  return segments.join(".");
}

const packageJsonPath = resolve(process.cwd(), "package.json");
const packageData = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const baseVersion = semver.valid(packageData.version);

if (baseVersion === null) {
  throw new Error(`Не валидная версия "${packageData.version}"`);
}

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
const branchName =
  execSync("git rev-parse --abbrev-ref HEAD").toString().trim() || commitHash || "unknown";

const version = semver.parse(baseVersion)?.version;

if (!version) {
  throw new Error("Ошибка с определением версии");
}

const newVersion = semver.inc(version, "prerelease", normalizePrerelease(branchName));

if (!newVersion) {
  throw new Error("Ошибка с определением версии");
}

execSync(`npx standard-version --release-as ${newVersion}`, {
  stdio: "inherit",
});
