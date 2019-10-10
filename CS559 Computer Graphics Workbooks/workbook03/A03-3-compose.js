/**
 * A03-3-compose.js - a simple JavaScript file that gets loaded with
 * page "A03-2-compose.html"
 *
 * written by Michael Gleicher, January 2019
 *
 */

// see other files for explanation of these comments
 // @ts-check
/* jshint -W069, esversion:6 */

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
    let sliderS = /** @type {HTMLInputElement} */(document.getElementById("s1s"));
    let sliderT = /** @type {HTMLInputElement} */(document.getElementById("s1t"));
    function sliderChange() {
        let valS = sliderS.value;
        let valT = sliderT.value;
        document.getElementById("sp1t").value = valT;
        document.getElementById("sp1s").value = valS;
        {
            let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("s1st"));
            let context = canvas.getContext('2d');
            context.clearRect(0,0,canvas.width,canvas.height);
            context.save();
            context.scale(Number(valS),Number(valS));
            context.translate(Number(valT),0);
            drawTriSquare(context);
            context.restore();
        }
        {
            let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("s1ts"));
            let context = canvas.getContext('2d');
            context.clearRect(0,0,canvas.width,canvas.height);
            context.save();
            context.translate(Number(valT),0);
            context.scale(Number(valS),Number(valS));
            drawTriSquare(context);
            context.restore();
        }
    }
    sliderS.oninput = sliderChange;
    sliderS.value = "2";
    sliderT.oninput = sliderChange;
    sliderT.value = "0";
    sliderChange();
}

function box2() {
    let slider = /** @type {HTMLInputElement} */(document.getElementById("s2"));

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b2"));
    let context = canvas.getContext('2d');

    function sliderChange() {
        let sc = Number(slider.value);
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.fillStyle = "goldenrod";
        context.strokeStyle = "red";
        // @@Snippet:centerscale
        context.translate(40,40);
        context.scale(sc,sc);
        context.translate(-40,-40);
        context.fillRect(30,30,20,20);
        // @@Snippet:end
        context.beginPath();
        context.moveTo(30,30);
        context.lineTo(50,50);
        context.moveTo(50,30);
        context.lineTo(30,50);
        context.stroke();
        context.restore();
    }
    slider.value = "1";
    slider.oninput = sliderChange;
    sliderChange();
}

function box3() {
    // the first canvas - which works
    {   // note that I am just using braces to have a new scope so I can
        // keep my variable names
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b31"));
        let context = canvas.getContext("2d");
        // scale first and then translate the right amount
        context.scale(0.5,0.5);
        for(let r=0; r<4; r++) {
            for(let c=0; c<8; c++) {
                context.save();
                context.translate(c*40,r*40);
                drawTriSquare(context);
                context.restore();
            }
        }
    }

    // the second Canvas - which the student needs to fix so it looks like the previous one
    {   // note that I am just using braces to have a new scope so I can
        // keep my variable names
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b32"));
        let context = canvas.getContext("2d");
        // scale first and then translate the right amount
        for(let r=0; r<4; r++) {
            for(let c=0; c<8; c++) {
                context.save();
                context.translate(c*20,r*20);
                drawTriSquare(context);
                context.restore();
            }
        }
    }
}
function box4() {
    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    function picture(context) {
        drawTriSquare(context);
    }
    {   // box 1 - regular canvas coordinate system
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b41"));
        let context = canvas.getContext("2d");
        picture(context);
    }
    {   // box 2 - flip coordinate system, translate first
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b42"));
        let context = canvas.getContext("2d");
        context.translate(0,canvas.height);
        context.scale(1,-1);
        picture(context);
    }
    {   // box 3 - flip coordinate system, scale first
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b43"));
        let context = canvas.getContext("2d");
        context.scale(1,-1);
        context.translate(0,-canvas.height);
        picture(context);
    }

}

function box5() {
    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    function picture(canvas) {
        let context = canvas.getContext("2d");
        // student should use translate and scale to
        // change the coordinate system to [-100,100] [-100,100]
        // line 1
        // line 2
        // now I'll draw something...
        context.fillStyle = "lightgray";
        context.beginPath();
        context.moveTo(0,-100);
        context.lineTo(100,0);
        context.lineTo(0,100);
        context.lineTo(-100,0);
        context.fill();
        // draw the plus in the center
        context.strokeStyle = "darkred";
        context.lineWidth = 2;
        context.beginPath();
        const dx = 20;
        context.moveTo(0,-dx);
        context.lineTo(0,dx);
        context.moveTo(-dx,0);
        context.lineTo(dx,0);
        context.stroke();
        // draw the T
        context.strokeStyle = 'darkblue';
        context.beginPath();
        context.moveTo(-90,90);
        context.lineTo(-70,90);
        context.moveTo(-80,90);
        context.lineTo(-80,70);
        context.stroke();
    }

    ["b51","b52","b53"].forEach(function(name) {
        picture(/** @type {HTMLCanvasElement} */ (document.getElementById(name)));
    });
}

window.onload = function() {
    box1();
    box2();
    box3();
    box4();
    box5();
};
