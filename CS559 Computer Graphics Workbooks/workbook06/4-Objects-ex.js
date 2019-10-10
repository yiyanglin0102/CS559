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

function boxex() {
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

    // make 5 boxes of different sizes - all cubes
    let box1 = new T.Mesh(new T.BoxGeometry(1,1,1), new T.MeshStandardMaterial({color:"red"}));
    box1.scale.set(2,2,2);
    let box2 = new T.Mesh(new T.BoxGeometry(1.5,1.5,1.5), new T.MeshStandardMaterial({color:"purple"}));
    let box3 = new T.Mesh(new T.BoxGeometry(1,1,1), new T.MeshStandardMaterial({color:"blue"}));
    let box4 = new T.Mesh(new T.BoxGeometry(1,1,1), new T.MeshStandardMaterial({color:"cyan"}));
    box4.scale.set(0.8,0.8,0.8);
    let box5 = new T.Mesh(new T.BoxGeometry(0.5,0.5,0.5), new T.MeshStandardMaterial({color:"green"}));
    
    // STUDENT: position them into a stack (biggest on the bottom)

    // add the boxes to the scene
    scene.add(box1);
    scene.add(box2);
    scene.add(box3);
    scene.add(box4);
    scene.add(box5);


    document.getElementById("boxex").appendChild(renderer.domElement);
    renderer.render(scene,camera);
}
onWindowOnload(boxex);
