/*jshint esversion: 6 */
// @ts-check

/**
 *  Simple version of an auto-update slider to have looping time
 *
 * Designed for making quick UIs for CS559 demos
 * 
 * Students are welcome to read the code to understand it, but are not
 * expected to modify this file.
 */

import {insertAfter} from "./inputHelpers.js";

/**
 * the main thing is implemented as a class in case you want access to everything
 */
export class RunCanvas {
    /**
     * 
     * @param {HTMLCanvasElement|string} canvasNameOrCanvas 
     * @param {*} drawFunc 
     * @param {*} noLoop 
     */
    constructor(canvasNameOrCanvas,drawFunc,noLoop=false) {
        /* so often, we pass the wrong thing - so make it work either way */
        let canvas;     //  = undefined
        let canvasName; //  = undefined
        if (canvasNameOrCanvas instanceof(HTMLCanvasElement)) {
            canvas = canvasNameOrCanvas;
            canvasName = canvas.id;
        } else {
            canvasName = canvasNameOrCanvas;
            canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(canvasName));
        }
        if (!canvas) {
            throw "RunCanvas without a Canvas to attach to!";
        }
        if (!canvasName) {
            canvasName = "canvas-"+performance.now().toString();
            console.log("RunCanvas with an unnamed canvas - naming it "+canvasName);
            canvas.id = canvasName;
        }

        this.canvas = /** @type {HTMLCanvasElement} */ (canvas);
        this.canvasName = canvasName;
        this.drawFunc = drawFunc;
        this.noloop = noLoop;

        // create the elements
        this.br = document.createElement("br");
        this.br.id = canvasName + "-br";

        this.range = document.createElement("input");
        this.range.id = canvasName + "-slider";
        this.range.setAttribute("type","range");
        this.range.style.width = String(this.canvas.width - 50 - 20 -10)+"px";
        // give default values for range
        this.setupSlider(0,1,0.01);

        this.text = document.createElement("input");
        this.text.id = canvasName+"-text";
        this.text.setAttribute("type","text");
        this.text.style.width = "50px";
        this.text.setAttribute("readonly","1");

        this.runbutton = document.createElement("input");
        this.runbutton.id=canvasName + "-run";
        this.runbutton.setAttribute("type","checkbox");
        this.runbutton.style.width="20px";

        this.br2 = document.createElement("br");
        this.br2.id = canvasName + "-br2";
        
        insertAfter(this.br, this.canvas);
        insertAfter(this.runbutton, this.br);
        insertAfter(this.text, this.runbutton);
        insertAfter(this.range,this.text);
        insertAfter(this.br2,this.range);

        let self = this;
        this.runbutton.onchange = function () { 
            if (self.noloop && Number(self.range.value)>=1) {
                self.setValue(0);
            }
            self.advance(); 
        };
        this.range.oninput = function() {
            let val = Number(self.range.value);
            self.setValue(val);
        };
    
     }
    /**
     * Setup aspects of the slider - as a function in case you need to change them
     * @param {Number} min 
     * @param {Number} max 
     * @param {Number} step 
     */
    setupSlider(min,max,step) {
        this.range.setAttribute("min",String(min));
        this.range.setAttribute("max",String(max));
        this.range.setAttribute("step",String(step));
    }

    setValue(value) {
        let valString = String(value);
        this.range.value = valString;
        this.text.value = valString;
        if (this.drawFunc) {
            this.drawFunc(this.canvas,value);
        }
    }

    advance() {
        let maxV = Number(this.range.max);
        let stepV = Number(this.range.step);
        let value = Number(this.range.value) + stepV;
        if (this.noloop) {
            if (value >= maxV) {
                this.runbutton.checked = false;
            }
            value = Math.min(maxV,value);
        } else {
            value = value % maxV;
        }
        this.setValue(value);
        if (this.runbutton.checked) {
            let self=this;
            window.requestAnimationFrame(function () {self.advance();} );
        }
    }

}

/**
 * simple entry point - give it the name of a canvas, and it guesses the rest
 * but it also loses access to all the parameters
 * 
 * @param {HTMLCanvasElement|string} canvasName 
 * @param {function(HTMLCanvasElement, Number) : any} [drawFunc]
 */ 
export function runCanvas(canvasName, drawFunc = undefined, initial=0.5, noloop=false, min=0, max=1, step=0.02) {
    let rc = new RunCanvas(canvasName,drawFunc,noloop);
    rc.setupSlider(min,max,step);
    rc.setValue(initial);
 }


