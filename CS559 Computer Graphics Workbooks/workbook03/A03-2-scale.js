/**
 * A03-3-compose.js - a simple JavaScript file that gets loaded with
 * page "A03-2-scale.html"
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
    /** @type {HTMLCanvasElement} */
    let canvas1 = (/** @type {HTMLCanvasElement} */ document.getElementById("b01-1"));
    let context1 = canvas1.getContext('2d');
    drawTriSquare(context1);

    /** @type {HTMLCanvasElement} */
    let canvas2 = (/** @type {HTMLCanvasElement} */ document.getElementById("b01-2"));
    let context2 = canvas2.getContext('2d');
    context2.scale(2,2);
    drawTriSquare(context2);

    /** @type {HTMLCanvasElement} */
    let canvas3 = (/** @type {HTMLCanvasElement} */ document.getElementById("b01-3"));
    let context3 = canvas3.getContext('2d');
    context3.scale(0.5,0.5);
    drawTriSquare(context3);


    /****************/
    let slider = /** @type {HTMLInputElement} */(document.getElementById("s01"));
    function sliderChange() {
        let val = slider.value;
        document.getElementById("sp01").value = val;
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b01-4"));
        let context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.scale(Number(val),Number(val));
        drawTriSquare(context);
        context.restore();
    }
    slider.oninput = sliderChange;
    sliderChange();
}


function box2() {
    let sliderX = /** @type {HTMLInputElement} */(document.getElementById("s02x"));
    let sliderY = /** @type {HTMLInputElement} */(document.getElementById("s02y"));
    function sliderChange() {
        let valX = sliderX.value;
        let valY = sliderY.value;
        document.getElementById("sp02x").value = valX;
        document.getElementById("sp02y").value = valY;
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b02"));
        let context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.scale(Number(valX),Number(valY));
        drawTriSquare(context);
        context.restore();
    }
    sliderX.oninput = sliderChange;
    sliderX.value = "1";
    sliderY.oninput = sliderChange;
    sliderY.value = "1";
    sliderChange();
}

function box3() {
    let slider = /** @type {HTMLInputElement} */(document.getElementById("s03"));
    function sliderChange() {
        let val = slider.value;
        document.getElementById("sp03").value = val;
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b03"));
        let context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.scale(Number(val),Number(val));
        context.fillStyle = "goldenrod";
        context.fillRect(10,10,20,20);
        context.restore();
    }
    slider.oninput = sliderChange;
    slider.value = "1";
    sliderChange();

}

function box4() {
    let sliderX = /** @type {HTMLInputElement} */(document.getElementById("s04x"));
    let sliderY = /** @type {HTMLInputElement} */(document.getElementById("s04y"));
    function sliderChange() {
        let valX = sliderX.value;
        let valY = sliderY.value;
        document.getElementById("sp04x").value = valX;
        document.getElementById("sp04y").value = valY;
        let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b04"));
        let context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.scale(Number(valX),Number(valX));
        context.fillStyle = "RGBA(255,0,0,.5)";
        context.fillRect(0,0,20,20);
        context.scale(Number(valY),Number(valY));
        context.fillStyle = "RGBA(0,0,255,.5)";
        context.fillRect(0,0,20,20);
        context.restore();
    }
    sliderX.oninput = sliderChange;
    sliderX.value = "1";
    sliderY.oninput = sliderChange;
    sliderY.value = "1";
    sliderChange();

}

window.onload = function() {
    box1();
    box2();
    box3();
    box4();
};
