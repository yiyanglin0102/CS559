
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
import * as InputHelpers from "./Libs/inputHelpers.js";
import * as Helpers from "./Libs/helpers.js";

/*
Define your 3 objects here. If the objects fit inside +/- 1,
the world code below will place them nicely. Otherwise, you need to modify the world code below to make the world bigger and space the objects out differently.
*/

class Object1 extends GrObject {
    constructor() {
      // student, fill this in
      // you will need a call to "super"
    }
}
class Object2 extends GrObject {
    constructor() {
      // student, fill this in
      // you will need a call to "super"
    }
}
class Object3 extends GrObject {
    constructor() {
      // student, fill this in
      // you will need a call to "super"
    }
}

function shift(grobj,x) {
    grobj.objects[0].translateX(x);
    return grobj;
}

/*
The world making code here assumes the objects are +/- 1
and have a single mesh as their THREE objects.
If you don't follow this convention, you will need to modify
the code below.
THe code is a little funky because it is designed to work for
a variety of demos.
*/
function test() {
    let mydiv; // will be undefined - this is kept for compatibility with other pages

    let box = InputHelpers.makeBoxDiv({width:mydiv ? 640:820},mydiv);
    if (!mydiv) {
        InputHelpers.makeBreak();   // sticks a break after the box
    }
    InputHelpers.makeHead("Three Different Objects",box);

    let world = new GrWorld({width:mydiv ? 600:800, where:box});
    let tt = shift(new Object1(), -3);
    world.add(tt);

    let t2 = shift(new Object2(), 0);
    world.add(t2);

    let t3 = shift(new Object3(), 3);
    world.add(t3);

    let div = InputHelpers.makeBoxDiv({},box);

    let sl = new InputHelpers.LabelSlider("ry", {min:-2,max:2,where:div});

    InputHelpers.makeBreak(box);

    sl.oninput = function(evt) {
        let v = sl.value();
        tt.objects[0].rotation.y = v;
        t2.objects[0].rotation.y = v;
        t3.objects[0].rotation.y = v;
    };

    world.go();
}
Helpers.onWindowOnload(test);
