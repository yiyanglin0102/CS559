/**
 * two.js - a simple JavaScript file that gets loaded with
 * page "two.html"
 * 
 * This doesn't do much, it just gives some JavaScript so we can
 * practice connecting JavaScript to HTML
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


 /**
  * This is stuff associated with Box02 - which is where the file
  * is loaded
  */
 // The "console.log" gets run immediately when this is loaded
 console.log("Box02 - a line in two.js");

 
 /**
  * This function is for the last thing in Box 6
  * don't try to read this function until you are working on box 6
  * 
  * But, you should read this function since it uses closures and will
  * be good practice to see how they can be helpful
  */
 let oldOnload = window.onload;
 window.onload = function() {
     // this will actually cause a type warning from TypeScript
     if (oldOnload) oldOnload();

    /**
     * find the paragraph, and then add a DIV to put the buttons in
     */
    let par = document.getElementById("box6par3");
    let div = document.createElement("div");
    div.classList.add("simplebox");
    par.appendChild(div);

     /**
      * The actual function - make 3 buttons
      * there's a loop (mapping over an array of names), and we make a button
      * for each
      * 
      * while this is simple code, it uses a lot of JavaScript idioms.
      * make sure you understand why each button has its own counter
      */
     ["One","Two","Three"].forEach(
         function(name,index) {
            let but = document.createElement("button");
            but.innerText = "Button "+ name;
            but.classList.add("basicbutton");
            // here, I change the style of the buttons a little
            // (setting the width)
            but.style.width = "150px";
            div.append(but);
            let count = 0;
            but.onclick = function() {
                count = count+1;
                // note the template literal - a really cool feature of ES6
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
                console.log(`Button ${name} has been pressed ${count} times`);
            };
         }
    );
 };
