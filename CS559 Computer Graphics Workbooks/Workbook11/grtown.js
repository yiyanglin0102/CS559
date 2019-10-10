/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 * 
 * This is the main file - it creates the world, populates it with 
 * objects and behaviors, and starts things running
 * 
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 * 
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrWorld } from "./Framework/GrWorld.js";
import {GrObject } from "./Framework/GrObject.js";  // only for typing
import * as Helpers from "./Libs/helpers.js";
import { WorldUI } from "./Framework/WorldUI.js";

/** These imports are for the examples - feel free to remove them */
import {SimpleHouse} from "./Examples/house.js";
import {CircularTrack, TrackCube, TrackCar} from "./Examples/track.js";
import {Helicopter, Helipad} from "./Examples/helicopter.js";

/**
 * The Graphics Town Main - 
 * This builds up the world and makes it go...
 */
function grtown() {
    // make the world
    let world = new GrWorld({
        width:1000, height:600,         // make the window reasonably large
        groundplanesize:20              // make the ground plane big enough for a world of stuff
    });

    // put stuff into it - you probably want to take the example stuff out first


    /********************************************************************** */
    /** EXAMPLES - student should remove these and put their own things in  */
    /***/
    // make two rows of houses, mainly to give something to look at
    for(let i=-19; i<20; i+=5) {
        world.add(new SimpleHouse({x:i, z:-12}));
        world.add(new SimpleHouse({x:i, z: 12}));
    }

    /** Race Track - with three things racing around */
    let track = new CircularTrack();
    let tc1 = new TrackCube(track);
    let tc2 = new TrackCube(track);
    let tc3 = new TrackCar(track);
    // place things are different points on the track
    tc2.u = 0.25;
    tc3.u = 0.125;
    // and make sure they are in the world
    world.add(track);
    world.add(tc1);
    world.add(tc2);
    world.add(tc3);

    /** Helicopter - first make places for it to land*/
    world.add(new Helipad(-15,0,0));
    world.add(new Helipad(15,0,0));
    world.add(new Helipad(0,0,-17));
    world.add(new Helipad(0,0,17));
    let copter = new Helicopter();
    world.add(copter);
    copter.getPads(world.objects);

    /** EXAMPLES - end - things after this should stay                      */
    /********************************************************************** */

    // build and run the UI

    // only after all the objects exist can we build the UI
    // @ts-ignore       // we're sticking a new thing into the world
    world.ui = new WorldUI(world);
    // now make it go!
    world.go();
}
Helpers.onWindowOnload(grtown);