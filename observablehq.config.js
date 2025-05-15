import {generateHeader} from "@one-data/observable-themes/header";
import {generateFooter} from "@one-data/observable-themes/footer";
import {icon} from "@one-data/observable-themes/use-images";

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

    head: `<link rel="icon" href=${icon} type="image/png" sizes="32x32">`,

    header: generateHeader({title: "ODA Cookbook"}),
    footer: generateFooter(),

    root: "src",
    style: "custom-style.css",

    toc: true
};
