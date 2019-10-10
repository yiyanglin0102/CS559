/*jshint esversion: 6 */
// @ts-check
/**
 * 
 */

import {RunCanvas} from "./Libs/runCanvas.js";

function lerpPt(a,b,u) {
    return [ a[0]*(1-u) + b[0]*u, a[1]*(1-u)+b[1]*u];
}

const p1 = [20,20];
const p2 = [120,20];
const p3 = [120,40];
const p4 = [20,40];

// parametric function to go around the rectangle
// unit parameterization per segment - so t needs to go
// from 0 to 4
function rect(t) {
         if (t<1) return(lerpPt(p1,p2,t));
    else if (t<2) return(lerpPt(p2,p3,t-1));
    else if (t<3) return(lerpPt(p3,p4,t-2));
    else          return(lerpPt(p4,p1,t-3));
}

// parametric function to go around the rectangle
// arc-length parameterization
// perimeter is 240 - so define a new "arc length" parameter
// that goes from 0-240 (multiple old parameter by 60)
function alRect(t) {

    let st = t * 60;       // 240 is the perimeter

         if (st<100) return(lerpPt(p1,p2,st/100));
    else if (st<120) return(lerpPt(p2,p3,(st-100)/20));
    else if (st<220) return(lerpPt(p3,p4,(st-120)/100));
    else             return lerpPt(p4,p1,(st-220)/20);
}

function box1() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("arc1"));
    let context = canvas.getContext("2d");

    function draw(canvas,t) {
        context.save();
        context.clearRect(0,0,canvas.width,canvas.height);

        context.scale(2,2);

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.strokeRect(20,20,100,20);

        let [x,y] = rect(t);
        context.fillStyle = "red";
        context.fillRect(x-5,y-5,10,10);

        let [x2,y2] = alRect(t);
        context.fillStyle = "green";
        context.fillRect(x2-5,y2-5,10,10);
        context.restore();
    }
    let rc = new RunCanvas(canvas,draw);
    rc.setupSlider(0,4,0.05);
    rc.setValue(0);
}

function box2() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("arc2"));
    let context = canvas.getContext("2d");

    function draw(canvas,t) {
        context.save();
        context.clearRect(0,0,canvas.width,canvas.height);

        context.translate(20,20);
    
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(300,0);
        context.stroke();

        let [x,y] = [t,0];
        context.fillStyle = "red";
        context.fillRect(300*x-5,y-5,10,10);

        let [x2,y2] = [t*t,0];
        context.fillStyle = "green";
        context.fillRect(300*x2-5,y2-5,10,10);
        context.restore();
    }
    let rc = new RunCanvas(canvas,draw);
    rc.setupSlider(0,1,0.02);
    rc.setValue(0);
}

let triPt1 = [10,10];
let triPt2 = [10+120,10+25];
let triPt3 = [10,10+25];

function myTri(t) {
         if (t<1) return lerpPt(triPt1,triPt2,t);
    else if (t<2) return lerpPt(triPt2,triPt3,t-1);
    else          return lerpPt(triPt3,triPt1,t-2);
}

function myTriAL(t) {
    // student write this!
    return [0,0];
}

function boxex() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("arcex"));
    let context = canvas.getContext("2d");

    function draw(canvas,t) {
        context.save();
        context.clearRect(0,0,canvas.width,canvas.height);

        context.scale(2,2);

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(10,10);
        context.lineTo(10+120,10+25);
        context.lineTo(10,10+25);
        context.closePath();
        context.stroke();

        let [x,y] = myTri(t);
        context.fillStyle = "red";
        context.fillRect(x-5,y-5,10,10);

        let [x2,y2] = myTriAL(t);
        context.fillStyle = "green";
        context.fillRect(x2-5,y2-5,10,10);
        context.restore();
    }
    let rc = new RunCanvas(canvas,draw);
    rc.setupSlider(0,3,0.05);
    rc.setValue(0);

}

window.onload = function() {
  box1();
  box2();
  boxex();
};
