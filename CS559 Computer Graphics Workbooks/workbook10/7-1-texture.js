
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

// load in a texture image
let image = new T.TextureLoader().load("./Textures/spruit_sunrise_Bottom.png");

function test() {
    let mydiv = document.getElementById("7-1");

    let world = new GrWorld({width:(mydiv ? 600:800), where:mydiv});

    let objs = [];
    let dx = -6;

    let shaderMat = shaderMaterial("./Shaders/text.vs","./Shaders/text.fs",
        {
            side:T.DoubleSide,
            uniforms : {
                texture : {value: image}
            }
        });

    world.add(new SimpleObjects.GrSphere({x:-2,y:1, material:shaderMat}));
    world.add(new SimpleObjects.GrSquareSign({x:2,y:1,size:1,material:shaderMat}));

    world.go();
}
Helpers.onWindowOnload(test);
