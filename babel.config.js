module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    'preact',
  ],
  plugins: [
    ["module-resolver",{
      "alias":{
        "socket-io-messaging":"./rtcjs/reusable-hooks/socket-io-messaging",
        "email-password-ui":"./authjs/email-password/front-end/email-password-ui",
        "http-response-status":"./http-response-status"
      }
    }],

    '@babel/plugin-transform-runtime',
    ["@babel/plugin-transform-react-jsx", { pragma: "h" }]
  ],
};


/*
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
*/