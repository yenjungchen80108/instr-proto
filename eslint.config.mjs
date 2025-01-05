import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: ["eslint:recommended"],
  }),
  prettierConfigRecommended,
  {
    files: ["**/*.js", "**/*.jsx"], // 針對文件類型
  },
];

export default eslintConfig;
