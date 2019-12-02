require("dotenv").config();
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import globals from "rollup-plugin-node-globals";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import zip from "rollup-plugin-zip";
import del from "rollup-plugin-delete";
import htmlTemplate from "rollup-plugin-generate-html-template";
import cleanup from "rollup-plugin-cleanup";
import strip from "@rollup/plugin-strip";
import filesize from "rollup-plugin-filesize";
import progress from "rollup-plugin-progress";
const prodPlugins = [
  strip({
    // set this to `false` if you don't want to
    // remove debugger statements
    debugger: true,

    // defaults to `[ 'console.*', 'assert.*' ]`
    functions: ["console.log", "assert.*", "debug", "alert"],

    // remove one or more labeled blocks by name
    // defaults to `[]`
    labels: ["unittest"],

    // set this to `false` if you're not using sourcemaps –
    // defaults to `true`
    sourceMap: true
  }),
  cleanup(),
  terser({ sourcemap: false }),
  zip(),
  filesize()
];
const devPlugins = [
  progress({
    clearLine: false // default: true
  })
];
const commonPlugins = [
  del({ targets: [`apps/${process.env.appName}/build`, "build"] }),
  htmlTemplate({
    template: "apps/html-template/index.html",
    target: `apps/${process.env.appName}/build/index.html`,
    attrs: ['type="module"']
  }),
  replace({
    ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    REACT_APP_SOCKET_URL: JSON.stringify(
      process.env.REACT_APP_SOCKET_URL || "http://localhost:3000"
    )
  }),
  postcss({
    extensions: [".css"],
    plugins: []
  }),
  resolve({
    browser: true,
    extensions: [".js", ".jsx", ".json"]
  }),

  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**"],
    namedExports: {
      "node_modules/preact/dist/preact.js": [
        "h",
        "render",
        "Component",
        "cloneElement",
        "options"
      ]
    }
  }),
  babel({
     runtimeHelpers: true,
    // exclude: "node_modules/**",
    // presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
    // plugins: [
    //   "@babel/plugin-proposal-class-properties",
    //   "@babel/plugin-syntax-dynamic-import",
    //   "@babel/plugin-transform-async-to-generator",
    //   "@babel/plugin-transform-runtime",
    //   ["@babel/plugin-transform-react-jsx", { pragma: "h" }]
    // ]
  }),
  globals()

];

const globalNames = {
  "@rtcjs/webrtc-signaling": "SignalingService",
  "@rtcjs/webrtc-peer": "PeerConnection",
  "@rtcjs/ui": "VideoClientUI",
  "@rtcjs/contacts": "Contacts"
};

const externals = ["react", "react-dom", "prop-types"];
export default commandLineArgs => ({
  input: `apps/${process.env.appName}/index.js`,
  external: externals,
  output: [
    {
      dir: `apps/${process.env.appName}/build`,
      chunkfileNames: [`contents/chunki-[hash].js`],
      format: "es",
      name: "AppOne",
      sourcemap: "inline",
      globals: globalNames
    },
    {
      dir: "build",
      format: "es",
      name: "AppOne",
      sourcemap: false,
      globals: globalNames
    }
  ],
  plugins: [
    ...commonPlugins,
    ...(process.env.NODE_ENV === "production" ? prodPlugins : devPlugins)
  ]
});
