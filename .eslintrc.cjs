const disableForClient = process.env.NODE_ENV === "production" ? 0 : 1;

module.exports = {
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
    root: true,
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "react-hooks"],
    rules: {
        "no-unused-vars": "warn",
        "react-hooks/exhaustive-deps": "off",
        "react/jsx-no-undef": "error",
        "react/jsx-curly-brace-presence": ["error", { children: "ignore", props: "never" }],
        "react/jsx-no-bind": [
            "error",
            {
                allowArrowFunctions: true,
            },
        ],
        "react/jsx-no-literals": 0,
        "react/jsx-no-target-blank": disableForClient,
        "react/jsx-no-undef": ["error", { allowGlobals: true }],
        "react/no-deprecated": disableForClient,
        "react/prop-types": 0,
        "prettier/prettier": "off",
        "require-await": "error",
        "space-before-function-paren": 0,
        "no-prototype-builtins": "warn",
    },
};
