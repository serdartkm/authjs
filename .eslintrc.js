module.exports = {
    "plugins":["jest-dom","prettier","jest"],
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "REACT_APP_SOCKET_URL":true
    },
    "extends": ["plugin:jest-dom/recommended","airbnb","prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "describe":true,
        "it":true,
        "expect":true,
        "afterEach":false,
        "REACT_APP_SOCKET_URL":false
   
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType":"module",
        "ecmaFeatures":{
            "jsx":true
        }
    },
    "rules": {
        "no-unused-vars":[
            2,{
                "args":"none",
                "varsIgnorePattern":"^h|Component|React$"
            }
        ],
        "no-undef":[2,{"args":"none", "varsIgnorePattern":"REACT_APP_SOCKET_URL"}]
        "react/prop-types":"off",
        "react/jsx-filename-extension":"off",
        "react/react-in-jsx-scope":"off",
        "react/jsx-indent":"off",
        "react/button-has-type":"off",
        "react/jsx-one-expression-per-line":"off"
    }}