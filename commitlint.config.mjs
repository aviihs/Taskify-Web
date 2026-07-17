/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Keep summaries scannable in `git log --oneline` and PR titles.
    "header-max-length": [2, "always", 100],
    "header-min-length": [2, "always", 10],
    "type-enum": [
      2,
      "always",
      [
        "feat", // a new feature
        "fix", // a bug fix
        "hotfix", // urgent production fix
        "build", // changes to the build system or dependencies
        "merge", // merging branches
        "docs", // documentation only changes
        "chores", // maintenance work that doesn't touch src or tests
      ],
    ],
  },
};
