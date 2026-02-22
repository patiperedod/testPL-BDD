module.exports = {
  default: [
    "--require-module ts-node/register",
    "--require support/**/*.ts",
    "--require steps/**/*.ts"
  ].join(" ")
};