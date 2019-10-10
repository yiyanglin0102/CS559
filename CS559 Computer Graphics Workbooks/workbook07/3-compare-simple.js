/*jshint esversion: 6 */
// @ts-check

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import {onWindowOnload} from "./Libs/helpers.js";

function threeSimple() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize( 200,200 ); 

    let div = document.getElementById("simple");
    div.appendChild( renderer.domElement );

    let camera = new T.PerspectiveCamera( 50, 1, 0.1, 1000 );
    camera.position.z = 5;

    let scene = new T.Scene();
    let geometry = new T.BoxGeometry( 1, 1, 1 );
    let mat = new T.MeshStandardMaterial( {color:"green"});
    let cube = new T.Mesh( geometry, mat );
    scene.add( cube );

    let ambientLight = new T.AmbientLight ("white", 0.5);
    scene.add( ambientLight );
    let pointLight = new T.PointLight( "white", 1 );
    pointLight.position.set( 25, 50, 25 );
    scene.add( pointLight );

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.z += 0.01;
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
    }
    animate();
}
onWindowOnload(threeSimple);