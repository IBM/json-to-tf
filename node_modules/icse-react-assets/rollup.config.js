import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "rollup-plugin-commonjs";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

export default {
  input: pkg.source, // entry point for our package (src/index.js)
  output: [
    // where to save (/dist)
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" },
  ],
  plugins: [
    external(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    del({ targets: ["dist/*"] }),
    postcss(),
    commonjs(),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
