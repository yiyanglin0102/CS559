
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
import { GrWorld } from "./Framework/GrWorld.js";
import { GrObject } from "./Framework/GrObject.js";
import * as Helpers from "./Libs/helpers.js";

// define a class of Dice here - it should be a subclass of GrObject

function test() {

    let world = new GrWorld();

    // put the two dice into the world Here
    // don't forget to orient them so they have different numbers facing up

    world.go();
}
Helpers.onWindowOnload(test);
