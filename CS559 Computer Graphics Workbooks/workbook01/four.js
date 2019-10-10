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
    document.getElementById("box01").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
}

function ex2() {
    /**
     * Student should put the code to solve exercise 2 here
     */
    // student should remove this next line
    document.getElementById("box02").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
}

function ex3() {
    /**
     * Student should put the code to solve exercise 3 here
     */
    // as a hint - this will at least change the background color (but not animate it)
    let text = document.getElementById("ex3-span");
    text.style.backgroundColor = "#CCFFCC";

    // student should remove this next line
    document.getElementById("box03").innerHTML += "<p style='background-color:#F88'><strong>NOT YET DONE</strong></p>";
}

window.onload = function() {
    ex1();
    ex2();
    ex3();
};