require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"]
});
require("regenerator-runtime/runtime");
require("isomorphic-fetch");
require("./server");
