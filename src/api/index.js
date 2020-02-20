const files = require.context(".", false, /.js$/);
let api = {};
files.keys().forEach(key => {
  if (key === "./fetch.js" || key === "./index.js") {
    return;
  }
  api = { ...api, ...files(key) };
});
export { api };
