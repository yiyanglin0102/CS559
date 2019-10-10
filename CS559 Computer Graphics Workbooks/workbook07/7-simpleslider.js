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
import { AutoUI} from "./Framework/AutoUI.js";

// define a special kind of cube that spins
//@@Snippet:rotcube
class RotCube extends GrCube {
    constructor() {
        super({color:"green"},
            [ ["X",-Math.PI/2,Math.PI/2,0],
              ["Y",-Math.PI/2,Math.PI/2,0],
              ["Z",-Math.PI/2,Math.PI/2,0]
            ]);
        }
        update(vec) {
            this.objects[0].rotation.x = vec[0];
            this.objects[0].rotation.y = vec[1];
            this.objects[0].rotation.z = vec[2];
        }
}
//@@Snippet:end

function go() {
    let div = document.getElementById("simpleslide");
    let world = new GrWorld({groundplanecolor:"gray", where:div});

    let cube = new RotCube();
    world.add(cube);

    let cubeUI = new AutoUI(cube,200,div);

    // we need to place the cube above the ground
    cube.objects[0].position.y = 1;

    world.go();
}
onWindowOnload(go);
