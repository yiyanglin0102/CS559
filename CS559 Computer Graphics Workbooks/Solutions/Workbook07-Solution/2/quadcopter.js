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

let loader = new T.OBJLoader();
let myObj;

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

    let axis = new T.AxesHelper();
    scene.add(axis);
 
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

    //Helicopter
    let helicopter = new T.Group();
    scene.add(helicopter);
    loader.load("OBJ/helicopter.obj", function(heli){
        myObj = heli;
        myObj.traverse(function(child){
            if (child instanceof T.Mesh) {
                child.material = new T.MeshStandardMaterial({color:"orange"});
            }
        })
        helicopter.add(myObj);
    });
    let mainPropPivot = new T.Group();
    let rearPropPivot = new T.Group();

    let rotorGeom = new T.BoxGeometry();
    let mainProp = new T.Mesh(rotorGeom, new T.MeshStandardMaterial({color:0x0A0A0A}))
    let rearProp = new T.Mesh(rotorGeom, new T.MeshStandardMaterial({color:0x2C2C2C}))

    mainProp.scale.set(3,0.08,0.2);
    mainPropPivot.add(mainProp);
    mainPropPivot.position.set(0, 1.6429, -0.297407);

    rearProp.scale.set(0.067451, 0.383917, 0.079371);
    rearPropPivot.add(rearProp);
    rearPropPivot.position.set(0, 1.081935, -2.411814);

    helicopter.add(mainPropPivot);
    helicopter.add(rearPropPivot);

    helicopter.scale.set(.5,.5,.5);
    helicopter.position.y = 2;


    //Heliplane
    let heliplane = new T.Group();
    scene.add(heliplane);
    loader.load("OBJ/helijetBody.obj", function(plane){
        myObj = plane;
        myObj.traverse(function(child){
            if (child instanceof T.Mesh) {
                child.material = new T.MeshStandardMaterial({color:"white", roughness:.45})
            }
        })
        heliplane.add(myObj);
    });

    let fanRPivot = new T.Group();
    let fanLPivot = new T.Group();

    loader.load("OBJ/helijetFan.obj", function(disk){
        myObj = disk;
        myObj.traverse(function(child){
            if (child instanceof T.Mesh) {
                child.material = new T.MeshStandardMaterial({color:"silver", roughness:.15, side:T.DoubleSide})
            }
        })
        fanRPivot.add(myObj.clone());
        fanLPivot.add(myObj.clone());
    });

    fanRPivot.position.set(-4.554766,1.726138,-2.07684);
    fanLPivot.position.set(4.554766,1.726138,-2.07684);

    fanLPivot.scale.set(-1,1,1);
    heliplane.add(fanRPivot);
    heliplane.add(fanLPivot);

    heliplane.scale.set(.5,.5,.5);
    heliplane.position.y = 4;


    // Radio Dish
    function makeDish(baseMat = new T.MeshStandardMaterial, dishMat = new T.MeshStandardMaterial){
        let dishGeo = new T.ConeGeometry(1,1,8,1,true);
        let dishBaseGeo = new T.CylinderGeometry(0.5,0.5);
        let dishMesh = new T.Mesh(dishGeo, dishMat);
        let dishBaseMesh = new T.Mesh(dishBaseGeo, baseMat);
        let dish = new T.Group();
        let dishPivot = new T.Group();

        
        dishBaseMesh.position.y = 0.5;
        
        dishMesh.position.y = .5;
        dishMesh.position.z = 1;
        dishMesh.rotation.x = -Math.PI/2;
        
        dishPivot.add(dishMesh);
        dishPivot.position.y = 0.5;

        dish.add(dishPivot);
        dish.add(dishBaseMesh);
        scene.add(dish);
        return dish;
    }

    let dish1 = makeDish(new T.MeshStandardMaterial({color:"darkgrey"}),
                         new T.MeshStandardMaterial({color:"grey", side:T.DoubleSide}))
    let dish2 = makeDish(new T.MeshStandardMaterial({color:"red"}),
                         new T.MeshStandardMaterial({color:"gold", side:T.DoubleSide}))
    
    dish2.position.set(3,0,3);
    dish2.scale.set(.5,.5,.5);

   

    function animateLoop() {
        //** EXAMPLE CODE - STUDENT SHOULD REPLACE */
        // move in a circle 
        let theta = performance.now() / 1000;
        let x = 3 * Math.cos(theta);
        let z = 3 * Math.sin(theta);
        let y;
        helicopter.position.x = x;
        helicopter.position.z = z;
        helicopter.rotation.y = Math.atan2(-z, x);

        theta = performance.now() / 1500;
        x = 6 * Math.cos(theta);
        z = 9 * Math.sin(theta);

        heliplane.position.x = x;
        heliplane.position.z = z;
        heliplane.rotation.y = Math.atan2(-z,x);
        heliplane.rotation.z = Math.atan2(heliplane.position.y,x)/2;

        dish1.children[0].lookAt(helicopter.position);
        dish2.children[0].lookAt(heliplane.position);

        helicopter.children[0].rotateOnAxis(new T.Vector3(0,1,0), 0.4);
        helicopter.children[1].rotateOnAxis(new T.Vector3(1,0,0), 0.6);

        heliplane.children[0].rotateOnAxis(new T.Vector3(0,1,0), 0.8);
        heliplane.children[1].rotateOnAxis(new T.Vector3(0,1,0), -0.8);

        renderer.render(scene,camera);
        window.requestAnimationFrame(animateLoop);
    }
    animateLoop();
}
onWindowOnload(quadcopter);
