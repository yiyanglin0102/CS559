/**
 * A02_p2 - a simple JavaScript file that gets loaded with
 * page "A02_p2.html"
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
     * Box 1 - just a simple square
     */
    // use type information to make TypeScript happy
    /** @type {HTMLCanvasElement} */
    let canvas1 = (/** @type {HTMLCanvasElement} */ document.getElementById("box1canvas"));
    let context1 = canvas1.getContext('2d');

    // now that we have the context, we can use it to issue drawing commands
    // the results appear "immediately"
    context1.fillStyle = "#F00";
    context1.fillRect(30,30,30,30); 


    /**
     * Box 2 - Squares with style
     */
    /** @type {HTMLCanvasElement} */
    let canvas21 = (/** @type {HTMLCanvasElement} */ document.getElementById("box2canvas1"));
    let context21 = canvas21.getContext('2d');

    // a yellow rectangle with a darker border
    context21.fillStyle = "yellow";
    context21.strokeStyle = "goldenrod";
    // note that we draw the rectangle twice - once for inside, once for outside
    context21.fillRect(30,30,30,30);
    context21.strokeRect(30,30,30,30);

    // same thing, but with a thicker border
    // a yellow rectangle with a darker border
    context21.lineWidth = 3;

    // note that we draw the rectangle twice - once for inside, once for outside
    context21.fillRect(80,30,30,30);
    context21.strokeRect(80,30,30,30);

    // there are many different styles we can use
    context21.fillStyle = "lightblue";
    context21.strokeStyle = "darkblue";
    context21.lineWidth = 4;
    context21.setLineDash([4,4]);
    context21.fillRect(130,30,30,30);
    context21.strokeRect(130,30,30,30);

    // note that if we don't change things, we're stuck with what
    // we're left with
    context21.fillStyle = "lightgreen";
    context21.strokeStyle = "darkgreen";
    context21.fillRect(180,30,30,30);
    context21.strokeRect(180,30,30,30);

    /** @type {HTMLCanvasElement} */
    let canvas22 = (/** @type {HTMLCanvasElement} */ document.getElementById("box2canvas2"));
    let context22 = canvas22.getContext('2d');

    context22.fillStyle = "yellow";
    context22.strokeStyle = "goldenrod";
    context22.fillRect(30,30,30,30);
    context22.strokeRect(30,30,30,30);

    context22.save();
        context22.fillStyle = "lightblue";
        context22.strokeStyle = "darkblue";
        context22.lineWidth = 3;
        context22.setLineDash([3,3]);
        context22.fillRect(80,30,30,30);
        context22.strokeRect(80,30,30,30);
    context22.restore();

    // now we're back to think yellow
    context22.fillRect(130,30,30,30);
    context22.strokeRect(130,30,30,30);

    /** @type {HTMLCanvasElement} */
    let canvas23 = (/** @type {HTMLCanvasElement} */ document.getElementById("box2canvas3"));
    let context23 = canvas23.getContext('2d');
    
    context23.fillStyle = "yellow";
    context23.strokeStyle = "goldenrod";
    context23.fillRect(30,30,30,30);
    context23.strokeRect(30,30,30,30);

    context23.save();
        context23.fillStyle = "lightblue";
        context23.strokeStyle = "darkblue";
        context23.lineWidth = 3;
        context23.setLineDash([3,3]);
        context23.fillRect(80,30,30,30);
        context23.strokeRect(80,30,30,30);
        context23.save();
            context23.fillStyle = "lightpink";
            context23.strokeStyle = "darkred";
            context23.lineWidth = 5;
            context23.setLineDash([5,5]);
            context23.fillRect(130,30,30,30);
            context23.strokeRect(130,30,30,30);
        context23.restore();
        context23.fillRect(180,30,30,30);
        context23.strokeRect(180,30,30,30);
    context23.restore();
    context23.fillRect(230,30,30,30);
    context23.strokeRect(230,30,30,30);


    /**
     * Box 3 - overlap and transparency
     */
    /** @type {HTMLCanvasElement} */
    let canvas31 = (/** @type {HTMLCanvasElement} */ document.getElementById("box3canvas1"));
    let context31 = canvas31.getContext('2d');

    context31.lineWidth = 3;

    context31.fillStyle = "yellow";
    context31.strokeStyle = "goldenrod";
    context31.fillRect(30,30,40,40);
    context31.strokeRect(30,30,40,40);
   
    context31.fillStyle = "lightpink";
    context31.strokeStyle = "darkred";
    context31.fillRect(50,35,30,30);
    context31.strokeRect(50,35,30,30);

    // same thing, different order
    context31.fillStyle = "lightpink";
    context31.strokeStyle = "darkred";
    context31.fillRect(120,35,30,30);
    context31.strokeRect(120,35,30,30);

    context31.fillStyle = "yellow";
    context31.strokeStyle = "goldenrod";
    context31.fillRect(100,30,40,40);
    context31.strokeRect(100,30,40,40);
   
    // if we don't fill, we don't cover over the inside
    context31.fillStyle = "yellow";
    context31.strokeStyle = "goldenrod";
    context31.fillRect(170,30,40,40);
    context31.strokeRect(170,30,40,40);
   
    context31.fillStyle = "lightpink";
    context31.strokeStyle = "darkred";
    context31.strokeRect(190,35,30,30);


    // ordering of stroke and fill
    /** @type {HTMLCanvasElement} */
    let canvas32 = (/** @type {HTMLCanvasElement} */ document.getElementById("box3canvas2"));
    let context32 = canvas32.getContext('2d');
    
    context32.fillStyle = "yellow";
    context32.strokeStyle = "goldenrod";
    context32.lineWidth = 7;

    context32.fillRect(30,30,40,40);
    context32.strokeRect(30,30,40,40);

    context32.strokeRect(90,30,40,40);
    context32.fillRect(90,30,40,40);

    // alpha blending example
     /** @type {HTMLCanvasElement} */
     let canvas33 = (/** @type {HTMLCanvasElement} */ document.getElementById("box3canvas3"));
     let context33 = canvas33.getContext('2d');
    
    // make some things to cover over
    context33.lineWidth = 3;
    context33.strokeStyle = "black";
    context33.fillStyle = "darkgray";
    context33.fillRect(20,40,220,20);
    context33.strokeRect(20,40,220,20);

    context33.strokeStyle = "darkred";
    context33.fillStyle = "lightpink";
    context33.fillRect(20,80,220,20);
    context33.strokeRect(20,80,220,20);

    context33.strokeStyle = "darkblue";
    context33.fillStyle = "lightblue";
    context33.fillRect(20,120,220,20);
    context33.strokeRect(20,120,220,20);

    context33.strokeStyle = "darkgreen";
    context33.fillStyle = "lightgreen";
    context33.fillRect(20,160,220,20);
    context33.strokeRect(20,160,220,20);


    // make a series of red squares - increasing transparency
    context33.lineWidth = 5;
    for(let x=0; x<4; x++) {
        context33.strokeStyle = `rgba(80,0,0,     ${(x+1)/4.0})`;
        context33.fillStyle =   `rgba(255,170,170,${(x+1)/4.0}`;
        context33.fillRect(40+x*50,30,30,180);
        context33.strokeRect(40+x*50,30,30,180);
    }
};