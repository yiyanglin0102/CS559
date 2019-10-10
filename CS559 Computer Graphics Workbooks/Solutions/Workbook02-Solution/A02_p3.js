// This file is modified as the sample solution for Workbook 2
/**
 * A02_p3 - a simple JavaScript file that gets loaded with
 * page "A02_p3.html"
 * 
 * started by Michael Gleicher, January 2019
 * 
 * finished by STUDENT
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
 * Put your code for picture 1 here
 * 
 * Remember to make:
 * - a circle
 * - a triangle
 * - a capsule (two semi-circles with straight lines connecting them)
 * - a sawtooth / mountain
 */
function wb2_pg3_ex1() {
    // use type information to make TypeScript happy
    /** @type {HTMLCanvasElement} */
    let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas1"));

    // the student should fill in the rest...
    // Begin Example Solution
    let context = canvas.getContext('2d');
    // Draw the circle
    context.fillStyle = "#F8E";
    context.strokeStyle = "#846";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(50, 50, 25, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    // Draw the triangle
    context.fillStyle = "sandybrown";
    context.strokeStyle = "darkgoldenrod";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(25, 150);
    context.lineTo(75, 150);
    context.lineTo(50, 110);
    context.closePath();
    context.fill();
    context.stroke();

    // Draw the rounded rectangle (use arc)
    context.fillStyle = "lightpink";
    context.strokeStyle = "darkred";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(125, 25);
    context.lineTo(175, 25);
    context.arc(175, 50, 25, 1.5 * Math.PI, 0.5 * Math.PI);
    context.lineTo(175, 75);
    context.lineTo(125, 75);
    context.arc(125, 50, 25, 0.5 * Math.PI, 1.5 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();

    // Draw the sawtooth
    context.fillStyle = "gray";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(100, 150);
    context.lineTo(200, 150);
    context.lineTo(200, 125);
    context.lineTo(175, 100);
    context.lineTo(150, 125);
    context.lineTo(120, 100);
    context.lineTo(100, 125);
    context.closePath();
    context.fill();
    context.stroke();
    // End Example Solution
}

/**
 * Put your code for picture 2 here
 */
function wb2_pg3_ex2() {
    // use type information to make TypeScript happy
    /** @type {HTMLCanvasElement} */
    let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas2"));

    // the student should fill in the rest...
    // Begin Example Solution
    let context = canvas.getContext("2d");
    context.lineWidth = 3;
    let radius = 25;

    // Color is not linear, so this interpolation is not perfect (but good enough)
    /**
     * Use linear interp
     * @param {array} color1 - A three element array [r, g, b]
     * @param {array} color2 - A three element array [r, g, b]
     * @param {number} splits - Number of wanted gradient colors
     */
    function generateColorGradients(color1, color2, splits) {
        let colors = [];
        for (let g = 0; g < splits; g++){
            let factor = g / splits;
            let result = []; 
            for (let i = 0; i < 3; i++) {
                result.push(Math.round(factor * color1[i] + ((1 - factor) * color2[i])));
            }
            colors.push(result);
        }
        return colors;
    }

    /**
     * Draw a single scale (3/4 circle with given fill color)
     * @param {number} x - x value of the center
     * @param {number} y - y value of the center
     * @param {string} fillColor - CSS color format to fill the scale
     * @param {number} shift - Alternating between 0 and 1 to move every row of scales
     */
    function drawOneScale(x, y, fillColor, shift=0) {
        context.fillStyle = fillColor;
        context.beginPath();
        if (shift == 1) {
            context.arc(x+radius, y, radius, -Math.PI/4, 5/4*Math.PI);
        } else {
            context.arc(x, y, radius, -Math.PI/4, 5/4*Math.PI);
        }
        context.fill();
        context.stroke();
    }

    // Generate 21 discret colors as color gradients
    let myColors = generateColorGradients([143, 212, 255], [9, 0, 134], 21);

    // Draw the scales (order matters, so upper scales can cover the previous ones)
    // We want to overshoot a little bit to fill the entire canvas (so choose 21, 12 insteand of 20, 10)
    for (let r = 0; r < 21; r++){
        let curY = 500-r*25;
        let curColor = `rgb(${myColors[r][0]}, ${myColors[r][1]}, ${myColors[r][2]})`;
        for (let c = 0; c < 12; c++){
            drawOneScale(c*50, curY, curColor, r%2);
        }
    }

    /**
     * Add some transparent bubbles upon the scales
     * @param {number} x - x value of the bubble center
     * @param {number} y - y value of the bubble center
     * @param {number} r - radius of this bubble
     * @param {number} strokeAlpha - between 0 and 1, the transparency value of stroke
     * @param {number} fillAlpha - between 0 and 1, the transparency value of fill
     */
    function drawBubble(x, y, r, strokeAlpha, fillAlpha) {
        context.beginPath();
        context.arc(x, y, r, 0, 2*Math.PI);
        context.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha})`;
        context.fillStyle = `rgba(255, 255, 255, ${fillAlpha})`;
        context.stroke();
        context.fill();
    }

    // Draw some transparent bubbles
    drawBubble(400, 400, 60, 0.8, 0.2);
    drawBubble(215, 325, 80, 0.5, 0.1);
    drawBubble(350, 130, 30, 0.4, 0.2);

    // End Example Solution
}

function wb2_pg3_ex3() {
    // Begin Second Example Solution
    /** @type {HTMLCanvasElement} */
    let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas3"));

    // the student should fill in the rest...
    // Begin Example Solution
    let context = canvas.getContext("2d");

    // Function to handle drawing the laser part of the lightsaber.
    // Allows customizing of the glow color, the spread of the glow,
    // and the dimensions of the laser.
    function drawLaser(x, y, len, wid, spread, color, context)
    {
        // first, outermost glow
        context.fillStyle = color+"22";
        context.beginPath();
        context.arc(x, y, wid*spread*2, 0, Math.PI);
        context.arc(x+wid, y-len+wid, wid*spread*2, Math.PI, 2*Math.PI);
        context.closePath();
        context.fill();
        // then, middle glow
        context.fillStyle = color+"44";
        context.beginPath();
        context.arc(x, y, wid*spread*1.5, 0, Math.PI);
        context.arc(x+wid, y-len+wid, wid*spread*1.5, Math.PI, 2*Math.PI);
        context.closePath();
        context.fill();
        // next, inner glow
        context.fillStyle = color+"88";
        context.beginPath();
        context.arc(x, y, wid*spread, 0, Math.PI);
        context.arc(x+wid, y-len+wid, wid*spread, Math.PI, 2*Math.PI);
        context.closePath();
        context.fill();
        // finally, draw core
        context.fillStyle = 'white'
        context.beginPath();
        context.arc(x, y, wid, 0, Math.PI);
        context.arc(x+wid, y-len+wid, wid, Math.PI, 2*Math.PI);
        context.closePath();
        context.fill();
    }

    // Function to handle drawing the hilt of the lightsaber.
    // Allows customizing of the dimensions of the hilt.
    function drawHilt(x, y, len, wid, context) {
        context.strokeStyle = "000000";
        context.fillStyle = '#DDDDDD';
        // first, the main hilt
        context.strokeRect(x-wid, y+0.15*len, 2*wid, 0.85*len);
        context.fillRect(x-wid, y+0.15*len, 2*wid, 0.85*len);
        // next, the sorta-triangular top bit.
        context.beginPath();
        context.moveTo(x-1.3*wid, y+0.15*0.5*len);
        context.lineTo(x-1.3*wid, y+0.15*len);
        context.lineTo(x+1.3*wid, y+0.15*len);
        context.lineTo(x+1.3*wid, y-0.15*0.5*len);
        context.closePath();
        context.stroke();
        context.fill();
        // now the little extra guard piece.
        context.fillStyle = '#888888';
        context.beginPath();
        context.moveTo(x-1.5*wid, y+0.15*len);
        context.lineTo(x+1.5*wid, y+0.15*len);
        context.lineTo(x+1.5*wid, y+0.25*len);
        context.lineTo(x+0.2*wid, y+0.25*len);
        context.lineTo(x-0.2*wid, y+0.2*len);
        context.lineTo(x-1.5*wid, y+0.2*len);
        context.closePath();
        context.fill();
        // add the little button things
        context.fillStyle = 'gold';
        context.fillRect(x+1.3*wid, y+0.12*len, 0.2*wid, 0.01*len);
        context.fillRect(x+1.5*wid, y+0.11*len, 0.2*wid, 0.03*len);
        context.fillStyle = '#AAAAAA';
        context.strokeRect(x+1.5*wid, y+0.19*len, 0.15*wid, 0.03*len);
        context.fillRect(x+1.5*wid, y+0.19*len, 0.15*wid, 0.03*len);
        context.strokeRect(x+1.65*wid, y+0.17*len, 0.2*wid, 0.07*len);
        context.fillRect(x+1.65*wid, y+0.17*len, 0.3*wid, 0.07*len);
        context.fillStyle = '#444444';
        context.beginPath();
        context.arc(x, y+0.27*len, 0.25*wid, 0, 2*Math.PI);
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(x, y+0.32*len, 0.25*wid, 0, 2*Math.PI);
        context.closePath();
        context.fill();
        // now, the bit at the middle
        context.fillStyle = '#111111';
        context.fillRect(x-1.3*wid, y+0.36*len, 2.6*wid, 0.2*len);
        context.fillRect(x-1.7*wid, y+0.38*len, 0.4*wid, 0.16*len);
        context.fillStyle = '#888888';
        context.fillRect(x-1.95*wid, y+0.38*len, 0.25*wid, 0.16*len);
        context.fillStyle = '#111111';
        context.fillRect(x-2.15*wid, y+0.38*len, 0.2*wid, 0.16*len);
        // penultimate pieces - the little grip things.
        context.fillStyle = '#222222';
        context.fillRect(x-1.3*wid, y+0.65*len, 0.4*wid, 0.35*len);
        context.fillRect(x-0.4*wid, y+0.65*len, 0.8*wid, 0.35*len);
        context.fillRect(x+0.9*wid, y+0.65*len, 0.4*wid, 0.35*len);
        // finally, the little endcap
        context.strokeRect(x-wid, y+len, 2*wid, 0.03*len);
        context.fillStyle = '#888888';
        for(let i=0; i < 5; i++)
        {
            context.fillRect(x-(1 - 0.4*i)*wid, y+len, 0.2*wid, 0.03*len);
        }
        context.fillStyle = '#DDDDDD';
        for(let i=0; i < 5; i++)
        {
            context.fillRect(x-(1 - 0.2 - 0.4*i)*wid, y+len, 0.2*wid, 0.03*len);
        }
    }
    let x = 250;
    let y= 350;
    drawLaser(x, y, 280, 6, 3.5, '#0000FF', context);
    drawHilt(x, y, 130, 9, context);
    // End Second Example Solution
}

/**
 * you don't need to change this
 */
window.onload = function()
{
    wb2_pg3_ex1();
    wb2_pg3_ex2();
    wb2_pg3_ex3();
}