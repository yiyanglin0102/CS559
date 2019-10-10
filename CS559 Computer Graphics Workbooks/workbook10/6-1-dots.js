
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
import * as InputHelpers from "./Libs/inputHelpers.js";
import * as SimpleObjects from "./Framework/SimpleObjects.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";

function test() {
    let mydiv = document.getElementById("6-1");

    let world = new GrWorld({width:(mydiv ? 600:800), where:mydiv});


    let objs = [];
    let dx = -6;

    let shaderMat = shaderMaterial("./Shaders/dots.vs","./Shaders/dots2.fs",
        {
            side:T.DoubleSide,
            uniforms: {
                radius : {value: 0.3},
                dots   : {value: 4.0},
                blur   : {value: 0.0},
                light  : {value: new T.Vector3(1,1,1) },
                dark   : {value: new T.Vector3(0.2,0.2,0.7)}
            }
        });

    let select = InputHelpers.makeSelect(["no anti-aliasing","light blur","large blur","correct anti-aliasing"], mydiv, "no anti-aliasing");
    let s1 = new InputHelpers.LabelSlider("dots",  {width:400,min:1,max:20,step:.5,initial:4,where:mydiv});
    let s2 = new InputHelpers.LabelSlider("radius",{width:400,min:0.1,max:.5,step:.01,initial:.2,where:mydiv});

    function onchange() {
        shaderMat.uniforms.dots.value = s1.value();
        shaderMat.uniforms.radius.value = s2.value();
        if (select.value=="light blur") shaderMat.uniforms.blur.value = 0.1;
        else if (select.value=="large blur") shaderMat.uniforms.blur.value = 0.3;
        else if (select.value=="correct anti-aliasing") shaderMat.uniforms.blur.value = -1;
        else shaderMat.uniforms.blur.value = 0;
     }
    s1.oninput = onchange;
    s2.oninput = onchange;
    select.oninput = onchange;
    onchange();

    world.add(new SimpleObjects.GrSphere({x:-2,y:1, material:shaderMat}));
    world.add(new SimpleObjects.GrSquareSign({x:2,y:1,size:1,material:shaderMat}));

    world.go();
}
Helpers.onWindowOnload(test);
