import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import swc from "rollup-plugin-swc3";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      swc({ sourceMaps: true }),
      peerDepsExternal(),
      commonjs(),
      resolve({
        // rootDir: "src",
        moduleDirectories: ["src", "node_modules"],
      }),
      json({
        compact: true,
      }),
      terser(),
    ],
    external: ["react", "react-dom", "@stitches/react", "@radix-ui/react-tooltip", "react-xarrows", "zod"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types/index.d.ts", format: "esm" }],
    plugins: [dts({})],
  },
];
