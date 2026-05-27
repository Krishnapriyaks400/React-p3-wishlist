const fs = require("fs");
const path = require("path");

// Rename JS
const jsDir = path.join(__dirname, "build/static/js");
const jsFile = fs
  .readdirSync(jsDir)
  .find((f) => f.startsWith("main") && f.endsWith(".js"));
fs.renameSync(path.join(jsDir, jsFile), path.join(jsDir, "wishlist.js"));

// Rename CSS
const cssDir = path.join(__dirname, "build/static/css");
const cssFile = fs
  .readdirSync(cssDir)
  .find((f) => f.startsWith("main") && f.endsWith(".css"));
fs.renameSync(path.join(cssDir, cssFile), path.join(cssDir, "wishlist.css"));

console.log("Renamed to wishlist.js and wishlist.css");
