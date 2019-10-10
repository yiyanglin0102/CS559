/*jshint esversion: 6 */
// @ts-check

/**
 * Code for page 8
 */

import {onWindowOnload} from "./Libs/helpers.js";

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

function snowman() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(500,500);
    document.getElementById("snowman").appendChild(renderer.domElement);

    // student does the rest.
}
onWindowOnload(snowman);
