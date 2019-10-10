/*jshint esversion: 6 */
// @ts-check

import {draggablePoints} from "./Libs/dragPoints.js";
import {RunCanvas} from "./Libs/runCanvas.js";

/**
 * drawing function for box 1
 *
 * draw something. The canvas is has id "box8-1"
 **/
 function exercise81()
 {

 }



 /**
  * Use my UI code!
  */
function exercise82()
{
  let theCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box8-2"));
  let thePoints = [ [100,100], [200,100], [200,200], [100,200]];

  function draw() {
    /** student does stuff here **/
  }

  draggablePoints(theCanvas,thePoints,draw);
  draw();
}

/**
 * start things up!
 **/
 window.onload = function() {
   exercise81();
   exercise82();
 }
