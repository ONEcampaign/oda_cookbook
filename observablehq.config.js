// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "ODA Cookbook",

  pages: [

    {
      name: "ODA Basics",
      path: "oda_basics"
    },
    {
      name: "ODA Data",
      path :  "oda_data",
      pages: [
        { name: "DAC1", path:  "oda_data/dac1" },
        { name: "DAC2A", path:  "oda_data/dac2a" },
        { name: "CRS", path:  "oda_data/crs" },
        { name: "Multisystem", path:  "oda_data/multisystem" }
      ]
    },
    {
      name: "oda-data Package",
      path: "oda_data_package",
      pages: [
        { name: "Tips + tricks", path: "oda_data_package/tips_tricks" },
        { name: "Recipes", path: "oda_data_package/recipes" },
        { name: "Background processes", path: "oda_data_package/background_processes"}
      ]
    },
    {
      name: "Indicators",
      path: "indicators"
    }
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32"><link rel="stylesheet" href="./custom-style.css" />',

  // The path to the source root.
  root: "src",

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
