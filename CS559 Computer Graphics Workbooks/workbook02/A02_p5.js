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

/**
 * Function for the STUDENT to do exercise 1
 */
function wb2_pg5_ex1() 
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex1canvas"));
        let context = canvas.getContext('2d');

}

/**
 * Function for the STUDENT to do exercise 1
 */
function wb2_pg5_ex2()
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex2canvas"));
        let context = canvas.getContext('2d');

}

/**
 * Function to run the student's code
 */
window.onload = function() {
    wb2_pg5_ex1();
    wb2_pg5_ex2();
};