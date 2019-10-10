/**
 * A02_p1 - a simple JavaScript file that gets loaded with
 * page "A02_p1.html"
 *
 * written by Michael Gleicher, January 2019
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

window.onload = function() {
    /**
     * Box 2: draw a rectangle, two different ways
     */
    /** first with canvas */
    // first we need to get the canvas element
    // and then find the drawing context inside it
    // to understand the next funky comment see http://usejsdoc.org/tags-type.html
    /** @type {HTMLCanvasElement} */
    let canvas2 = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas2"));
    let context2 = canvas2.getContext('2d');

    // now that we have the context, we can use it to issue drawing commands
    // the results appear "immediately"
    context2.fillStyle = "#F00";
    context2.fillRect(30,30,30,30);

    /** now with SVG  */
    // first we need to get the canvas element
    let svg2 = document.getElementById("svg2");

    // now we can create a square to add
    // note that in practice, we'd use a library to make this (see https://svgjs.com/ for example)
    // less clunky
    // the next two lines make a square object - but since
    // it's a special object, we need to tell the browser that it is
    // SVG (so we need to declare a name space)
    const svgns = "http://www.w3.org/2000/svg";
    let square2 = document.createElementNS(svgns, 'rect');
    square2.setAttribute("x", "30");
    square2.setAttribute("y", "30");
    square2.setAttribute("width", "30");
    square2.setAttribute("height", "30");
    square2.setAttribute("fill", "#F00");
     // now add the square to the svg, like any other DOM element
     svg2.appendChild(square2);


     /**
      * Box 3 - moving the squares
      */
    /** @type {HTMLCanvasElement} */
    let canvas3 = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas3"));
    let context3 = canvas3.getContext('2d');
    // note that we don't need to draw - it will just get over-drawn by the
    // first time through the animation loop!

    // with SVG we have to make the rect element - just like in box 2 above
    let svg3 = document.getElementById("svg3");
    let square3 = document.createElementNS(svgns, 'rect');
    square3.setAttribute("x", "30");
    square3.setAttribute("y", "30");
    square3.setAttribute("width", "30");
    square3.setAttribute("height", "30");
    square3.setAttribute("fill", "#00F");
    // now add the square to the svg, like any other DOM element
    svg3.appendChild(square3);

    // now, make an animation loop that moves the box across the screen
    // we'll remember that the elements as 150 pixels wide (from the HTML)
    function onTick() {
        // put both squares at the same place:
        let newX = (performance.now()/5) % 150;

        // when we animate the canvas, we have to redraw things
        // thanks to closure, we can remember the context
        // first we need to clear the window...
        // we draw a rectangle that covers the whole thing
        context3.clearRect(0, 0, canvas3.width, canvas3.height);
        canvas3.width = canvas3.width;
        // now redraw the square
        context3.fillStyle = "#00F";
        context3.fillRect(newX,30,30,30);

        // for the SVG object, the square is an object - we
        // just need to move it
        square3.setAttribute("x",newX.toString());

        // schedule the next redraw
        window.requestAnimationFrame(onTick);
    }
    // start the "loop" by doing the initial iteration
    // (which will schedule the second iteration, ...)
    onTick();

    /**
     * Box 4 - notice that we can treat SVG elements just as any other
     * we can add/remove classes, add event handlers, ...
     * we can search for them in the DOM just as any other DOM element
     */
    let svgrect3 = document.getElementById("svgrect3");
    function animateRect3() {
        svgrect3.setAttribute("y",((performance.now()/10) % 100).toString());
        window.requestAnimationFrame(animateRect3);
    }
    animateRect3();
    /** add event handlers to the other one */
    let svgrect4 = document.getElementById("svgrect4");
    svgrect4.onmouseenter = function(event) {
        // manipulate the list of classes
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
        svgrect4.classList.add("lightredwithborder");
    };
    svgrect4.onmouseleave = function(event) {
        // for practice, rather than referring to "svgrect4", I will make
        // this event handler refer to its target object
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/target
        event.target.classList.remove("lightredwithborder");
        // if you're using TypeScript type checking in Visual Studio Code
        // https://graphics.cs.wisc.edu/WP/cs559-sp2019/typed-js/
        // you will notice that there is a type error on that line:
        // the EventTarget doesn't have a classList!
        // however, we know that, in this case, the event target is an HTML
        // element (the rect), so we can ignore the error - or better, use
        // a cast
        // /** @type {HTMLElement} */(event.target).classList.remove("lightredwithborder");
    };
};
