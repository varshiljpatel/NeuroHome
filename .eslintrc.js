module.exports = {
    root: true,
    extends: ["@react-native", "plugin:prettier/recommended"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
        "no-unused-vars": "warn",
    },
};
