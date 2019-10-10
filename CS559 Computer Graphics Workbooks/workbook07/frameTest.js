
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

// get things we need
import { SimpleGroundPlane } from "./Framework/GroundPlane.js";
import { GrWorld } from "./Framework/GrWorld.js";
import { GrCube } from "./Framework/SimpleObjects.js";
import { spinY } from "./Framework/SimpleBehaviors.js";
import { HingeCube } from "./Framework/TestObjects.js";
import { AutoUI } from "./Framework/AutoUI.js";

function test() {
    let world = new GrWorld();

    world.add(new SimpleGroundPlane());

    world.camera.position.set(-5,5,10);
    world.camera.lookAt(0,0,0);

    world.add(spinY(new GrCube()));

    let dc = new HingeCube();
    world.add(dc);

    dc.update([2,2,45,45]);
    let ui = new AutoUI(dc);

    function loop() {
        world.animate();
        window.requestAnimationFrame(loop);
    }
    loop();


    console.log(world.scene.children);
}
window.onload=test;

/*
window.onload = function() {
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

    console.log("Start");
    let a = 0;
    function one() {
    console.log("One, A is ",a);
    a = 1;
    }
    function two() {
    window.requestAnimationFrame(one);
    console.log("Two, A is ",a);
    a=2;
    }
    function three() {
    console.log("Three, A is ",a);
    a=3;
    window.requestAnimationFrame(two);
    }
    a=4;
    window.requestAnimationFrame(three);
    console.log("End");

    let x = 0;
    for(let i=0; i<100000; i++) {
        for (let j=0; j<10000; j++) {
            x = (x+2) % 6;
        }
    }
    console.log("End Again");

    // note this does print afterwards - because timeout uses the same queue as reqAnimationFram
    sleep(500).then( () => console.log("After End"));
}
*/