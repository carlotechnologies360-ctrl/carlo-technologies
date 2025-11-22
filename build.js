const fs = require("fs");
const path = require("path");

const filesToCopy = ["index.html", "styles.css", "script.js"];
const srcDir = __dirname;
const distDir = path.join(__dirname, "dist");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(fileName) {
  const srcPath = path.join(srcDir, fileName);
  const destPath = path.join(distDir, fileName);

  if (!fs.existsSync(srcPath)) {
    console.warn(`Skipping ${fileName} (not found)`);
    return;
  }

  fs.copyFileSync(srcPath, destPath);
}

function main() {
  ensureDir(distDir);
  filesToCopy.forEach(copyFile);
  console.log(`Build complete. Files copied to ${distDir}`);
}

main();

