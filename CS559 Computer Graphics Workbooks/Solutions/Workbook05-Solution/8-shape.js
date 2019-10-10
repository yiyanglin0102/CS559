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
    // Begin Example Solution
    let theCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box8-1"));
    let context = theCanvas.getContext("2d");
    // Generate random coordinates and color components
    function rand_x() {return Math.random() * theCanvas.width;}
    function rand_y() {return Math.random() * theCanvas.height;}
    function rand_c() {return Math.random() * 255;}
    // Start at top-left corner and draw random path using bezier curves
    let px = 0;
    let py = 0;
    for (let i = 0; i < 100; i ++) 
    {
      context.beginPath();
      context.strokeStyle = `rgb(${rand_c()}, ${rand_c()}, ${rand_c()})`;
      context.moveTo(px, py);
      px = rand_x();
      py = rand_y();
      context.bezierCurveTo(rand_x(), rand_y(), rand_x(), rand_y(), px, py);
      context.stroke();
    }
    // Finish the path with a line to the bottom-right corner
    context.beginPath();
    context.strokeStyle = `rgb(${rand_c()}, ${rand_c()}, ${rand_c()})`;
    context.moveTo(px, py);
    context.lineTo(theCanvas.width, theCanvas.height);
    context.stroke();
    // End Example Solution
 }



 /**
  * Use my UI code!
  */
function exercise82()
{
  let theCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box8-2"));
  let thePoints = [ [100,100], [200,100], [200,200], [100,200]];
  // Begin Example Solution
  let context = theCanvas.getContext("2d");
  // Draw the hexagon
  let r = Math.min(theCanvas.width + theCanvas.height) / 8;
  for (let i = 0; i < 6; i ++) 
  {
    let theta = i / 6 * 2 * Math.PI;
    thePoints[i] = [theCanvas.width / 2 + r * Math.cos(theta), theCanvas.height / 2 + r * Math.sin(theta)];
  }
  // End Example Solution

  function draw() {
    /** student does stuff here **/
    // Begin Example Solution
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    let r = 10;
    // Draw a circle for each point
    thePoints.forEach(function(pt)
    {
      context.save();
      context.translate(pt[0], pt[1]);
      context.beginPath();
      context.arc(0, 0, r, 0, 2 * Math.PI);
      context.fill();
      context.restore();
    });
    // Draw a line connecting the points
    context.save();
    let n = thePoints.length - 1;
    context.beginPath();
    context.moveTo(thePoints[n][0], thePoints[n][1]);
    context.lineWidth = r / 2;
    thePoints.forEach(function(pt)
    {
      context.lineTo(pt[0], pt[1]);
    });
    context.stroke();
    context.restore();
    // End Example Solution
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
