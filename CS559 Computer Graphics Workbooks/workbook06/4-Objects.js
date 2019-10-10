/*jshint esversion: 6 */
// @ts-check

/**
 * Code for page 4 - except the exercise
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

function box2() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(400,400);

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera();
    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 5;
    camera.lookAt(0,3,0);

    scene.add(new T.AmbientLight("white",0.2));
    let point = new T.PointLight("white",1,0,0);
    point.position.set(20,10,15);
    scene.add(point);

    // make a ground plane
    let groundBox = new T.BoxGeometry(5,0.1,5);
    let groundMesh = new T.Mesh(groundBox,new T.MeshLambertMaterial( {color:0x888888}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    let box = new T.BoxGeometry(1,1,1);

    let cube1 = new T.Mesh(box,new T.MeshStandardMaterial({color:"purple"}));
    cube1.rotateY(45);
    cube1.position.set(2,0.5,0);
    scene.add(cube1);

    let cube2 = new T.Mesh(box,new T.MeshStandardMaterial({color:"red"}));
    cube2.rotateY(45);
    cube2.translateX(2);
    cube2.translateY(0.5);
    scene.add(cube2);

    document.getElementById("box2").appendChild(renderer.domElement);
    renderer.render(scene,camera);
}
onWindowOnload(box2);


//
function box3()
{
    let renderer = new T.WebGLRenderer();
    renderer.setSize(400,400);

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera();
    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 5;
    camera.lookAt(0,3,0);

    scene.add(new T.AmbientLight("white",0.2));
    let point = new T.PointLight("white",1,0,0);
    point.position.set(20,10,15);
    scene.add(point);

    // make a ground plane
    let groundBox = new T.BoxGeometry(5,0.1,5);
    let groundMesh = new T.Mesh(groundBox,new T.MeshLambertMaterial( {color:0x888888}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    //@@Snippet:objload
    let loader = new T.OBJLoader();
    loader.load('OBJ/astronaut.obj', function(astronaut)
        {
            astronaut.position.set(1.5,4,0);
            astronaut.scale.set(0.5,0.5,0.5);
            scene.add(astronaut);
            // note that we have to render 
            renderer.render(scene, camera);
        });
    //@@Snippet:objload

    document.getElementById("box3").appendChild(renderer.domElement);
    // renderer.render(scene,camera);
}
onWindowOnload(box3);