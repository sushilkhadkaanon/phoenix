#!/usr/bin/env node
/* eslint-disable no-undef */
import esbuild from "esbuild";

import { relay } from "./esbuild.relay.mjs";

let mode = "build";
if (process.argv.length > 2 && process.argv[2] === "dev") {
  mode = "dev";
}
const isDev = mode === "dev";

esbuild
  .build({
    entryPoints: ["src/index.tsx"],
    outfile: "../src/phoenix/server/static/index.js",
    minify: !isDev,
    bundle: true,
    target: ["es2020"],
    jsx: "automatic",
    format: "esm",
    plugins: [relay],
    watch: isDev,
    logLevel: "debug",
    sourcemap: isDev ? "linked" : false,
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error("Failed to build", e);
    process.exit(1);
  });
