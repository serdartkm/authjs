module.exports = {
    "plugins":["jest-dom","prettier","jest"],
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ["plugin:jest-dom/recommended","airbnb","prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "describe":true,
        "it":true,
        "expect":true
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
        "react/prop-types":"off",
        "react/jsx-filename-extension":"off",
        "react/react-in-jsx-scope":"off",
        "react/jsx-indent":"off",
        "react/button-has-type":"off"
    }}