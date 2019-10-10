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

import {onWindowOnload} from "./Libs/helpers.js";

import { GrWorld } from "./Framework/GrWorld.js";
import { GrCube } from "./Framework/SimpleObjects.js";

// @@Snippet:simplespin
// define a special kind of cube that spins
class SpinCube extends GrCube {
    constructor() {
        super({color:"green"});
    }
    advance(ms,daytime) {
        // this used to be .01 per step
        // however, we want to advance things based on the frame rate
        // if we get 60fps, that's 16 miliseconds
        this.objects[0].rotation.x += 0.01 * ms / 16;
        this.objects[0].rotation.y += 0.01 * ms / 16;
    }
}

function go() {
    let world = new GrWorld({groundplanecolor:"gray",
                             where:document.getElementById("simplespin")});

    let cube = new SpinCube();
    world.add(cube);
    // we need to place the cube above the ground
    cube.objects[0].position.y = 1;

    world.go();
}
onWindowOnload(go);
// @@Snippet:end