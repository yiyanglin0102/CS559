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

function materials() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(500,500);
    document.getElementById("materials").appendChild(renderer.domElement);

    let scene = new T.Scene();

    // make an array of materials
    // student should improve these materials
    let materials = [];

    // Give each material some parameters to create different appearances
    materials[0] = new T.MeshStandardMaterial();
    materials[1] = new T.MeshStandardMaterial();
    materials[2] = new T.MeshStandardMaterial();
    materials[3] = new T.MeshStandardMaterial();
    materials[4] = new T.MeshStandardMaterial();
    materials[5] = new T.MeshStandardMaterial();
    materials[6] = new T.MeshStandardMaterial();
    materials[7] = new T.MeshStandardMaterial();
    materials[8] = new T.MeshStandardMaterial();

    // make spheres to show off the materials
    let geometry = new T.SphereBufferGeometry(1,20,20);

    // array of meshes
    let spheres = [];
    for(let i=0; i<9; i++) {
        spheres[i] = new T.Mesh(geometry, materials[i]);
        spheres[i].position.set( ((i%3)-1)*3, 0, Math.floor(i/3)*3);
        scene.add(spheres[i]);
    }

    // make some lights
    let l1 = new T.DirectionalLight();
    let l2 = new T.PointLight();
    l2.position.set(10,10,10);
    scene.add(l1);
    scene.add(l2);

    // a camera
    let camera = new T.PerspectiveCamera();
    camera.position.set(0,10,10);
    camera.lookAt(0,-2,0);

    renderer.render(scene,camera);
}
onWindowOnload(materials);
