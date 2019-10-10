/**
 * A03-4-rotate.js - a simple JavaScript file that gets loaded with
 * page "A03-4-rotate.html"
 *
 * written by Michael Gleicher, January 2019
 *
 */

// see other files for explanation of these comments
 // @ts-check
/* jshint -W069, esversion:6 */

/**
 *
 * @param {CanvasRenderingContext2D} context
 */
function drawTriSquare(context) {
    context.fillStyle = "goldenrod";
    context.fillRect(0,0,20,20);
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(5,5);
    context.lineTo(5,15);
    context.lineTo(15,10);
    context.fill();
}


function box1() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b1"));
    let canvasC= /** @type {HTMLCanvasElement} */ (document.getElementById("b1c"));

    let context = canvas.getContext('2d');
    let contextC = canvasC.getContext('2d');

    let slider = /** @type {HTMLInputElement} */(document.getElementById("s1"));
    function sliderChange() {
        let val = slider.value;
        document.getElementById("sp1").value = val;
        // draw the first canvas
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.rotate(Number(val)*Math.PI);
        drawTriSquare(context);
        context.restore();
        // draw the second canvas
        contextC.clearRect(0,0,canvas.width,canvas.height);
        contextC.save();
        contextC.translate(canvas.width/2,canvas.height/2);
        // draw axes BEFORE rotating
        contextC.beginPath();
        contextC.lineWidth = 1;
        contextC.strokeStyle = 'black';
        contextC.moveTo(-canvas.width/2,0);
        contextC.lineTo(canvas.width/2,0);
        contextC.moveTo(0,-canvas.height/2);
        contextC.lineTo(0,canvas.height/2);
        contextC.stroke();
        contextC.rotate(Number(val)*Math.PI);
        drawTriSquare(contextC);
        contextC.restore();

    }
    slider.oninput = sliderChange;
    sliderChange();
}


function box2() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b2"));
    let context = canvas.getContext("2d");

    let slider = /** @type {HTMLInputElement} */(document.getElementById("s2"));

    function sliderChange() {
        let val = slider.value;
        let spin = Number(val) * Math.PI;
        // draw the first canvas
        context.clearRect(0,0,canvas.width,canvas.height);

        context.save();
        context.fillStyle = "red";
        context.rotate(spin);
        context.fillRect(30,30,20,20);
        context.restore();

        context.save();
        context.fillStyle = "blue";
        context.translate(80,30);
        context.rotate(spin);
        context.translate(-80,-30);
        context.fillRect(80,30,20,20);
        context.restore();

        context.save();
        context.fillStyle = "purple";
        context.translate(140,40);
        context.rotate(spin);
        context.translate(-140,-40);
        context.fillRect(130,30,20,20);
        context.restore();

        context.save();
        context.fillStyle = "goldenrod";
        context.translate(200,50);
        context.rotate(spin);
        context.translate(-200,-50);
        context.fillRect(180,30,20,20);
        context.restore();
    }
    slider.oninput = sliderChange;
    slider.value = "0";
    sliderChange();
}


/**
 * The box that has the windmill!
 */
function box3() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b3"));
    let context = canvas.getContext("2d");

    // parameters of the windmill
    const height=100;
    const width=30;
    const bladeLength=80;
    const bladeThin=8;
    const bladeThick=16;
    const bladeOffset=7;

    /**
     * Draw the windmill - it's positioned at X=0, at the bottom of the
     * window (Y is up!). The windmill is drawn at X=0.
     * We pass the angle for the fan/propeller/whatever you call it.
     *
     * @param {number} angle
     */
    function drawMill(angle) {
        context.save();
        // draw the base - just a triangle
        context.fillStyle = "brown";
        context.beginPath();
        context.moveTo(0,height);
        context.lineTo(-width,0);
        context.lineTo(width,0);
        context.fill();
        // draw the propeller
        context.save();
            context.translate(0,height);    // we'll build the propeller at the origin, move into place
            context.rotate(angle);          // spin the propeller
            // place the different blades at 90 degree angles to the first
            for (let blades=0; blades<4; blades++) {
                context.fillStyle = "black";
                context.fillRect(0,-bladeThin/2,bladeLength,bladeThin);
                context.fillStyle = "gray";
                context.fillRect(bladeOffset,bladeThin/2,bladeLength,bladeThick);
                context.rotate(Math.PI/2);
            }
        context.restore();
        context.restore();
    }
    function drawScene() {
        let a = performance.now()/4000;
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        // flip the coordinate system since I like Y-up
        context.scale(1,-1);
        context.translate(0,-canvas.height);
        // draw the windmill away from the edge
        context.save();
        context.translate(100,0);
        drawMill(a);
        context.restore();
        context.save();
        context.translate(300,0);
        context.scale(0.8,0.8);
        drawMill(a);
        context.restore();

        context.restore();
        window.requestAnimationFrame(drawScene);
    }
    drawScene();
}

/**
 * Stuff for Box 4 is in a separate file
 */
import * as Box4 from "./A03-4-rotate-arm.js";

/////////////////////////////////////////////

window.onload = function() {
    box1();
    box2();
    box3();
    Box4.setup();
};
