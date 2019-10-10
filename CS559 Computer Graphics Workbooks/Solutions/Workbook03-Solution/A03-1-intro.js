/**
 * A03-1-intro.js - a simple JavaScript file that gets loaded with
 * page "A03-1-intro.html"
 *
 * written by Michael Gleicher, January 2019
 *
 */

// we do enable typescript type checking - see
// http://graphics.cs.wisc.edu/WP/cs559-sp2019/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

/**
 * 
 * This is for Box 3 - it loads in a separate module that holds the "Box3" code
 * so I can put that code into a separate file (called "A03-1-intro-box3.js")
 * 
 * Now is a good time to learn about modules!
 * 
 * Check your favorite JavaScript book (if it is up to date with ES6).
 * https://github.com/nzakas/understandinges6/blob/master/manuscript/13-Modules.md
 * is a nice tutorial.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
 * is an official reference
 */
import * as Box3 from "./A03-1-intro-box3.js";

/** Box 1 */
/**
 * 
 * Different versions of drawing the Triangle and Square for the 
 * Canvas elements in Box 1
 * 
 * Note that I am passing the canvas and context to these functions 
 * to keep them simpler for comparison.
 * 
 * You can read in window.onload to see how these functions are used
 */
/**
 * Draw the triangle and square in the first Canvas
 * 
 * @param {CanvasRenderingContext2D} context 
 */
//@@Snippet:initial
function drawTriSquare(context) {
    context.fillStyle = "goldenrod";
    context.fillRect(20,20,20,20);
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(25,25);
    context.lineTo(25,35);
    context.lineTo(35,30);
    context.fill();
}
//@@Snippet:end

/**
 * Draw the triangle and square at a specific X position
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {number} xval 
 */
//@@Snippet:params
function drawTriSquareParameter(context,xval) {
    context.fillStyle = "goldenrod";
    context.fillRect(20+xval,20,20,20);
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(25+xval,25);
    context.lineTo(25+xval,35);
    context.lineTo(35+xval,30);
    context.fill();
}
//@@Snippet:end

/**
 * Draw the triangle and square at a specific X position
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {number} xval 
 */
//@@Snippet:transform
function drawTriSquareTransform(context,xval) {
    context.save();
    context.translate(xval,0);
    drawTriSquare(context);
    context.restore();
}
//@@Snippet:end


window.onload = function() {
    /** 
     * Box 1 - setup code - the interesting parts are in the functions designed above
     */

    /** @type {HTMLCanvasElement} */
    let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("i01"));
    let context = canvas.getContext('2d');
    drawTriSquare(context);

    /** @type {HTMLCanvasElement} */
    let canvas11 = (/** @type {HTMLCanvasElement} */ document.getElementById("i01-1"));
    let context11 = canvas11.getContext('2d');

    /** @type {HTMLCanvasElement} */
    let canvas12 = (/** @type {HTMLCanvasElement} */ document.getElementById("i01-2"));
    let context12 = canvas12.getContext('2d');

    /** @type {HTMLInputElement} */
    let slider = (/** @type {HTMLInputElement} */ document.getElementById("sl01"));

    // draw the initial things
    let xval = Number(slider.value);
    // draw the boxes
    drawTriSquareParameter(context11,xval);
    drawTriSquareTransform(context12,xval);

    /** Set up the callback function to move the squares */
    slider.oninput = function() {
        // clear the canvases
        context11.clearRect(0,0,canvas11.width,canvas11.height);
        context12.clearRect(0,0,canvas12.width,canvas12.height);
        // get the X position and convert to a number
        let xval = Number(slider.value);
        // draw the boxes
        drawTriSquareParameter(context11,xval);
        drawTriSquareTransform(context12,xval);
    };


    /**
     * Box 2 - uses things from box 1
     */
    /** @type {HTMLCanvasElement} */
    let canvas2= (/** @type {HTMLCanvasElement} */ document.getElementById("i02"));
    let context2 = canvas2.getContext('2d');
    // @@Snippet:repeat
    drawTriSquare(context2);
    context2.translate(40,0);
    drawTriSquare(context2);
    context2.translate(40,0);
    drawTriSquare(context2);
    context2.translate(40,0);
    drawTriSquare(context2);
    // @@Snippet:end 


    /**
     * Box 3 - get used to using a Module!
     * 
     * See above - near the top for where I load the module
     */
    Box3.draw();



    /**
     * Box E - your turn! understand my code and fix it!
     * This is mainly about understanding what translate does.
     */
    /** @type {HTMLCanvasElement} */
    let canvasE= (/** @type {HTMLCanvasElement} */ document.getElementById("boxe-canvas"));
    let contextE = canvasE.getContext('2d');
    /** @type {HTMLButtonElement} */
    let buttonE= (/** @type {HTMLButtonElement} */ document.getElementById("boxe-jump"));

    /**
     * draw the box with a triangle in it - the jump flag says if the
     * button is pressed (if it is, the triangle should move to the right)
     * 
     * The student should fix this function - without using any negative numbers!
     * 
     * @param {number} jump 
     */
    function boxEdraw(jump) {
        contextE.clearRect(0,0,canvasE.width,canvasE.height);
        // Begin Example Solution
        contextE.save();
        // End Example Solution
        if (jump) {
            contextE.translate(20,0);
            contextE.fillStyle = "blue";
        } else {
            contextE.fillStyle = "red";
        }
        contextE.beginPath();
        contextE.moveTo(20,10);
        contextE.lineTo(10,30);
        contextE.lineTo(30,30);
        contextE.fill();
        // Begin Example Solution
        contextE.restore();
        // End Example Solution
    }
    // draw the initial triangle
    boxEdraw(0);

    // now make the button work
    buttonE.onmousedown = function() { boxEdraw(1); };
    buttonE.onmouseup = function() {boxEdraw(0); };
};