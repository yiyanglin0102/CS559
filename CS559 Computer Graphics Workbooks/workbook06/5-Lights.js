/*jshint esversion: 6 */
// @ts-check

/**
 * Code for page 5 - except the exercise
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

function lights() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(400,400);

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera();
    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 5;
    camera.lookAt(0,3,0);

    // since we're animating, add OrbitControls
    let controls = new T.OrbitControls(camera,renderer.domElement);

    scene.add(new T.AmbientLight("white",0.2));
    let point = new T.PointLight("white",1,0,0);
    point.position.set(20,10,15);
    scene.add(point);

    let spot = new T.SpotLight("white",1,0,Math.PI/15,0); // ,0,Math.PI/9);
    spot.position.set(0,7,0);
    scene.add(spot);
    let sh = new T.SpotLightHelper(spot);
    //scene.add(sh);

    // the directional light comes from the side
    let dir = new T.DirectionalLight("yellow",1);
    dir.position.set(5,0,0);
    scene.add(dir);

    // make a ground plane
    let groundBox = new T.BoxGeometry(6,0.1,6);
    let groundMesh = new T.Mesh(groundBox,new T.MeshStandardMaterial( {color:0x888888}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    /**
     * Make some cubes in various places and orientations
     */

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

    let cube3 = new T.Mesh(box, new T.MeshStandardMaterial({color:"white"}));
    cube3.position.y = 0.5;
    scene.add(cube3);

    let cube4 = new T.Mesh(box, new T.MeshStandardMaterial({color:"white"}));
    cube4.position.set(-2,Math.sqrt(2)/2,2);
    //cube4.lookAt(-2+10,10,2+10);
    scene.add(cube4);

    let cube5 = new T.Mesh(box, new T.MeshStandardMaterial({color:"white"}));
    cube5.position.set(-2,1,-2);
    scene.add(cube5);


    document.getElementById("lights").appendChild(renderer.domElement);

    function draw() {
        let x = 2* Math.cos(Math.PI * 2 * (performance.now() % 1000)/1000);
        cube3.position.z = x;
        cube5.rotateX(0.01);
        cube5.rotateY(0.01);
        renderer.render(scene,camera);
        window.requestAnimationFrame(draw);
    }
    draw();
}
onWindowOnload(lights);


/**
 * Spotlight demo
 */
function spots(div)
{
    let renderer = new T.WebGLRenderer();
    renderer.setSize(400,400);

    document.getElementById(div).appendChild(renderer.domElement);

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera();
    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 5;
    camera.lookAt(0,3,0);

    // since we're animating, add OrbitControls
    let controls = new T.OrbitControls(camera,renderer.domElement);

    scene.add(new T.AmbientLight("white",0.3));

    // make a ground plane
    let groundBox = new T.BoxGeometry(6,0.1,6);
    let groundMesh = new T.Mesh(groundBox,new T.MeshPhongMaterial( {color:0x888888}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    // first spot light: points at the origin
    let spot1 = new T.SpotLight("red");
    spot1.angle = Math.PI/36;       // narrow (5 degrees)
    spot1.position.set(0,4,0);
    // note this uses the default target of 0,0,0
    scene.add(spot1);

    // the second spot light: starts above the center and points closer to the edge
    let spot2 = new T.SpotLight("aqua");
    spot2.angle = Math.PI/36;       // narrow (5 degrees)
    spot2.position.set(0,4,0);
    spot2.target.position.set(2,0,0);
    // we will use the target
    scene.add(spot2.target);
    scene.add(spot2);

    // the third spot light: shines downward from around edge
    let spot3 = new T.SpotLight("yellow");
    spot3.angle = Math.PI/36;       // narrow (5 degrees)
    spot3.position.set(-2,4,0);
    spot3.target.position.set(-2,0,0);
    // we will use the target
    scene.add(spot3.target);
    scene.add(spot3);

    // this fourth spotlight is like spotlight 3, except that rather than putting the
    // target in the world, we'll put it in the coordinate system of the spotlight itself
    // so the target's position is relative
    // to do this, we need to create a "group" with the spotlight and target together
    // and move that around (rather than the light)
    let spot4 = new T.SpotLight("green");
    spot4.angle = Math.PI/36;       // narrow (5 degrees)
    spot4.position.set(0,4,0);
    spot4.target.position.set(0,0,0);
    // put these into a group
    let group4 = new T.Group();
    group4.add(spot4);
    scene.add(group4);
    group4.add(spot4.target);

    function draw() {
        // make things go around the circle - once around every 2 second
        let theta = Math.PI *2 * (performance.now() % 2000)/2000;
        let x = 2 * Math.cos(theta);
        let z = 2 * Math.sin(theta);

        // point spotlight 2
        spot2.target.position.set(x,0,z);

        // position spotlight 3
        spot3.position.set(x,4,z);

        // position spotlight 4
        // remember, we move the group
        group4.position.set(z,0,x);

        renderer.render(scene,camera);
        window.requestAnimationFrame(draw);
    }
    draw();

}
onWindowOnload(function() {spots("spots");});