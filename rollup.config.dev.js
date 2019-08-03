import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { eslint } from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import globals from 'rollup-plugin-node-globals';

const appPlugin = [
  resolve({
    browser: true,
    extensions: ['.js', '.jsx', '.json'],
  }),

  commonjs({
    include: ['node_modules/**'],
    exclude: ['node_modules/process-es6/**'],
    namedExports: {
      'node_modules/react/index.js': [
        'Children',
        'Component',
        'createElement',
        'isValidElement',
        'cloneElement'
      ],
      'node_modules/react-is/index.js': ['isValidElementType'],
      'node_modules/prop-types/index.js': ['isValidElementType','element','elementType','func','bool','oneOfType'],
      'node_modules/react-dom/index.js': ['render','findDOMNode'],
      'node_modules/react-is/index.js': ['isValidElementType','ForwardRef'],
    },
  }),
  globals(),
  babel({
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-async-to-generator',
    ],
  }),

  replace({
    ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  }),

  serve({
    contentBase: './demo/public',
    port: '10006',
    historyApiFallback: true,
  }),
  livereload('./packages/demo/public'),
];

const libPlugins = [
  eslint(),
  babel({
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-async-to-generator',
    ],
  }),

  replace({
    ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  }),

  resolve(),
  commonjs(),
  globals(),
];

module.exports = [
  {
    input: './demo/client/index.js',
     external: ["react", "react-dom", "prop-types"],
    output: {
      file: './demo/public/index.js',
      format: 'iife',
      sourcemap: 'inline',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        '@rtcjs/webrtc-signaling':'SignalingService',
        '@rtcjs/webrtc-peer':'PeerConnection',
        '@rtcjs/ui':'VideoClientUI',
        '@rtcjs/contacts':'Contacts'
      },
    },
    plugins: appPlugin,
  }

];
