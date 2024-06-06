#!/usr/bin/env node
const pug = require("pug"),
  fs = require("fs"),
  sass = require("node-sass"),
  babel = require("jstransformer")(require("jstransformer-uglify-es"));

const printPretty = true;

const printOutput = (() => {
  let counter = 0;
  return () => {
    if (counter == 1) {
      console.log("Sheet build completed.");
    } else counter++;
  };
})();

// Build CSS
sass.render(
  {
    file: "Source/blades.scss",
    outputStyle: printPretty ? "expanded" : "compressed",
  },
  (error, result) => {
    if (!error) {
      const cssOutput = result.css
        .toString("utf8")
        .replace(/^@charset "UTF-8";\s*/, "")
        .replace(/^\uFEFF/, "");
      fs.writeFile("blades.css", cssOutput, printOutput);
    } else {
      console.log(
        `An error occured in the CSS build.\n${error.line}:${error.column} ${
          error.message
        }`
      );
    }
  }
);

// Build sheet workers
const options = {
  pretty: printPretty,
  translation: JSON.parse(fs.readFileSync("translation.json", "utf8")),
  workers: fs.readFileSync("Source/sheetworkers.js", "utf8").trim(),
};
try {
  options.workers = `(function () {\n${printPretty ? options.workers : babel.render(options.workers).body}}\n)();`;
} catch (err) {
  console.log(
    "jstransformer or jstransformer-babel did not execute successfully. Proceeding without minifying sheet workers. Error message was:"
  );
  console.log(err);
}

// Build HTML
const htmlOutput = pug
  .renderFile("Source/blades.pug", options)
  .trim()
  .replace(/\n+/g, "\n");
fs.writeFile("blades.html", `${htmlOutput}\n`, printOutput);
