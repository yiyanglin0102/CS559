
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

/**
 *
 * @param {GrObject} obj
 * @param {number} [speed=1] - rotations per second
 */
function spinY(obj, speed=0) {
    obj.advance = function(delta,timeOfDay) {
        obj.objects.forEach(obj => obj.rotateY(speed*delta/1000*Math.PI));
    };
    return obj;
}


function test() {
    let mydiv = document.getElementById("2-2");

    let world = new GrWorld({width:640,where:mydiv});

    // Shader 0 - solid color
    /* use the simplest shader pair */
    let mat0 = shaderMaterial("./Shaders/s0.vs","./Shaders/s0.fs");
    world.add(new SimpleObjects.GrCube({material:mat0,x:-3, y:1}));


    // Shader 1 - solid color, passed by uniform
    /* next up - shader pair that has a uniform */
    /* notice how we pass the uniform as a parameter to the shader constructor */
    let mat1 = shaderMaterial("./Shaders/s1.vs","./Shaders/s1.fs",
                              {uniforms: {color: {value: new T.Vector3(0.4,0.8,0.8)} }});
    world.add(new SimpleObjects.GrCube({material:mat1,x:0, y:1}));


    // Shader 1b - solid color, passed by uniform, animate uniform
    /* let's use that same thing, but to animate the parameter of the shader */
    let mat2 = shaderMaterial("./Shaders/s1.vs","./Shaders/s1.fs",
                              {uniforms: {color: {value: new T.Vector3(0.4,0.5,0.5)} }});
    let cube2 = new SimpleObjects.GrCube({material:mat2,x:3, y:1});

    // add an "advance" function to animate this cube
    let cubeTime = 0;
    cube2.advance = function(delta,timeofday) {
        cubeTime += delta;
        let newR = Math.sin(cubeTime/200)/2+0.5;      // get a number between 0-1
        mat2.uniforms.color.value.x = newR;
     };
    world.add(cube2);

    world.go();
}
Helpers.onWindowOnload(test);
