import antfu from "@antfu/eslint-config"

export default antfu({
    stylistic: {
        indent: 4,
        quotes: "double",
    },
    typescript: {
        overrides: {
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        },
    },
    jsonc: false,
}, {
    rules: {
        "style/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "comma",
                requireLast: true,
            },
            singleline: {
                delimiter: "comma",
                requireLast: false,
            },
        }],
        "no-console": ["off"],
        "style/brace-style": ["error", "1tbs", {
            allowSingleLine: true,
        }],
        "antfu/top-level-function": ["off"],
    },
})
