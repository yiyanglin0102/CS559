/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 * 
 * Simple object behaviors that work by patching the objects
 * 
 *  */

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

/** @module SimpleBehaviors */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";
/**
 * 
 * @param {GrObject} grobj 
 * @param {number} [speed]
 */
export function spinY(grobj, speed) {
    let newSpeed = speed ? speed : 0.001;
    let oldAdvance = grobj.advance;
    grobj.advance = function(delta,timeOfDay) {
        this.objects.forEach(obj => obj.rotateY(newSpeed * delta));
        oldAdvance.call(this,delta,timeOfDay);
    };
    return grobj;
}
