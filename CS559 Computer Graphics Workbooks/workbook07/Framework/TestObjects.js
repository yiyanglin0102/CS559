/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 * 
 * Test Objects - these examples are for use in testing the framework
 * and are less generally useful
 *  
 */

 /** @module TestObjects */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";

// a global variable to keep track of how many objects we create
// this allows us to give unique names
let testobjsctr = 0;

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

function degreesToRadians(deg) {
    return deg * Math.PI / 180;
}

/**
 * A simple object that is like a dump truck (with a hinge), but just made of 
 * boxes.
 * A simple way to test a parametric object
 */
export class HingeCube extends GrObject {
    constructor() {
        let group = new T.Group();
        let box = new T.BoxGeometry(1,0.5,1);
        let mesh1 = new T.Mesh(box,new T.MeshStandardMaterial({color:0xA0A000}));
        mesh1.position.y = 0.25;
        group.add(mesh1);

        let mesh2 = new T.Mesh(box,new T.MeshStandardMaterial({color:0xFFFF00}));
        // set group with origin at pivot point
        let g2 = new T.Group();
        g2.position.set(0,0.5,-0.5);
        g2.add(mesh2);
        mesh2.position.y = 0.25;
        mesh2.position.z = 0.5;
        group.add(g2);

        super(`DumpCube-${testobjsctr++}`,group,
              [ ['x',-5,5,2],['z',-5,5,2],['theta',-180,180,0],
                ['tilt',0,90,0]
              ]);
        
        this.group = group;
        this.mesh1 = mesh1;
        this.mesh2 = mesh2;
        this.g2 = g2;
    }

    update(paramValues) {
        this.group.position.x = paramValues[0];
        this.group.position.z = paramValues[1];
        this.group.rotation.y = degreesToRadians(paramValues[2]);
        this.g2.rotation.x = degreesToRadians(-paramValues[3]);
    }
}
