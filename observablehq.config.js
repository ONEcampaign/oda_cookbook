import { generateHeader } from "@one-data/observable-themes/header-template";

// See https://observablehq.com/framework/config for documentation.
export default {
    // The app’s title; used in the sidebar and webpage titles.
    title: "ODA Cookbook",

    pages: [

        {
            name: "ODA Basics",
            path: "oda-basics"
        },
        {
            name: "ODA Data",
            path: "oda-data",
            pages: [
                {name: "DAC1", path: "oda-data/dac1"},
                {name: "DAC2A", path: "oda-data/dac2a"},
                {name: "CRS", path: "oda-data/crs"},
                {name: "MultiSystem", path: "oda-data/multisystem"}
            ]
        },
        {
            name: "oda-data Package",
            path: "oda-data-package",
            pages: [
                {name: "Tips + tricks", path: "oda-data-package/tips-tricks"},
                {name: "Recipes", path: "oda-data-package/recipes"},
                {name: "Indicators", path: "oda-data-package/indicators"}
            ]
        }
    ],

    // Content to add to the head of the page, e.g. for a favicon:
    head: `<link rel="icon" href="ONE-logo-favicon.png" type="image/png" sizes="32x32">'
      <script src="npm:@one-data/observable-themes/header.js" defer></script>
      <script src="npm:@one-data/observable-themes/footer.js" defer></script>`,

    header: generateHeader({title: "ODA Cookbook"}),
    footer: "",

    root: "src",
    style: "custom-style.css",

    toc: true

    // Some additional configuration options and their defaults:
    // theme: "default", // try "light", "dark", "slate", etc.
    // header: "", // what to show in the header (HTML)
    // footer: "Built with Observable.", // what to show in the footer (HTML)
    // sidebar: true, // whether to show the sidebar
    // toc: true, // whether to show the table of contents
    // pager: true, // whether to show previous & next links in the footer
    // output: "dist", // path to the output root for build
    // search: true, // activate search
    // linkify: true, // convert URLs in Markdown to links
    // typographer: false, // smart quotes and other typographic improvements
    // preserveExtension: false, // drop .html from URLs
    // preserveIndex: false, // drop /index from URLs
};
