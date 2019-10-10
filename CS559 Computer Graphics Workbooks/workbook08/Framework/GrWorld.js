/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 * 
 * GrWorld - bascially a wrapper around scene, except that it uses
 *      GrObject instead of Object3D (GrObjects have Object3D)
 * 
 * To make things simple, this keeps a renderer and a default camera.
 * Of course, that might complicate things if you want to have multiple
 * renderers and cameras
 * 
 * Basically, this keeps some of the basic stuff you need when you use
 * three.
 */

/** @module GrWorld */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";
import { insertElement } from "../Libs/inputHelpers.js";
import { SimpleGroundPlane } from "./GroundPlane.js";

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

/**
 * Document the parameters for making a world - all are optional
 * we'll guess at something if you don't give it to us
 * @typedef GrWorldProperties
 * @property [camera] - use this camera if passed
 * @property [fov] - camera property if we make one
 * @property [near] - camera property if we make one
 * @property [far]  - camera property if we make one
 * @property [renderer] - if you don't give one, we'll make it
 * @property [renderparams] - parameters for making the renderer
 * @property [width] - canvas size 
 * @property [height] - canvas size
 * @property [where] - where in the DOM to insert things
 * @property [controls] - whether or not to make orbit controls (default is only if we make the camera)
 * @property [lights] - a list of lights, or else default ones are made
 * @property [lightBrightness=.75] - brightness of the default lights
 * @property [ambient=.5] - brightness of the ambient light in default light
 * @property [groundplane] - can be a groundplane, or False (otherwise, one gets made)
 * @property [groundplanecolor="green"] - if we create a ground plane, what color
 * @property [groundplanesize=5] - if we create a ground plane, how big
 * @property [lookfrom] - where to put the camera (only if we make the camera)
 * @property [lookat] - where to have the camera looking (only if we make the camera)
 */

 /** @class GrWorld
  * 
  * The GrWorld is basically a wrapper around THREE.js's `scene`,
  * except that it keeps a list of `GrObject` rather than `Object3D`.
  * 
  * It contains a `scene` (and it puts things into it for you). 
  * It also contains a `renderer` and a `camera`.
  * 
  * When this creates a renderer, it places it into the dom (see the `where` option).
  * 
  * By default, the world is created with a reasonable default `renderer`,
  * `camera` and `groundplane`. Orbit controls are installed. 
  */
export class GrWorld {
    /**
     * Construct an empty world
     * @param {GrWorldProperties} params 
     */
    constructor(params={}) {
        // this keeps a list of objects in the world
        /** @type Array<GrObject> */
        this.objects = [];

        // the GrWorld "has a" of the main things we need in three
        this.scene = new T.Scene();
        // make a renderer if it isn't given
        /** @type THREE.WebGLRenderer */
        this.renderer = "renderer" in params ? params.renderer :
            new T.WebGLRenderer("renderparams" in params ? params.renderparams : {} );

        // width and height are tricky, since they can come from many places
        let width = 600;
        let height= 400;
        // if the renderer was given, get its DOM
        if ("renderer" in params) {
            width = params.renderer.domElement.width;
            height = params.renderer.domElement.height;
        } else if (("renderparams" in params) && ("canvas" in params.renderparams)) {
            width = params.renderparams.canvas.width;
            height = params.renderparams.canvas.height;
        }
        // specified width/height overrides everything
        if ("width" in params) { width = params.width;}
        if ("height" in params) { height = params.height;}

        // get the light brightnesses
        if (!("lightBrightness" in params)) params.lightBrightness = 0.75;
        if (!("ambient" in params)) params.ambient=0.5;

        // make things be the right size
        this.renderer.setSize(width,height);

        // make a groundplane (or install a given one)
        // we do this before we made the camera, since it's useful for placing the camera
        if ("groundplane" in params) {
            this.groundplane = params.groundplane;
        } else {
            // the default is to create a groundplane
            this.groundplane = new SimpleGroundPlane(params.groundplanesize || 5, 0.2, params.groundplanecolor || "darkgreen");
            this.add(this.groundplane);
        }
   
        // make a camera
        /** @type THREE.PerspectiveCamera */
        this.camera = undefined;
        if ("camera" in params) {
            this.camera = params.camera;
        } else {
            this.camera = new T.PerspectiveCamera(
                ("fov" in params) ? params.fov : 45,
                width/height,
                ("near" in params) ? params.near : 0.1,
                ("far" in params) ? params.far : 2000
            );
            /* figure out a default lookat */
            let lookat = params.lookat;
            if (!("lookat" in params)) {
                lookat = new T.Vector3(0,0,0);
            }
            let lookfrom = params.lookfrom;
            if (!("lookat" in params)) {
                let gpSize = this.groundplane ? this.groundplane.size : 10;
                lookfrom = new T.Vector3(gpSize/2,gpSize,gpSize*2);
            }
            this.camera.position.copy(lookfrom);
            this.camera.lookAt(lookat);
        }

        // if we either made the camera or controls are specified...
        this.controls = (!("camera" in params) || ("controls" in params)) ?
            new T.OrbitControls(this.camera,this.renderer.domElement) : undefined;

        // if we either specify where things go in the DOM or we made our
        // own canvas, install it
        if ( ("where" in params) || ( !("renderer" in params) || ("renderparams" in params))) {
            insertElement(this.renderer.domElement, ("where" in params) ? params.where : undefined);
        }

        /**
         * Some Lights
         */
        if ("lights" in params) {
            if (params.lights.length) {
                params.lights.forEach(light => this.scene.add(light));
            }
            this.ambient = undefined;
        } else {
            this.ambient = new T.AmbientLight("white",params.ambient);
            this.scene.add(this.ambient);

            // three lights - all a little off white to give some contrast
            let dirLight1 = new T.DirectionalLight(0xF0E0D0,params.lightBrightness);
            dirLight1.position.set(1,1,0);
            this.scene.add(dirLight1);
        
            let dirLight2 = new T.DirectionalLight(0xD0E0F0,params.lightBrightness);
            dirLight2.position.set(-1,1,-0.2);
            this.scene.add(dirLight2);   
            
            let bottomLight = new T.DirectionalLight(0x0806080,params.lightBrightness/2);
            bottomLight.position.set(0,-1,0.1);
            this.scene.add(bottomLight);
        }

        // Keep track of rendering timings
        this.lastRenderTime = 0;
        this.lastTimeOfDay = 12;
    } // end of constructor

    add(grobj) {
        this.objects.push(grobj);
        // be sure to add all the objects to the scene
        grobj.objects.forEach(element => {
            this.scene.add(element);
        });
    }

    /**
     * draw the default camera to the default renderer
     */
    draw() {
        this.lastRenderTime = performance.now();
        this.renderer.render(this.scene,this.camera);
    }

    /**
     * advance all of the objects
     */
    advance(delta, timeOfDay) {
        this.objects.forEach(obj => obj.advance(delta,timeOfDay));
    }

    /**
     * perform a cycle of the animation loop - this measures the time since the
     * last redraw and advances that much before redrawing
     */
    animate() {
        let delta = performance.now() - this.lastRenderTime;
        this.advance(delta,this.lastTimeOfDay);
        this.draw();
    }

    /**
     * start an (endless) animation loop - this just keeps going
     */
    go() {
        // remember, this gets redefined (it doesn't follow scope rules)
        let self=this;
        function loop() {
            self.animate();
            // self.draw();     // animate does the draw
            window.requestAnimationFrame(loop);
        }
        loop();
    }
}
