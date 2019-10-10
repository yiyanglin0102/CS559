/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 *
 * Simple, automatic UI from an object with properly declared parameters 
 */

/** @module AutoUI */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";
// we need to import the module to get its typedefs for the type checker
import * as InputHelpers from "../Libs/inputHelpers.js";

export class AutoUI {
    /**
     * Create a UI panel for a GrObject
     * goes through the parameters and makes a slider for each
     * also defines a callback for those sliders that calls the
     * object's update function.
     * 
     * This does place the panel into the DOM (onto the web page)
     * using `insertElement` in the CS559 helper library. The place
     * it is placed is controlled the `where` parameter. By default,
     * it goes at the end of the DOM. However, you can pass it a DOM 
     * element to be placed inside (or some other choices as well).
     * 
     * @param {GrObject} object 
     * @param {number} [width=300] 
     * @param {InputHelpers.WhereSpec} [where] - where to place the panel in the DOM (at the end of the page by default)
     */
    constructor(object,width=300,where=undefined) {
        let self=this;
        this.object = object;
        this.div = InputHelpers.makeBoxDiv({width:width},where);
        InputHelpers.makeHead(object.name,this.div,{tight:true});
        this.sliders = object.params.map(function(param) {
            let slider = new InputHelpers.LabelSlider(param.name,
                {where:self.div,
                 width:width-20,
                 min:param.min,max:param.max,step:((param.max-param.min)/30),
                 initial:param.initial});
            return slider;
        });
        this.sliders.forEach(function(sl) { sl.oninput = function() {self.update();};});
        this.update(); 
    }
    update() {
        let vals = this.sliders.map(sl => Number(sl.value()));
        this.object.update(vals);
    }

    /**
     * 
     * @param {number | string} param 
     * @param {number} value 
     */
    set(param,value) {
        if (typeof(param)==='string') {
            for(let i=0; i<this.object.params.length; i++) {
                if (param==this.object.params[i].name) {
                    this.sliders[i].set(Number(value));
                    return;
                }
            }
            throw `Bad parameter ${param} to set`;
        } else {
            this.sliders[param].set(Number(value));
        }
    }

}
