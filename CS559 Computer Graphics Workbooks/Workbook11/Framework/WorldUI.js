/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 *
 * Simple, automatic UI from an world with properly declared parameters 
 */

/** @module AutoUI */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";
// we need to import the module to get its typedefs for the type checker
import * as InputHelpers from "../Libs/inputHelpers.js";
import { GrWorld } from "./GrWorld.js";

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("../../Workbook08-Workspace/THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

export class WorldUI {
    /**
     * Create a UI panel for a GrObject
     * goes through the parameters and makes a slider for each
     * also defines a callback for those sliders that calls the
     * world's update function.
     * 
     * This does place the panel into the DOM (onto the web page)
     * using `insertElement` in the CS559 helper library. The place
     * it is placed is controlled the `where` parameter. By default,
     * it goes at the end of the DOM. However, you can pass it a DOM 
     * element to be placed inside (or some other choices as well).
     * 
     * @param {GrWorld} world 
     * @param {number} [width=300] 
     * @param {InputHelpers.WhereSpec} [where] - where to place the panel in the DOM (at the end of the page by default)
     */
    constructor(world,width=300,where=undefined) {
        let self=this;
        this.world = world;
        this.div = InputHelpers.makeBoxDiv({width:width},where);
        InputHelpers.makeHead("World Controls",this.div,{tight:true});
        let _world = this.world;

        // run control
        this.runbutton = InputHelpers.makeCheckbox("Run",this.div);
        world.runbutton = this.runbutton;
        world.runbutton.checked = true;
        this.runslider = new InputHelpers.LabelSlider("speed",{width:250,min:.1,max:3,step:.1,initial:1,where:this.div});
        world.speedcontrol = this.runslider.range;

        // create "view solo" checkbox.
        this.selectionChkList = InputHelpers.makeFlexDiv(this.div);
        /**@type HTMLInputElement */
        this.chkSolo = InputHelpers.makeCheckbox("chkSolo", this.selectionChkList, "View Solo Object");
        this.chkSolo.onclick = function() {
            if (this.checked) { _world.showSoloObject(); }
            else              { _world.showWorld(); }
        }
        this.selectViewMode = InputHelpers.makeSelect(["Orbit Camera", "Fly Camera", "Follow Object", "Drive Object"], this.div);
        this.selectViewMode.onchange = function() {
            _world.setViewMode(this.value);
        }
        this.selectViewMode.onchange(null);

        InputHelpers.makeBreak(this.div);

        // create object selector for rideable
        InputHelpers.makeSpan("Drive:",this.div);
        let rideable = world.objects.filter(obj => obj.rideable);
        this.selectRideable = InputHelpers.makeSelect(rideable.map(ob => ob.name), this.div);
        this.selectRideable.onchange = function() {
            _world.setActiveObject(this.value);
            _world.setViewMode("Drive Object");
            self.selectViewMode.value = "Drive Object";
        }

        // create a selector for isolate
        InputHelpers.makeBreak(this.div);
        InputHelpers.makeSpan("LookAt:",this.div);
        this.selectLook = InputHelpers.makeSelect(world.objects.map(ob => ob.name), this.div);
        this.selectLook.onchange = function () {
            if ((world.view_mode == "Drive Object") || (world.view_mode == "Follow Object")) {
                _world.setViewMode("Orbit Camera");
                self.selectViewMode.value = "Orbit Camera";
            }
            let name = this.value;
            _world.setActiveObject(name);
            let obj = _world.objects.find(ob => ob.name === name);
            let camparams = obj.lookFromLookAt();
            world.camera.position.set(camparams[0],camparams[1],camparams[2]);
            let lookAt = new T.Vector3(camparams[3],camparams[4],camparams[5])
            world.camera.lookAt(lookAt);
            world.orbit_controls.target = new T.Vector3(camparams[3],camparams[4],camparams[5]);
        }
    }
}
