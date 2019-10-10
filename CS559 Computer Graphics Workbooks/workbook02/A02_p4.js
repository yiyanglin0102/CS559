/**
 * A02_p4 - a simple JavaScript file that gets loaded with
 * page "A02_p4.html"
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

// useful constant for doing SVG
const svgns = "http://www.w3.org/2000/svg";

/** a Helper - make an SVG rectangle
 * the click has type any (rather than [function] because handlers have complex signatures)
 *
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {string} fill
 * @param {any} [click]
 */
function makeSVGrect(x,y,w,h,fill,click) {
    let rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute("x", x.toString());
    rect.setAttribute("y", y.toString());
    rect.setAttribute("width", w.toString());
    rect.setAttribute("height", h.toString());
    rect.setAttribute("fill", fill);
    rect.onclick = click;
    return rect;
}

window.onload = function() {
    /**
     * Box 1 - animate something moving, and many things not moving
     * in both SVG and Canvas
     */
    // set up the "scene" in svg
    let svg1 = document.getElementById("box1svg");
    for(let c=0; c<4; c++) {
        for(let r=0; r<3; r++) {
            svg1.appendChild(makeSVGrect(30+c*50,20+r*20,30,10,"#888"));
        }
    }
    let svg1rect = makeSVGrect(0,35,20,20,"black");
    svg1.appendChild(svg1rect);

    // for Canvas, our "scene" is defined by the drawing function
    // which redraws everything.
    // we need to know the position of the moving box
    /**
     * draw everythign for Box 1 Canvas
     * @param {number} xpos
     */
    function box1canvDrawAll(xpos) {
        // for real speed, these could be put outside the loop
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("box1canvas"));
        let context = canvas.getContext('2d');
        // clear the canvas
        context.clearRect(0,0,canvas.width,canvas.height);
        // draw the static rectangles
        context.fillStyle = "#888";
        for(let c=0; c<4; c++) {
            for(let r=0; r<3; r++) {
                context.fillRect(30+c*50,20+r*20,30,10);
            }
        }
        // draw the moving rectangle
        context.fillStyle = "black";
        context.fillRect(xpos,35,20,20);
    }

    // the animation loop - we can have 1 function for both elements
    function box1animate() {
        let xpos = (performance.now()/10 % 260) - 10;

        // with Canvas, we have to redraw EVERYTHING
        box1canvDrawAll(xpos);

        // with SVG, no redraw - just change the box
        svg1rect.setAttribute('x',xpos.toString());

        // schedule the next "loop"
        window.requestAnimationFrame(box1animate);
    }
    box1animate();


    /**
     * Box 2 - handling click events
     * for SVG, this is basically the same as Box 1 (just adding event handlers)
     * for Canvas, we need to do things differently...
     */
    // define the event handler function
    // trick - we know that the target is an svg object
    function handleClick(event) {
        event.target.classList.toggle("lightredwithborder");
    }
    let svg2 = document.getElementById("box2svg");
    for(let c=0; c<4; c++) {
        for(let r=0; r<3; r++) {
            svg2.appendChild(makeSVGrect(30+c*50,20+r*20,30,10,"#888",handleClick));
        }
    }
    let svg2rect = makeSVGrect(0,35,20,20,"black",handleClick);
    svg2.appendChild(svg2rect);
    function box2svgAnimate() {
        let xpos = (performance.now()/10 % 260) - 10;
        svg2rect.setAttribute('x',xpos.toString());
        window.requestAnimationFrame(box2svgAnimate);
    }
    box2svgAnimate();


    /**
     * a display list made of rectangles
     * each "object" will store x1,y1,w,h, color,
     * and whether or not it is clicked
     * we'll take advantage that unset properties are undefined
     */
    /**
     * Take a list of rectangles and draw them.
     * The rectangles draw their own color, unless they have been
     * "clicked"
     * @param {*} context
     * @param {Array[object]} rectList
     */
    function drawRectList(context,rectList) {
        rectList.forEach(function(rect){
            context.save();
            if (rect.clicked) {
                context.fillStyle = "#FCC";
                context.strokeStyle = "#F00";
                context.fillRect(rect.x,rect.y,rect.w,rect.h);
                context.strokeRect(rect.x,rect.y,rect.w,rect.h);
            } else {
                context.fillStyle = rect.color;
                context.fillRect(rect.x,rect.y,rect.w,rect.h);
            }
            context.restore();
        });
    }
    // the canvas version of the code is much more similar to the SVG
    // first we make a list of all the rectangles
    let box2rects = [];
    for(let c=0; c<4; c++) {
        for(let r=0; r<3; r++) {
            box2rects.push({"x":30+c*50,"y":20+r*20,"w":30,"h":10,color:"#888"});
        }
    }
    box2rects.push({"x":0,"y":35,"w":20,"h":20,"color":"black"});

    // the animation loop calls the drawing function with the list of
    // rectangles
    function box2canvasAnimate() {
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("box2canvas"));
        let context = canvas.getContext('2d');
        // clear the canvas
        context.clearRect(0,0,canvas.width,canvas.height);
        // update the moving rectangle's position
        box2rects[box2rects.length-1].x = (performance.now()/10 % 260) - 10;
        // draw the rectagnles
        drawRectList(context,box2rects);
        // loop
        window.requestAnimationFrame(box2canvasAnimate);
    }
    box2canvasAnimate();

    /**
     * This function performs the "click" on a list of rectangles.
     * Given the x,y of the mouse, it looks to see which rectangles
     * cover the mouse position. If a rectangle covers the mouse position,
     * it's "clicked" member is toggled.
     * Note: if multiple rectangles cover the mouse position, all of them
     * get toggled.
     *
     * @param {number} x
     * @param {number} y
     * @param {Array[object]} rectList
     */
    function clickRectList(x,y,rectList) {
        rectList.forEach(function(rect) {
            // see if xy is inside of rect
            if ((x >= rect.x) && (y>=rect.y) && (x <= rect.x+rect.w) && (y <= rect.y + rect.h)) {
                rect.clicked = ! rect.clicked;
            }
        });
    }

    // now handle the clicks on the Canvas
    document.getElementById("box2canvas").onclick = function(event) {
        let x = event.clientX;
        let y = event.clientY;
        // unfortunately, X,Y is relative to the overall window -
        // we need the X,Y inside the canvas!
        // we know that event.target is a HTMLCanvasElement, so tell typescript
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        x -= box.left;
        y -= box.top;
        // now we can see if we clicked on a rectangle
        clickRectList(x, y, box2rects);
    };


    /**
     * Box 3 - interaction by polling
     */

    // we'll keep track of a set of "dots"
    let box3dots = [];

    /** @type {HTMLCanvasElement} */
    let canvas3 = (/** @type {HTMLCanvasElement} */ document.getElementById("box3canvas"));
    let context3 = canvas3.getContext('2d');

    // we want to know where the mouse is, but we only find out on movement events!
    // so we'll keep some state
    let mouseX = -10;
    let mouseY = -10;
    // when the mouse moves in the canvas, remember where it moves to
    canvas3.onmousemove = function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        // unfortunately, X,Y is relative to the overall window -
        // we need the X,Y inside the canvas!
        // we know that event.target is a HTMLCanvasElement, so tell typescript
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        mouseX -= box.left;
        mouseY -= box.top;
    };
    // if the mouse moves outside the canvas, give an outside value
    canvas3.onmouseleave = function() {
        mouseX = -10;
        mouseY = -10;
    };

    function box3animate() {
        // clear the canvas
        context3.clearRect(0,0,canvas3.width,canvas3.height);
        // figure out where the mouse is
        // that's handled outside
        // if we're inside the canvas, then we'll make a dot
        if ( (mouseX > 0) && (mouseY > 0) ) {
            box3dots.push({"x":mouseX,"y":mouseY});
        }

        // draw all of the dots
        box3dots.forEach(function(dot){
            context3.fillStyle = "#8888FF88";
            context3.fillRect(dot.x-3,dot.y-3,6,6);
        });
        window.requestAnimationFrame(box3animate);
    }
    box3animate();

    document.getElementById("box3but").onclick = function() {
        box3dots = [];
    };

    /**
     * The more fun example for box 3
     */
    /** @type {HTMLCanvasElement} */
    let canvasf = (/** @type {HTMLCanvasElement} */ document.getElementById("box3fun"));
    let contextf = canvasf.getContext('2d');

    // keep a list of squares, each with a position (x,y), a size (radius)
    // and a velocity (vx,vy)
    let boxfdots = [];

    // we want to know where the mouse is, but we only find out on movement events!
    // so we'll keep some state
    let mouseXf = -10;
    let mouseYf = -10;
    let mouseDf = 0;

    // when the mouse moves in the canvas, remember where it moves to
    canvasf.onmousemove = function(event) {
        mouseXf = event.clientX;
        mouseYf = event.clientY;
        // unfortunately, X,Y is relative to the overall window -
        // we need the X,Y inside the canvas!
        // we know that event.target is a HTMLCanvasElement, so tell typescript
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        mouseXf -= box.left;
        mouseYf -= box.top;
    };
    // if the mouse moves outside the canvas, give an outside value
    canvasf.onmouseleave = function() {
        mouseXf = -10;
        mouseYf = -10;
        mouseDf = 0;
    };
    canvasf.onmousedown = function() { mouseDf=1; };
    canvasf.onmouseup = function() { mouseDf=0; };

    function box3fanimate() {
        // clear the canvas
        contextf.clearRect(0,0,canvasf.width,canvasf.height);
        // figure out where the mouse is
        // that's handled outside
        // if we're inside the canvas, then we'll make a dot
        if ( (mouseXf > 0) && (mouseYf > 0) ) {
            let vx = (Math.random()-0.5)*5;
            let vy = (Math.random()-0.5)*5;
            boxfdots.push({"x":mouseXf,"y":mouseYf, "s":mouseDf?7:3, "vx":vx, "vy":vy});
        }
        // move all the dots
        boxfdots.forEach(function(dot){
            dot.y -= dot.vy;
            dot.x -= dot.vx;
        });
        // remove dots that have gone off the screen
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        boxfdots = boxfdots.filter(
            // this defines a function using "arrow notation"
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
            dot => ((dot.y>0)&&(dot.x>0)&&(dot.x<canvasf.width)&&(dot.y<canvasf.height))
            );

        // draw all of the dots
        boxfdots.forEach(function(dot){
            contextf.fillStyle = "#8888FF88";
            let w = dot.s*2;
            contextf.fillRect(dot.x-dot.s,dot.y-dot.s,w,w);
        });
        window.requestAnimationFrame(box3fanimate);
    }
    box3fanimate();

};
