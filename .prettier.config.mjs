/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */

/**
 * @see https://prettier.io/docs/configuration
 *  
/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
    plugins: [
        "prettier-plugin-packagejson",
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
    importOrder: [
        "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
        "^(next/(.*)$)|^(next$)",
        "^@types/(.*)$",
        "<TYPES>",
        "<TYPES>^<THIRD_PARTY_MODULES>",
        "<THIRD_PARTY_MODULES>",
        "",
        "<TYPES>^@veel",
        "^@veel/(.*)$",
        "<TYPES>^@tanstack",
        "^@tanstack/(.*)$",
        "",
        "<TYPES>^[.|..|~|@]",
        "^@/",
        "^[../]",
        "^[./]",
    ],
    "semi": true,
    "tabWidth": 2,
    "printWidth": 80,
    "singleQuote": true,
    "trailingComma": "es5",
    "jsxSingleQuote": true,
    "bracketSpacing": true,
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "4.4.0",
    tailwindConfig: "./tailwind.config.js",
    tailwindFunctions: ["clsx"],
};

export default config;
