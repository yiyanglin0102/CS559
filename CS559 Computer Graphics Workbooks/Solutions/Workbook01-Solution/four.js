// This file is modified as the sample solution for Workbook 1
/**
 * JavaScript file that goes along with Workbook 1, Page 3
 * 
 * this file is pretty empty - we expect the student to fill it in
 * 
 * everything is put into one big function that gets run "onload"
 */
// note that we don't do a global "use strict" because this can create a problem
// if we include another file
// "use strict";

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

/* to make things easy, we'll define functions for each of the exercises
 * window.onload will call each in turn
 * the student should fill in these three functions
 */

function ex1() {
     /**
      * Student should put the code to solve exercise 1 here
      */
    // student should remove this next line
    //document.getElementById("box01").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
    
    // Begin Example Solution
    // Get the reference to the sliders
    /** @type{HTMLInputElement} */ let s1 = (document.getElementById("box01-slider1"));
    /** @type{HTMLInputElement} */ let s2 = (document.getElementById("box01-slider2"));
    /** @type{HTMLInputElement} */ let s3 = (document.getElementById("box01-slider3"));
    // Define a function to compute the difference between the values
    function update12() {s3.value = (Number(s2.value) - Number(s1.value)).toString();}
    // Call the function update12 when sliders 1 and 2 are changed
    s1.oninput = update12;
    s2.oninput = update12;
    // Define a helper function to bound a value x by (a, b)
    /** @param {number} x */
    /** @param {number} a */
    /** @param {number} b */
    function bound(x, a, b) {return Math.max(a, Math.min(x, b));}
    // Define a function to change either slider 1 or slider 2 when slider 3 is changed
    function update3()
    {
        // Try to change slider 1 until it is out of bound
        s1.value = bound(Number(s2.value) - Number(s3.value), 0, 100).toString();
        // Change slider 2 in case slider 1 is not changed enough (bounding is not necessary here)
        s2.value = bound(Number(s1.value) + Number(s3.value), 0, 100).toString();
       }
    s3.oninput = update3;
    // End Example Solution
}

function ex2() {
    /**
     * Student should put the code to solve exercise 2 here
     */
    // student should remove this next line
    // document.getElementById("box02").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
    
    // Begin Example Solution
    // Get the reference to the slider and the buttons
    /** @type{HTMLInputElement} */ let s4 = (document.getElementById("box02-slider1"));
    let b1 = document.getElementById("box02-button1");
    let b2 = document.getElementById("box02-button2");
    // Initialize the speed of the slider movement to 0
    let rateOfChange = 0;
    // Change the speed to 1 if button 1 is clicked and 0 if button 2 is clicked
    b1.onclick = function() {rateOfChange = 1};
    b2.onclick = function() {rateOfChange = 0};
    // The animation function
    function ex2a()
    {
        // For each frame, increment the value of the slider by "rateOfChange" and bound it by 99
        s4.value = ((Number(s4.value) + rateOfChange) % 100).toString();
        window.requestAnimationFrame(ex2a);
    }
    ex2a();
    // End Example Solution
}

function ex3() {
    /**
     * Student should put the code to solve exercise 3 here
     */
    // as a hint - this will at least change the background color (but not animate it)
    let text = document.getElementById("ex3-span");
    text.style.backgroundColor = "#CCFFCC";

    // student should remove this next line
    // document.getElementById("box03").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
    
    // Begin Example Solution
    // This is the list of colors (red, yellow, green in this example)
    let colorList = [[255, 0, 0], [255, 255, 0], [0, 128, 0]];
    // Set the speed of the color change
    let rateOfChange = 0.01;
    // Initialize the color: a color is represented by a real number between 0 and the length of the list
    // For example, "color = 0.6" means 40% of color 1 and 60% of color 2; "color = 1.3" means 70% of color 1 and 30% of color 2; "color = 2.5" means 50% of color 2 and 50% of color 0 (if the list contains only 3 colors).
    let currentColor = 0;
    // The function that mixes the color according to the previous definition
    // Compute the RGB components for the color "cur"
    // Output the red component if "rgb" is 0, the green component if "rgb" is 1, and blue component if "rgb" is 2
    // Note that "x % 1" gives the fractional part of a number ("1.3 % 1" = 0.3)
    /** @param {number} rgb */
    /** @param {number} cur */
    function getColor(rgb, cur) {return colorList[Math.floor(cur)][rgb] * (1 - currentColor % 1) + colorList[Math.ceil(cur) % colorList.length][rgb] * (currentColor % 1);}
    // The animation function
    function ex3a()
    {
        // Set the text color background
        // The color is computed using the "getColor" function defined above
        text.style.backgroundColor = "rgb(" + getColor(0, currentColor) + ", " + getColor(1, currentColor) + ", " + getColor(2, currentColor) + ")";
        // For each frame, increment the current color by "rateOfChange"
        currentColor = (currentColor + rateOfChange) % colorList.length;
        window.requestAnimationFrame(ex3a);
    }
    ex3a();
    // End Example Solution

}

window.onload = function() {
    ex1();
    ex2();
    ex3();
};
