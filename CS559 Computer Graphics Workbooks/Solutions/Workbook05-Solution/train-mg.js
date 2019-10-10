/*jshint esversion: 6 */
// @ts-check

import {draggablePoints} from "./Libs/dragPoints.js";
import {RunCanvas} from "./Libs/runCanvas.js";

// stuff Student's don't get - put elsewhere to make sure I don't
// give it out accidentally
import {mikesDraw} from "./Libs/mikeTrain.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [ [150,150], [150,450], [450,450], [450,150]];

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
    let context = canvas.getContext("2d");
    // clear the screen
    context.clearRect(0,0,canvas.width,canvas.height);

    // draw the control points
    thePoints.forEach(function(pt) {
        context.beginPath();
        context.arc(pt[0],pt[1],5,0,Math.PI*2);
        context.closePath();
        context.fill();
    });

    // get the value

    // do the heavy lifting
    mikesDraw(canvas,context,thePoints,param);
}

/**
 * Setup stuff - make a "window.onload" that sets up the UI and starts
 * the train
 */
let oldOnLoad = window.onload;
window.onload = function() {
    let theCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let theContext = theCanvas.getContext("2d");
    // we need the slider for the draw function, but we need the draw function
    // to create the slider - so create a variable and we'll change it later
    let theSlider; // = undefined;

    // note: we wrap the draw call so we can pass the right arguments
    function wrapDraw() {
        // do modular arithmetic since the end of the track should be the beginning
        draw(theCanvas, Number(theSlider.value) % thePoints.length);
    }
    // create a UI
    let runcavas = new RunCanvas(theCanvas,wrapDraw);
    // now we can connect the draw function correctly
    theSlider = runcavas.range;

    /* add UI elements to turn things on and off */
    function addCheckbox(name,initial=false) {
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        document.getElementsByTagName("body")[0].appendChild(checkbox);
        checkbox.id = name;
        checkbox.onchange = wrapDraw;
        checkbox.checked = initial;
        let checklabel = document.createElement("label");
        checklabel.setAttribute("for","simple-track");
        checklabel.innerText = name;
        document.getElementsByTagName("body")[0].appendChild(checklabel);
    }
    // note: if you add these features, uncomment the lines for the checkboxes
    // in your code, you can test if the checkbox is checked by something like:
    // document.getElementById("simple-track").checked
    addCheckbox("simple-track",false);
    addCheckbox("arc-length",true);
    addCheckbox("bspline",false);

    // helper function - set the slider to have max = # of control points
    function setNumPoints() {
        runcavas.setupSlider(0,thePoints.length,0.05);
    }

    setNumPoints();
    runcavas.setValue(0);

    // add the point dragging UI
    draggablePoints(theCanvas,thePoints,
                    wrapDraw,
                    10,setNumPoints);


};
