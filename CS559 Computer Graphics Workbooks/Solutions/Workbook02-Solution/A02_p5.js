// This file is modified as the sample solution for Workbook 2
/**
 * A02_p5 - a simple JavaScript file that gets loaded with
 * page "A02_p5.html"
 * 
 * started by Michael Gleicher, January 2019
 * 
 * but filled in by STUDENT
 * 
 * Note: the student code should go into the functions
 * wb2_pg5_ex1 and wb2_pg5_ex2
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

// Begin Example Solution
// Additional functions useful for both exercises
// Set the list of colors to randomize over
let rainbow = ["red", "green", "yellow", "blue", "orange", "purple", "cyan"];
// Get the x-coordinate and y-coordinate relavent to the canvas' top left corner for mouse events
/** @param {MouseEvent} event */
function getX(event) {return event.clientX - event.target.getBoundingClientRect().left;}
/** @param {MouseEvent} event */
function getY(event) {return event.clientY - event.target.getBoundingClientRect().top;}
// Get a random number (real and integer) between a and b
/** @param {number} a */
/** @param {number} b */
function rand(a, b) {return Math.random() * (b - a) + a;}
/** @param {number} a */
/** @param {number} b */
function randint(a, b) {return Math.floor(rand(a, b + 1));}
// Fill a square specified by its center (x, y), its radius (half side length) r, and its color c
function drawSquare(context, sqr)
{
        context.fillStyle = sqr.c;
        context.fillRect(sqr.x - sqr.r, sqr.y - sqr.r, 2 * sqr.r, 2 * sqr.r);
}
// Fill a square specified by its center (x, y), its radius r, and its color c
function drawCircle(context, cir)
{
        context.fillStyle = cir.c;
        context.beginPath();
        context.arc(cir.x, cir.y, cir.r, 0, 2 * Math.PI);
        context.fill();
}
// End Example Solution

/**
 * Function for the STUDENT to do exercise 1
 */
function wb2_pg5_ex1() 
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex1canvas"));
        let context = canvas.getContext('2d');

        // Begin Example Solution
        // Set the radius of the circles
        let circleSize = 10;
        // Set the original and the mouse-over colors
        let color1 = "black";
        let color2 = "red";

        // The function to handle the click event
        /** @param {MouseEvent} event */
        function click(event)
        {
                // Get the mouse position
                let x = getX(event);
                let y = getY(event);
                // Add a new circle with color 2 because it is under the mouse
                circles.push({"x":x, "y":y, "r":circleSize, "c":color2});
                // Clear the canvas and redraw all the circles
                context.clearRect(0, 0, canvas.width, canvas.height);
                circles.forEach(cir => drawCircle(context, cir));
        }

        // The function to handle the mouse-over event
        /** @param {MouseEvent} event */
        function over(event)
        {
                // Get the mouse position
                let x = getX(event);
                let y = getY(event);
                // Get the list of circles that are under the mouse position
                // Note that it is done by filtering the list for circles whose center is within "circleSize" length of the mouse position
                let selected = circles.filter(cir => (cir.x - x) * (cir.x - x) + (cir.y - y) * (cir.y - y) <= circleSize * circleSize);
                // Change the colors of all the circles back to color 1
                circles.forEach(cir => cir.c = color1);
                // Change the colors of all the selected circles to color 2
                selected.forEach(cir => cir.c = color2);
                // Clear the canvas and redraw all the circles
                context.clearRect(0, 0, canvas.width, canvas.height);
                circles.forEach(cir => drawCircle(context, cir));
        }
        
        // Initialize the list of circles and assign the click event
        let circles = [];
        canvas.onclick = event => click(event);
        canvas.onmousemove = event => over(event);
        // End Example Solution
}

// Begin Example Solution Version 1
/**
 * given a mouse event, return the x,y position in the canvas
 * (assumes the event is for a canvas)
 * note: we need to figure out where the canvas is
 * @param {MouseEvent} event 
 */
function eventToClick(event) {
        // what element if the event on?
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        let x = event.clientX - box.left;
        let y = event.clientY - box.top;
        return [x,y]
    }

/**
 * Function for the STUDENT to do exercise 1
 */
function wb2_pg5_ex2_mike()
{
    /** @type {HTMLCanvasElement} */
    let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex2canvas_mike"));
    let context = canvas.getContext('2d');

    /** @type {Array[object]} */
    let circles = [];
    /** @type {Array[object]} */
    let squares = [];

    canvas.onclick= function(evt) {
        let [x,y] = eventToClick(evt); 
        circles.push({"x":x, "y":canvas.height, "tx":x, "ty":y, "vx":0, "vy":-8});
    };

    function draw() {
        context.clearRect(0,0,canvas.width,canvas.height);

        // update the positions
        squares.forEach(function(s) {
            s.x += s.vx;
            s.y += s.vy;
            s.life -= 1;
        });
        // kill dead particles
        squares = squares.filter(s => s.life>0);

        circles.forEach(function(c) {
            c.x += c.vx;
            c.y += c.vy;
            // see if the circle got to its destination (or past it!)
            if (c.y <= c.ty) {
                c.kill = true;  
                // Make some squares
                let nsquares = 10 + Math.round(10*Math.random());
                for(let i=0; i<nsquares; i++) {
                    squares.push({"x":c.tx, "y":c.ty, 
                                  "vx":(Math.random()-0.5)*16, "vy":(Math.random()-0.5)*16, 
                                  "life":20 + Math.round(20*Math.random())});
                }
            }
        });
        circles = circles.filter(c => !c.kill);
        

        context.fillStyle = "black";
        circles.forEach(function(c) {
            context.beginPath();
            context.arc(c.x, c.y, 10, 0, Math.PI*2);
            context.fill();
        });
        context.fillStyle = "red";
        squares.forEach(function(c) {
            context.fillRect(c.x-3, c.y-3, 6, 6);
        });

        window.requestAnimationFrame(draw);
    }
    draw();
}
// End Example Solution

function wb2_pg5_ex2()
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex2canvas"));
        let context = canvas.getContext('2d');

        // Begin Example Solution Version 2
        // Set the circle (and square) size
        let circleSize = 5;
        // Set the number of frames until the circle explodes
        let timeToExplode = 20;
        // Set the minimum and maximum number of squares generated by an explosion
        let minExplosion = 10;
        let maxExplosion = 20;
        // Set the maximum initial speed of the squares
        let maxInitialSpeed = 10;
        // Set the acceleration in the y direction
        let gravity = 0.5;
        // Set the probability 
        let randomCircleProb = 0.01;
        // Create a square object at location (x, y) with color c and initial velocity (vx, vy)
        /** @param {number} x */
        /** @param {number} y */
        /** @param {string} c */
        /** @param {number} vx */
        /** @param {number} vy */
        function genSquare(x, y, c, vx, vy)
        {
                return {"x":x, "y":y, "r":circleSize, "c":c, "vx":vx, "vy":vy};
        }
        // Create a circle object at location (x, 0) with target location (tx, ty)
        /** @param {number} x */
        /** @param {number} tx */
        /** @param {number} ty */
        function genCircle(x, tx, ty)
        {
                return {"x":x, "y":canvas.height, "r":circleSize, "c":rainbow[randint(0, rainbow.length - 1)], "vx":((tx - x) / timeToExplode), "vy":((canvas.height - ty) / timeToExplode), "tx":tx, "ty":ty};
        }
        // Find square location in the next frame given its current location, velocity and acceleration
        /** @param {any} sqr */
        function nextSquare(sqr) 
        {
                sqr.x += sqr.vx;
                sqr.y -= sqr.vy;
                sqr.vy -= gravity;
        }
        // Find circle location in the next frame given its current location, velocity and acceleration
        /** @param {any} cir */
        function nextCircle(cir) 
        {
                cir.x += cir.vx; 
                cir.y -= cir.vy;
                // If the circle reaches its target height, create a random number of square with the same location and color as the circle
                if (cir.y < cir.ty) 
                {
                        for (let i = 0; i < randint(minExplosion, maxExplosion); i ++) squares.push(genSquare(cir.tx, cir.ty, cir.c, rand(-maxInitialSpeed, maxInitialSpeed), rand(-maxInitialSpeed, maxInitialSpeed)));
                }
        }

        // Initialize the list of circles and squares
        let circles = [];
        let squares = [];
        // Push a new circle with a random initial location when there is a mouse click
        canvas.onclick = event => circles.push(genCircle(rand(0, canvas.width), getX(event), getY(event)));
        // The animation function
        function animate_ex2()
        {
                // With probability "randomCircleProb", push a new circle with a random initial and target location
                if (rand(0, 1) < randomCircleProb) circles.push(genCircle(rand(0, canvas.width), rand(0, canvas.width), rand(0, canvas.height)));
                // Move the squares and the circles for the next frame
                squares.forEach(sqr => nextSquare(sqr));
                circles.forEach(cir => nextCircle(cir));
                // Remove the squares that fall below the ground
                squares = squares.filter(sqr => sqr.y < canvas.height + sqr.r);
                // Remove the circles that exploded (above their target height)
                circles = circles.filter(cir => cir.y >= cir.ty);
                // Clear the canvas and draw the squares and the circles
                context.clearRect(0, 0, canvas.width, canvas.height);
                squares.forEach(sqr => drawSquare(context, sqr));
                circles.forEach(cir => drawCircle(context, cir));
                window.requestAnimationFrame(animate_ex2);
        }
        animate_ex2();
        // End Example Solution
}

/**
 * Function to run the student's code
 */
window.onload = function() {
    wb2_pg5_ex1();
    wb2_pg5_ex2_mike();
    wb2_pg5_ex2();
};