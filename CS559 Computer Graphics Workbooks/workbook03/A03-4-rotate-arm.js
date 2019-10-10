/**
 * A03-4-rotate-arm.js - 
 * A module used by A03-4-rotate.js to help with Box 4
 * 
 * This is its own module just to put everything in one place
 * 
 * An example of an articulated arm.
 * Written in a way that makes the code expose the ideas - not
 * necessarily good software engineering practice.
 *
 * written by Michael Gleicher, January 2019
 *
 */

// see other files for explanation of these comments
 // @ts-check
/* jshint -W069, esversion:6 */

// length of bones
const wristLength = 20;
const upperArmLength = 20;

// angles for joints
// having these as "global" (to the module) variables is easy
// but generally not a good idea - it means that all arms use
// the same angles
let wristAngle = 0;
let elbowAngle = 0;
let shoulderAngle = 0;

/********
 * Functions that draw the different parts
 * 
 * Each part is in its own local coodinate system
 * Each part draws its children
 */
/**
 * draws the hand - pointing along the X axis, center is where it
 * connects to the wrist (the "wrist joint")
 * @param {CanvasRenderingContext2D} context 
 */
function drawHand(context) {
    context.save();
    context.fillStyle = "lightpink";
    context.beginPath();
    context.moveTo(10,0);
    context.lineTo(8,-6);
    context.lineTo(0,-4);
    context.lineTo(0,4);
    context.lineTo(8,6);
    context.fill();
    context.restore();
}

/**
 * draws the forearm/wrist - the hand gets translated and rotated into place
 * the center of the coordinate system is the elbow joint
 * @param {CanvasRenderingContext2D} context 
 */
function drawWrist(context) {
    context.save();
    // the "wrist bone"
    context.fillStyle = "red";
    context.fillRect(0,-3,wristLength,6);
    // now place the hand at the "wrist joint"
    context.translate(wristLength,0);
    context.rotate(wristAngle);
    drawHand(context);
    context.restore();
}

/**
 * draws the upper arm - the forarm gets connected at the elbow
 * the center of the upper arm coordinate system is the shoulder
 * the bone goes along the X axis
 * @param {CanvasRenderingContext2D} context 
 */
function drawUpperArm(context) {
    context.save();
    // draw the "upper arm bone"
    context.fillStyle = "purple";
    context.fillRect(0,-4,upperArmLength,8);
    context.translate(upperArmLength,0);
    context.rotate(elbowAngle);
    drawWrist(context);
    context.restore();
}

function drawTorso(context) {
    context.save();
    context.fillStyle = "lightblue";
    context.beginPath();
    context.moveTo(-8,0);
    context.lineTo(8,0);
    context.lineTo(12,-20);
    context.lineTo(-12,-20);
    context.fill();
    context.translate(10,-16);
    context.rotate(shoulderAngle);
    drawUpperArm(context);
    context.restore();
}

/**
 * Draw a part in its own coordinate system
 * 
 * This is useful for the demo where we have multiple Canvas
 * so we can show each piece by itself
 * 
 * @param {string} element 
 * @param {function} func 
 */
function drawPart(element,func) {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(element));
    let context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    context.translate(20,canvas.height/2);
    context.scale(2,2);
    func(context);
    context.restore(); 
    context.save();
    context.lineWidth = 1;
    context.strokeStyle = "black"; 
    context.setLineDash([2,2]);    
    context.beginPath();
    context.moveTo(20,0);
    context.lineTo(20,canvas.height);
    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.stroke();
    context.restore();
}


/**
 * This function sets up the 3 sliders and 4 Canvases on the A03-4-rotate
 * page for Box 4.
 * 
 * It uses the drawing code above
 */
export function setup() {
    let slider1 = /** @type {HTMLInputElement} */(document.getElementById("s4-1"));
    let slider2 = /** @type {HTMLInputElement} */(document.getElementById("s4-2"));
    let slider3 = /** @type {HTMLInputElement} */(document.getElementById("s4-3"));
    slider1.value="0";
    slider2.value="0";
    slider3.value="0";
    
    function sliderChange() {
        wristAngle = Number(slider1.value) * Math.PI;
        elbowAngle = Number(slider2.value) * Math.PI;
        shoulderAngle = Number(slider3.value) * Math.PI;
        drawPart("b4-1",drawHand);
        drawPart("b4-2",drawWrist);
        drawPart("b4-3",drawUpperArm);
        drawPart("b4-4",drawTorso);
    }

    slider1.oninput = sliderChange;
    slider2.oninput = sliderChange;
    slider3.oninput = sliderChange;

    sliderChange();
}