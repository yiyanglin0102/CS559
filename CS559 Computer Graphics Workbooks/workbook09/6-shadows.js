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

// get things we may need
import { GrWorld } from "./Framework/GrWorld.js";
import { GrObject } from "./Framework/GrObject.js";
import * as Helpers from "./Libs/helpers.js";
import * as Simple from "./Framework/SimpleObjects.js";

/**
 * 
 * @param {GrObject} obj 
 * @param {number} [speed=1] - rotations per second
 */
function spinY(obj, speed=1) {
    obj.advance = function(delta,timeOfDay) {
        obj.objects.forEach(obj => obj.rotateY(speed*delta/1000*Math.PI));
    };
    return obj;
}


function test() {

    let world = new GrWorld();

    /**
     * Some Stuff in the world to cast and receieve shadows
     */
    // a high object to cast shadows on lower objects
    let gr = new T.Group();
    let mat = new T.MeshStandardMaterial({color:"blue"});
    let geom = new T.TorusBufferGeometry();
    let tmesh = new T.Mesh(geom,mat);
    tmesh.rotateX(Math.PI/2);
    tmesh.scale.set(0.5,0.5,0.25);
    tmesh.translateX(-2);
    gr.add(tmesh);
    gr.translateY(3);
    let highobj = new GrObject("high obj",gr);
    spinY(highobj);
    world.add(highobj);

    // some low objects to be shadowed - although these
    // should cast shadows on the ground plane
    world.add(spinY(new Simple.GrCube({x:-3,y:1})));
    world.add(spinY(new Simple.GrTorusKnot({x:3,y:1,size:0.5})));

    /**
     * Turn on Shadows - this is the student's job in the assignment
     * Remember to:
     * - make a spotlight and turn on its shadows
     * - have objects (including the ground plane) cast / receieve shadows
     * - turn on shadows in the renderer
     * 
     * it's about 15 lines (with a recursive "loop" to enable shadows for all objects)
     * but you can also just turn things on as you make objects
      */

    world.go();
}
Helpers.onWindowOnload(test);