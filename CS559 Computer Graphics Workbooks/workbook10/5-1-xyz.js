
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
import {GrObject } from "./Framework/GrObject.js";  // only for typing
import * as Helpers from "./Libs/helpers.js";
import * as SimpleObjects from "./Framework/SimpleObjects.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";

function test() {
    let mydiv = document.getElementById("5-1");

    let world = new GrWorld({width:(mydiv ? 600:800), where:mydiv});

    let objs = [];
    let dx = -6;

    let shaderMat1 = shaderMaterial("./Shaders/xyz.vs","./Shaders/xyz1.fs");
    let shaderMat2 = shaderMaterial("./Shaders/xyz.vs","./Shaders/xyz2.fs");

    let s1 = new SimpleObjects.GrSphere({x:-2,y:1, material:shaderMat1})
    let s2 = new SimpleObjects.GrSphere({x: 2,y:1, material:shaderMat2})

    // add a time accumulator to those objects...
    s1.time = 0;
    s2.time = Math.PI * 1000;

    // beware! non-lexical this (it will become a method when we attach it to an object)
    function spinner(delta,tod) { 
        this.time += delta;
        this.objects[0].position.x = 2 * Math.sin(this.time / 1000);
        this.objects[0].position.z = 2 * Math.cos(this.time / 1000);
    };
    s1.advance = spinner;
    s2.advance = spinner;

    world.add(s1);
    world.add(s2);

    world.go();
}
Helpers.onWindowOnload(test);
