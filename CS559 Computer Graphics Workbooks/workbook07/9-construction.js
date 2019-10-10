
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
import { HingeCube } from "./Framework/TestObjects.js";
import { AutoUI } from "./Framework/AutoUI.js";
import { GrCrane, GrExcavator } from "./9-constructionobjects.js";

function startWorld() {
    let world = new GrWorld({groundplanesize:10});

    let crane = new GrCrane({x:2, z:-2});
    world.add(crane);
    let c_ui = new AutoUI(crane);

    let excavator = new GrExcavator({x:-2, z:2});
    world.add(excavator);
    let e_ui = new AutoUI(excavator);
    e_ui.set('x',6);
    e_ui.set('z',3);
    e_ui.set('theta',36);

    function loop() {
        world.animate();
        window.requestAnimationFrame(loop);
    }
    loop();
}
window.onload=startWorld;
