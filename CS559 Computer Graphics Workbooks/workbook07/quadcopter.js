/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
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

function quadcopter() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(600,400);
    document.body.appendChild(renderer.domElement);

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera(40, renderer.domElement.width / renderer.domElement.height, 1,1000);

    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 5;
    camera.lookAt(0,0,0);
 
    // since we're animating, add OrbitControls
    let controls = new T.OrbitControls(camera,renderer.domElement);

    scene.add(new T.AmbientLight("white",0.2));

    // two lights - both a little off white to give some contrast
    let dirLight1 = new T.DirectionalLight(0xF0E0D0,1);
    dirLight1.position.set(1,1,0);
    scene.add(dirLight1);

    let dirLight2 = new T.DirectionalLight(0xD0E0F0,1);
    dirLight2.position.set(-1,1,-.2);
    scene.add(dirLight2);

    // make a ground plane
    let groundBox = new T.BoxGeometry(10,0.1,10);
    let groundMesh = new T.Mesh(groundBox,new T.MeshStandardMaterial( {color:0x88B888, roughness:.9}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -.05;
    scene.add(groundMesh);

    // this is the part the student should change
    //** GET RID OF THIS SILLY DONUT! Replace it with an aircraft*/
    let tempGeom = new T.TorusGeometry();
    let tempMaterial = new T.MeshStandardMaterial({color:"red"});
    let tempMesh = new T.Mesh(tempGeom,tempMaterial);
    scene.add(tempMesh);
    tempMesh.scale.set(.5,.5,.5);
    tempMesh.position.y = 2;


    function animateLoop() {
        //** EXAMPLE CODE - STUDENT SHOULD REPLACE */
        // move in a circle 
        let theta = performance.now() / 1000;
        let x = 3 * Math.cos(theta);
        let z = 3 * Math.sin(theta);
        tempMesh.position.x = x;
        tempMesh.position.z = z;

        renderer.render(scene,camera);
        window.requestAnimationFrame(animateLoop);
    }
    animateLoop();
}
onWindowOnload(quadcopter);
