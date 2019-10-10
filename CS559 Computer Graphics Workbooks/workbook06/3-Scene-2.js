/**
 * Code for Page 2 - Box 2
 */

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

function box2() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(300,300);
    // put the renderer's domElement into the DOM
    document.getElementById("box2div").appendChild(renderer.domElement);

    // make a world
    let scene = new T.Scene();

    // make a camera to look at the world
    let camera = new T.PerspectiveCamera(45,1,2,10);
    camera.position.z = 4;
    camera.position.y = 4;
    camera.position.x = 4;
    camera.lookAt(0,0,0);

    // make a "helper" so we can see the camera
    scene.add(new T.CameraHelper(camera));

    // put an axis mark at the origin
    let object = new T.AxesHelper();
    scene.add(object);

    // make some materials
    let dullGray = new T.MeshLambertMaterial( {color:0x888888}); 
    let redStuff = new T.MeshStandardMaterial( {color:"red"});
    let greenStuff = new T.MeshStandardMaterial( {color:"green"});
    let purpleStuff = new T.MeshStandardMaterial( {color:"purple"});

    // make a ground plane
    let groundBox = new T.BoxGeometry(5,0.1,5);
    let groundMesh = new T.Mesh(groundBox,dullGray);
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    // add some more boxes
    let cube = new T.BoxGeometry(1,1,1);    // small cube
    let m1 = new T.Mesh(cube,redStuff);
    m1.position.y = 0.5;
    m1.position.z = -1.5;
    scene.add(m1);

    let m2 = new T.Mesh(cube,greenStuff);
    m2.position.x = -1.5;
    m2.position.y = 0.5    ;
    scene.add(m2);

    let m3 = new T.Mesh(cube,purpleStuff);
    m3.scale.x = 0.5;
    m3.scale.y = 0.5;
    m3.scale.z = 0.5;
    m3.position.z = -1.5;
    m3.position.y=1.25;
    scene.add(m3);

    // some lights
    scene.add(new T.AmbientLight("white", 0.2));
    
    let light = new T.PointLight("white", 1);
    light.position.y = 5;
    light.position.z = 2.5;
    light.position.x = -2.5;
    scene.add(light);
    scene.add(new T.PointLightHelper(light));

    // draw
    renderer.render(scene,camera);

    //******************************** */
    // the second image
    // make a second renderer for a second view into our world
    let renderer2 = new T.WebGLRenderer();
    renderer2.setSize(300,300);
    // put the renderer's domElement into the DOM
    document.getElementById("box2divB").appendChild(renderer2.domElement);
   
    // make a camera to look at the world
    let camera2 = new T.PerspectiveCamera();
    camera2.position.z = 10;
    camera2.position.y = 5;
    camera2.position.x = -10;
    camera2.lookAt(0,0,0);

     // draw
     renderer2.render(scene,camera2);
}
onWindowOnload(box2);