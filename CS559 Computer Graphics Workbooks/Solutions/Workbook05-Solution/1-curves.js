/*jshint esversion: 6 */
// @ts-check

import {runCanvas} from "./Libs/runCanvas.js";

/**
 * Sample parametric functions
 * 
 * Note that they return x,y,x',y'
 */
function line1(u) {
    return [0,100*u,0,100];
}
function line2(u) {
    return [0,100*(1-u),0,-100];
}
function line3(u) {
    return [0,100*u*u,0,200*u];
}
function circ(u) {
    let ur = Math.PI*2*u;
    return [50+50*Math.cos(ur),50+50*Math.sin(ur),
            -50*Math.sin(ur),50*Math.cos(ur)];
}
function twoQuarterCircles(u) {
    let pu = Math.PI * u;
    if (u<0.5) return [50+50*Math.cos(pu),50*Math.sin(pu),
        -50*Math.sin(pu),50*Math.cos(pu)];
    else return [50+50*Math.cos(pu),100-50*Math.sin(pu),
        -50*Math.sin(pu),-50*Math.cos(pu)];
  }
  
function twoLines(u) {
    if (u<0.5) return [100*u,200*u,100,200];
    else return [100*u,100-200*(u-0.5),100,-200];
}
function disconnect(u) {
    if (u<0.5) return [0,200*u,0,200];
    else return [20,100-200*(u-0.5),0,-200];
}
/**
 * Parabola - student needs to fill in the derivatives
 * 
 * right now they are just set to be 40,40 - they should
 * be the actual functions
 */
function parabola(u) {
    // Begin Example Solution
    return [100*u, 400*(u-0.5) * (u-0.5),100,800*(u-0.5)];
    // End Example Solution
}

/**
 * plot a parametric function
 * pass the function and the number of steps
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {function(Number):Number[]} func - parametric function
 * @param {Number} steps - number of steps to draw
 * @param {Number} param - draw the square at this parameter value
 * @param {Number} [scaleTangent] - size to draw the tangent vector
 */
function plotter(context,func,steps,param,scaleTangent=0) {
    context.save();
    context.lineWidth=3;
    context.strokeStyle="black";
    context.beginPath();

   // rounding error is annoying, so make sure we get exactly to 1
    for(let u=0,i=0; i<=steps; i++,u+=(1 / steps) ) {
        if (i==steps) u=1;
        let [x,y] = func(u);
        if (!i) context.moveTo(x,y); else context.lineTo(x,y);
    }
    context.stroke();

    // draw the mark at the parameter values
    let [rx,ry,dx,dy] = func(param);
    context.fillRect(rx-5,ry-5,10,10);
    // draw a line for the tangent
    if (scaleTangent>0) {
        context.strokeStyle = "red";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(rx,ry);
        context.lineTo(rx+dx*scaleTangent,ry+dy*scaleTangent);
        context.stroke();
    }

    context.restore();    
}

/**
 * Draw all of the different shapes
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {number} t 
 * @param {number} tangentScale 
 */
function functionGallery(context,t,tangentScale) 
{
    context.save();
    context.fillStyle="green";
    context.lineWidth=3;
    plotter(context,line1,1,t,tangentScale);
    context.translate(40,0);
    plotter(context,line2,1,t,tangentScale);
    context.translate(40,0);
    plotter(context,line3,1,t,tangentScale);
    context.translate(40,0);
    plotter(context,circ,50,t,tangentScale);
    context.translate(130,0);
    plotter(context,twoQuarterCircles,50,t,tangentScale);
    context.translate(130,0);
    plotter(context,parabola,40,t,tangentScale);
    context.translate(130,0);
    plotter(context,twoLines,2,t,tangentScale);
    context.translate(140,0);
    // we can't use plotter to draw disconnected lines
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(0,100);
    context.moveTo(20,100);
    context.lineTo(20,0);
    context.stroke();
    // we can use plotter to draw the moving square
    plotter(context,disconnect,0,t,tangentScale);
    context.restore();

}

/**
 * Set up the drawing in box 1
 */
function box1() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("c1"));
    let context = canvas.getContext("2d");

    function draw1(canvas,t) {
        let rx,ry;
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.translate(30,40);
        functionGallery(context,t,0);
        context.restore();
    }
    runCanvas(canvas,draw1,0,true,0,1,0.02);
}

/**
 * set up the drawing in box 2
 */
function box2()
{
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("c2"));
    let context = canvas.getContext("2d");

    function draw1(canvas,t) {
        let rx,ry;
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.translate(30,80);
        functionGallery(context,t,0.4);
        context.restore();
    }
    runCanvas(canvas,draw1,0,true,0,1,0.02);
}

/** run everything */
window.onload = function() {
    box1();
    box2();
};