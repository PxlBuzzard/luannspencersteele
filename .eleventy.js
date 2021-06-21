module.exports = function(config) {
    // *** Misc imports
    const externalLinksPlugin = require("@hirusi/eleventy-plugin-safe-external-links");
    const markdownIt = require("markdown-it");
    // const typesetPlugin = require("eleventy-plugin-typeset");

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
            host: "0.0.0.0"
        });

    // Copy as-is from root to output path
    // We can avoid this on development env
    if (is11tyStaging || is11tyProduction)
        config.addPassthroughCopy("admin");

    // *** Plugins
    // Typeset
    // config.addPlugin(
    //     typesetPlugin({
    //         only: "#primarycontent"
    //     })
    // );
    // Safe external links
    config.addPlugin(externalLinksPlugin, {
        pattern: "https{0,1}://", // RegExp pattern for external links
        noopener: true, // Whether to include noopener
        noreferrer: true, // Whether to include noreferrer
        files: [
            // What output file extensions to work on
            ".html"
        ]
    });

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
            data: "_data"
        }
    };
};
