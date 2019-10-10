/*jshint esversion: 6 */
// @ts-check

import {onWindowOnload} from "./Libs/helpers.js";


// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

/**
 * Not used
 */
function box1() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(200,200);

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera();
    camera.position.z = 5;

    let object = new T.AxesHelper();
    scene.add(object);

    document.getElementById("box1div").appendChild(renderer.domElement);
    renderer.render(scene,camera);
}
// onWindowOnload(box1);
