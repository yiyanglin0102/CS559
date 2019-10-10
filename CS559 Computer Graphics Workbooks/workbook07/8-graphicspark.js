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
import { GrSimpleSwing, GrColoredRoundabout, GrSimpleRoundabout } from "./8-parkobjects.js";
import { SimpleBouncer } from "./8-simplepark.js";

function test() {
    let world = new GrWorld({groundplanesize:20});

    world.add(new SimpleBouncer(0,5));

    let roundabout = new GrSimpleRoundabout({x:-2});
    world.add(roundabout);

    let roundabout_2 = new GrColoredRoundabout({x:5});
    world.add(roundabout_2);

    let swing_2 = new GrSimpleSwing({x:10});
    world.add(swing_2);

    function loop() {
        world.animate();
        window.requestAnimationFrame(loop);
    }
    loop();
}
window.onload=test;
