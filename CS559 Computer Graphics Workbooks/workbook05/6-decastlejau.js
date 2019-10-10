/*jshint esversion: 6 */ 
// @ts-check

import { draggablePoints } from "./Libs/dragPoints.js";
import {runCanvas} from "./Libs/runCanvas.js";

/**
 * 
 * @param {number} u 
 * @param {Array<number>} p1 
 * @param {Array<number>} p2 
 */

// useful constant
const twoPi = 2 * Math.PI;

function lerp(u,p1,p2)
{
    let u1 = 1-u;
    return [u1*p1[0]+u*p2[0],u1*p1[1]+u*p2[1]];
}

/**
 * Just evaluate the Bezier curve using DeCastlejau
 * Slow and inefficent because it builds all the lists, but simple
 * @param {*} pts 
 * @param {*} param 
 */
function evaluate(pts,param) {
    while (pts.length > 1) {
        let newpts = [];
        for(let i=0; i<pts.length-1; i++) {
            let lp = lerp(param,pts[i],pts[i+1]);
            newpts.push(lp);
        }
        pts=newpts;
    }
    // there should be 1 point left
    return pts[0];
}

/**
 * Draw the DeCastlejau construction for a set of points
 * 
 * possibly show the resulting cuvre (sample it at nsamps)
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Array<number[]>} points 
 * @param {number} param 
 * @param {number} nsamps 
 */
function decastle(context,points,param,nsamps) {
    const circRadius=8;
    context.save();
    let pts=points;

    /** draw dots for the  control points*/
    context.fillStyle = "blue";
    points.forEach(function(pt) {
        context.beginPath();
        context.arc(pt[0],pt[1],5,0,twoPi);
        context.fill();
    });

    /** draw the curve */
    if (nsamps) {
        context.strokeStyle = "blue";
        context.beginPath();
        context.moveTo(points[0][0],points[0][1]);
        // hard code simple curves
        if (points.length==2)   
            context.lineTo(points[1][0],points[1][1]);
        else if (points.length==3)
            context.quadraticCurveTo(points[1][0],points[1][1], points[2][0],points[2][1]);
        else if (points.length==4)
            context.bezierCurveTo(points[1][0],points[1][1], points[2][0],points[2][1], points[3][0],points[3][1]);
        else {
            // we need to sample the curve
            let step = 1/nsamps;
            for(let u=step; u<=1; u+=step) {
                let [x,y] = evaluate(points,u);
                context.lineTo(x,y);
            }
        }
        context.stroke();
    }

    /** do the construction - draw the lines along the way*/
    context.lineWidth = 1;
    context.strokeStyle = "black";
    while (pts.length > 1) {
        let newpts = [];
        context.beginPath();
        context.moveTo(pts[0][0],pts[0][1]);
        for(let i=0; i<pts.length-1; i++) {
            let lp = lerp(param,pts[i],pts[i+1]);
            newpts.push(lp);
            context.lineTo(pts[i+1][0],pts[i+1][1]);
        }
        context.stroke();
        pts=newpts;
    }
    // at the end there is one point...
    context.fillStyle = "red";
    context.beginPath();
    context.arc(pts[0][0],pts[0][1],circRadius,0,twoPi);
    context.fill();
    context.restore();
}

/**
 * Draw 3 different DeCastlejau Constructions
 */
function box1() {
    let canvas = document.getElementById("box1"); 
    if (! (canvas instanceof HTMLCanvasElement)) throw new Error("Canvas is not HTML Element");
    let context = canvas.getContext("2d");
    function draw(canvas,t) {
        context.clearRect(0,0,canvas.width,canvas.height);

        context.save();
        context.translate(40,40);
        decastle(context,[[0,0], [0,120]],t,2);
        context.translate(40,0);
        decastle(context,[[0,120],[60,0],[120,120]],t,20);
        context.translate(160,0);
        decastle(context,[[0,120],[0,0],[120,0],[120,120]],t,20);
        context.translate(160,0);
        decastle(context,[[10,120],[0,40],[80,0],[160,40],[150,120]],t,20);
        context.restore();
    }
    runCanvas(canvas,draw,0,true,0,1,0.02);
}

function box1b() {
    let canvas = document.getElementById("box1b"); 
    if (! (canvas instanceof HTMLCanvasElement)) throw new Error("Canvas is not HTML Element");
    let context = canvas.getContext("2d");
    let pts = [ [100,300], [100,100], [300,100], [300,300] ];

    function draw(canvas,t) {
        context.clearRect(0,0,canvas.width,canvas.height);

        context.save();
        decastle(context,pts,t,50);
        context.restore();
    }
    runCanvas(canvas,draw,0,true,0,1,0.02);
    let slider = /** @type {HTMLInputElement} */ (document.getElementById("box1b-slider"));

    draggablePoints(canvas,pts,function() {draw(canvas,Number(slider.value));});
}

window.onload = function()
{
    box1();
    box1b();
};