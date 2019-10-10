
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
import * as InputHelpers from "./Libs/inputHelpers.js";
import * as Helpers from "./Libs/helpers.js";
import * as SimpleObjects from "./Framework/SimpleObjects.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";


let image = new T.TextureLoader().load("./Textures/islands.png");

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
    let mydiv = document.getElementById("7-2");

    let world = new GrWorld({width:(mydiv ? 600:800), where:mydiv, 
        lightColoring:"white"
    });

    let shaderMat = shaderMaterial("./Shaders/world.vs","./Shaders/world.fs",
        {
            side:T.DoubleSide,
            uniforms : {
                colormap : {value: image}
            }
        });

    console.log(shaderMat.uniforms.colormap);

    world.add(spinY(new SimpleObjects.GrSphere({x:-2,y:1, widthSegments:100, heightSegments:100, material:shaderMat})));
    world.add(new SimpleObjects.GrSquareSign({x:2,y:1,size:1,material:shaderMat}));

    world.ambient.intensity = 1;

    world.go();
}
Helpers.onWindowOnload(test);
