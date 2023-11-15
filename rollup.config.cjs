const packageJSON = require("./package.json");
const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { dts } = require("rollup-plugin-dts");
const del = require("rollup-plugin-delete");

const externalPackages = [
  ...Object.keys(packageJSON.dependencies || {}),
  ...Object.keys(packageJSON.peerDependencies || {}),
];

const regexesOfPackages = externalPackages.map(
  (packageName) => new RegExp(`^${packageName}(\/.*)?`)
);

/** @type {import("rollup").RollupOptions[]} */
const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/index.esm.js",
        format: "es",
        sourcemap: false,
      },
    ],
    plugins: [
      del({ targets: "dist", hook: "buildStart", runOnce: true }),
      typescript(),
      resolve(),
      commonjs(),
    ],
    external: regexesOfPackages,
  },
  {
    input: "dist/dts/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts(),
      del({ targets: "dist/dts", hook: "buildEnd", runOnce: true }),
    ],
  },
];

module.exports = config;
