import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { eslint } from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import globals from 'rollup-plugin-node-globals';
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import alias from '@rollup/plugin-alias';
import { terser } from "rollup-plugin-terser";
import zip from 'rollup-plugin-zip'
"rtcjs/videochat-module-webrtc/lib"
const appPlugin = [
  replace({
    ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    REACT_APP_SOCKET_URL:JSON.stringify(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000')
  }),
  copy({
    targets: [
      { src: 'rtcjs/videochat-module-webrtc/lib/WebRTCVideoChatModule.js', dest: 'rtcjs/rtc-demo/public/videochat-module-webrtc' },
      { src: 'rtcjs/videochat-controller-webrtc/lib/index.js', dest: 'rtcjs/rtc-demo/public/videochat-controller-webrtc' },
      { src: 'rtcjs/videochat-displayer/lib/index.js', dest: 'rtcjs/rtc-demo/public/videochat-displayer' },
      { src: 'rtcjs/videochat-control-displayer/lib/index.js', dest: 'rtcjs/rtc-demo/public/videochat-control-displayer' },
      { src: 'rtcjs/@rtcjs-webrtc-signaling/src/WebRTCSignaling.js', dest: 'rtcjs/rtc-demo/public/rtcjs-webrtc-signaling' },

      { src: 'rtcjs/shareables-webrtc/lib/closeCall.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/createAnswer.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/createOffer.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/destroyRTC.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/initialState.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/rtcStateUpdate.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/servers.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/useDataChannel.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/useMediaStream.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/rtc-demo/server/index.js', dest: 'rtcjs/rtc-demo/public/server' },
      { src: 'rtcjs/@rtcjs-server/index.js', dest: 'rtcjs/rtc-demo/public/rtcjs-server' },
      { src: 'rtcjs/@rtcjs-server-webrtc-signaling/index.js', dest: 'rtcjs/rtc-demo/public/rtcjs-server-webrtc-signaling' },
      { src: 'rtcjs/@rtcjs-server-peer-text-chat/index.js', dest: 'rtcjs/rtc-demo/public/rtcjs-server-peer-text-chat' },
    ]
  }),
  postcss({
    plugins: []
  }),
  resolve({
    browser: true,
    extensions: ['.js', '.jsx', '.json'],
  }),

  commonjs({
    include: ['node_modules/**'],
    exclude: ['node_modules/process-es6/**'],
    namedExports: {
      'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
    },
  }),

  babel({
    runtimeHelpers:true,
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-async-to-generator',
      "@babel/plugin-transform-runtime",
      ["@babel/plugin-transform-react-jsx", { "pragma":"h" }]
    ],
  }),
  globals(),
  terser({sourcemap:false}),
  zip()
];

const globalNames = {

  '@rtcjs/webrtc-signaling': 'SignalingService',
  '@rtcjs/webrtc-peer': 'PeerConnection',
  '@rtcjs/ui': 'VideoClientUI',
  '@rtcjs/contacts': 'Contacts'
}

const externals = ["react", "react-dom", "prop-types"]
export default commandLineArgs => {

  return {
    input: `apps/${process.env.appName}/index.js`,
    external: externals,
    output: [{
      file: `apps/${process.env.appName}/build/index.js`,
      format: 'iife',
      name: "AppOne",
   //   sourcemap: 'inline',
      globals: globalNames,
    },
    {
      file: `public/index.js`,
      format: 'iife',
      name: "AppOne",
    //  sourcemap: 'inline',
      globals: globalNames,
    }
  ],
    plugins: appPlugin,
  }
}
