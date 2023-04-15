module.exports = function (config) {
  // *** Imports
  const markdownIt = require("markdown-it");

  const is11tyProduction = process.env.ELEVENTY_ENV === "production";
  const is11tyStaging = process.env.ELEVENTY_ENV === "staging";

  // *** Misc Options
  config.addPassthroughCopy("files");
  config.addPassthroughCopy("images");
  config.addPassthroughCopy("css");
  config.addPassthroughCopy("js");

  // *** Forestry CMS Config
  // Run serve on 0.0.0.0 on staging
  if (is11tyStaging)
    config.setBrowserSyncConfig({
      host: "0.0.0.0",
    });

  // Copy as-is from root to output path
  // We can avoid this on development env
  if (is11tyStaging || is11tyProduction) config.addPassthroughCopy("admin");

  // *** Plugins

  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });
  config.setLibrary("md", markdownLibrary);

  return {
    pathPrefix: "/", // useful for GitHub pages
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
