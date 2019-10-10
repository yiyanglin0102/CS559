/*jshint esversion: 6 */
// @ts-check

/**
 * CS 559 Demos for in-class use
 * 
 * Students are welcome to experiment with these demonstrations.
 * 
 * The code was written to have a quick demo to show in class, it was
 * not designed to be good to read.
 */

import {onWindowOnload} from "./Libs/helpers.js";
import {RunCanvas} from "./Libs/runCanvas.js";
import { makeCheckbox, makeBoxDiv, makeFlexDiv, makeButton,insertElement, makeSelect, LabelSlider } from "./Libs/inputHelpers.js";

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

// the object that we spin
function spinableObject()
{
    let group = new T.Group();
    let frame = new T.AxesHelper(1);
    group.add(frame);

    let cube = new T.BoxGeometry(0.5,0.5,0.5);
    let c0 = new T.Mesh(cube,new T.MeshStandardMaterial({color:"white"}));
    group.add(c0);
    let cx = new T.Mesh(cube,new T.MeshStandardMaterial({color:"red"}));
    cx.position.x = 1;
    group.add(cx);
    let cy = new T.Mesh(cube,new T.MeshStandardMaterial({color:"green"}));
    cy.position.y = 1;
    group.add(cy);
    let cz = new T.Mesh(cube,new T.MeshStandardMaterial({color:"blue"}));
    cz.position.z = 1;
    group.add(cz);

    return group;
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function eulerToy() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(600,400);
    document.body.appendChild(renderer.domElement);

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera(18, renderer.domElement.width / renderer.domElement.height, 1,1000);

    camera.position.z = 20;
    camera.position.y = 10;
    camera.position.x = 0;
    camera.lookAt(0,0,0);
 
    // since we're animating, add OrbitControls
    let controls = new T.OrbitControls(camera,renderer.domElement);

    scene.add(new T.AmbientLight("white",0.2));
    let pointLight = new T.PointLight("white",1,0,0);
    pointLight.position.set(20,10,15);
    scene.add(pointLight);

    let dirLight = new T.DirectionalLight("white",1);
    dirLight.position.set(1,1,1);
    scene.add(dirLight);

    // make a ground plane
    let groundBox = new T.BoxGeometry(12,0.1,12);
    let groundMesh = new T.Mesh(groundBox,new T.MeshStandardMaterial( {color:0x888888}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -3;
    scene.add(groundMesh);

    // 4 sets of axes
    let objLeft = spinableObject();
    let objRight = spinableObject();
    let objCenter= spinableObject();

    // move them to an appropriate place
    objLeft.position.x = -3;
    objRight.position.x = 3;
    
    // add to the scene (we'll use the top level obj for the rotation)
    scene.add(objLeft);
    scene.add(objRight);
    scene.add(objCenter);

    // to keep track of the world
    let axWorld = new T.AxesHelper();
    scene.add(axWorld);

    // put the world axes with the ground plane
    axWorld.position.y = -2.49;

    let div = makeFlexDiv();
    let divL = makeBoxDiv({width:250,padding:10},div);
    let divR = makeBoxDiv({width:250,padding:10},div);

    /**
     * 
     * @param {String} str 
     * @param {HTMLElement} el 
     * @returns {Array}
     */
    function sliders(str, el) {
        // make sliders
        let x1 = new LabelSlider("x"+str,{width:200,min:-180,max:180});
        el.appendChild(x1.div);

        let y1 = new LabelSlider("y"+str,{width:200,min:-180,max:180});
        el.appendChild(y1.div);

        let z1 = new LabelSlider("z"+str,{width:200,min:-180,max:180});
        el.appendChild(z1.div);

        let button = document.createElement("button");
        button.innerHTML = "Zero";
        el.appendChild(button);
        button.onclick = function() {
            x1.set(0);
            y1.set(0);
            z1.set(0);
        };

        let selector = makeSelect(["XYZ","ZYX","ZYZ","ZXY"],el);
  
        return [x1,y1,z1,selector];
    }
    let [x1,y1,z1,s1] = sliders("1",divL);
    let [x2,y2,z2,s2] = sliders("2",divR);

    // runCanvas = needs to be defined first
    let rc = new RunCanvas(renderer.domElement, undefined);
    rc.setupSlider(0,1,0.01);
    rc.setValue(0);

    // gimball lock demo
    let gb = document.createElement("button");
    gb.innerHTML = "Gimbal Lock";
    document.body.appendChild(gb);
    gb.onclick = function() {
        x1.set(0);
        y1.set(90);
        z1.set(0);
        x2.set(0);
        y2.set(90);
        z2.set(0);
    };

    let matchZX = makeCheckbox("lock Z2 to X1",document.body);

    let badInterp = makeButton("Bad Interp", document.body);
    badInterp.onclick = function() {
        x1.set(-180);       x2.set(180);
        y1.set(-140);       y2.set(-140);
        z1.set(180);        z2.set(-180);
    };

    function doEuler(obj,order,angles) {
        obj.rotation.set(0,0,0);
        for (let i=0;i<3;i++) {
            if (order[i]=="X") obj.rotateX(angles[i]);
            else if (order[i]=="Y") obj.rotateY(angles[i]);
            else if (order[i]=="Z") obj.rotateZ(angles[i]);
            else throw `Unknown Rotation axis ${i} of ${order}`;
        }
    }

    // render
    function animLoop() {

        if (matchZX.checked) {
            z2.set(x1.value());
            y2.set(y1.value());
            x2.set(z1.value());
        }

        let x1a = degToRad(Number(x1.value()));
        let y1a = degToRad(Number(y1.value()));
        let z1a = degToRad(Number(z1.value()));

        doEuler(objLeft,s1.value,[x1a,y1a,z1a]);

        x1.label.innerText = s1.value[0]+"1";
        y1.label.innerText = s1.value[1]+"1";
        z1.label.innerText = s1.value[2]+"1";

        let x2a = degToRad(Number(x2.value()));
        let y2a = degToRad(Number(y2.value()));
        let z2a = degToRad(Number(z2.value()));

        doEuler(objRight,s2.value,[x2a,y2a,z2a]);

        x1.label.innerText = s1.value[0]+"1";
        y1.label.innerText = s1.value[1]+"1";
        z1.label.innerText = s1.value[2]+"1";

        x2.label.innerText = s2.value[0]+"2";
        y2.label.innerText = s2.value[1]+"2";
        z2.label.innerText = s2.value[2]+"2";

        let u = Number(rc.range.value);
        objCenter.rotation.set(0,0,0);

        if (s1.value == s2.value) {
            doEuler(objCenter,s1.value,
                [u * x1a + (1-u) * x2a,
                u * y1a + (1-u) * y2a,
                u * z1a + (1-u) * z2a]);
        }

        renderer.render(scene,camera);
        window.requestAnimationFrame(animLoop);
    }
    animLoop();
}
onWindowOnload(eulerToy);