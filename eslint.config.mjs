import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ["next/core-web-vitals", "next/typescript", "prettier"],
        ignorePatterns: ["src/generated/**", "docker-data/**"],
        plugins: ["check-file"],
        rules: {
            semi: "warn",
            "prefer-arrow-callback": "warn",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "react/no-unescaped-entities": "off",
            quotes: ["warn", "double"],
            "prefer-template": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "check-file/filename-naming-convention": [
                "error",
                {
                    "**/*.{ts,tsx}": "KEBAB_CASE",
                },
                {
                    // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
                    ignoreMiddleExtensions: true,
                },
            ],
            "check-file/folder-naming-convention": [
                "error",
                {
                    // all folders within src (except __tests__)should be named in kebab-case
                    "src/**/!(__tests__)": "KEBAB_CASE",
                },
            ],
        },
    }),
];

export default eslintConfig;
