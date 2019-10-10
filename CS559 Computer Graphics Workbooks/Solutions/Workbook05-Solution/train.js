/*jshint esversion: 6 */
// @ts-check

import {draggablePoints} from "./Libs/dragPoints.js";
import {RunCanvas} from "./Libs/runCanvas.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [ [150,150], [150,450], [450,450], [450,150]];

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
    let context = canvas.getContext("2d");
    // clear the screen
    context.clearRect(0,0,canvas.width,canvas.height);

    // draw the control points
    function drawPoints()
    {
        thePoints.forEach(function(pt) {
            context.fillStyle = "red";
            context.beginPath();
            context.arc(pt[0],pt[1],5,0,Math.PI*2);
            context.closePath();
            context.fill();
        });
    }

    // now, the student should add code to draw the track and train
    // Begin Example Solution
    let simple = /** @type{HTMLInputElement} */ (document.getElementById("simple-track")).checked;
    let arclength = /** @type{HTMLInputElement} */ (document.getElementById("arc-length")).checked;
    let n = thePoints.length;
    // Small helper functions
    // The function to increment (decrement) the index without running out of bound
    function incr(i = 0) {return (i + 1) % n;}
    function decr(i = 0) {return (i - 1 + n) % n;}
    // The function to calculate derivative at point i coordinate j
    // See Workbook Page 3 Box 3 for the formula
    function deriv(i = 0, j = 0) {return 0.5 * (thePoints[incr(i)][j] - thePoints[decr(i)][j]);}
    // Compute the derivatives for the cardinal spline
    let theDerivs = [];
    for (let i = 0; i < n; i ++) theDerivs[i] = [deriv(i, 0), deriv(i, 1)];
    // The function to calculate control point at point i coordinate j
    // If sign is 1, add 1/3 of the derivative, if sign is -1, subtract 1/3 of the derivative
    // See Workbook Page 5 Box 1 for the formula
    function control(i = 0, j = 0, sign = 1) {return thePoints[i][j] + sign * 1.0 / 3.0 * theDerivs[i][j];}
    // Compute the control points for the Bezier curves
    // See Workbook Page 5 Box 1 for the formula
    let theControls = [];
    for (let i = 0; i < n; i ++) theControls[i] = [control(i, 0, 1), control(i, 1, 1), control(incr(i), 0, -1), control(incr(i), 1, -1)];
    // The function to calculate the position along the curve
    function position(u = 0, i = 0, j = 0) {return thePoints[i][j] + theDerivs[i][j] * u + (-3 * thePoints[i][j] - 2 * theDerivs[i][j] + 3 * thePoints[incr(i)][j] - theDerivs[incr(i)][j]) * u * u + (2 * thePoints[i][j] + theDerivs[i][j] - 2 * thePoints[incr(i)][j] + theDerivs[incr(i)][j]) * u * u * u;}
    // The function to calulate the velocity along the curve
    function velocity(u = 0, i = 0, j = 0) {return theDerivs[i][j] + 2 * (-3 * thePoints[i][j] - 2 * theDerivs[i][j] + 3 * thePoints[incr(i)][j] - theDerivs[incr(i)][j]) * u + 3 * (2 * thePoints[i][j] + theDerivs[i][j] - 2 * thePoints[incr(i)][j] + theDerivs[incr(i)][j]) * u * u;}
    // Define the new parameterization
    function distance(p1 = [0, 0], p2 = [0, 0]) {return Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));}
    // Draw the track and calculate the arc-length parameterization
    let theStops = [];
    let theDistances = [];
    let theVelocities = [];
    let dist = 0;
    let totalDist = 0;
    let seg = 0;
    let di = 0.001;
    let m = n / di;
    // The function to normalize a vector to a fixed length
    function normalize (p = [1, 0], l = 1) 
    {
        let norm = Math.sqrt(p[0] * p[0] + p[1] * p[1]);
        if (norm == 0) return [0, 0];
        return [p[0] / norm * l, p[1] / norm * l];
    }
    // Compute the distance table
    for (let i = 0; i < m; i ++)
    {
        seg = Math.floor(di * i);
        // Sample the positions
        theStops[i] = [position(di * i - seg, seg, 0), position(di * i - seg, seg, 1)];
        theDistances[i] = [di * i, totalDist];
        // Compute the distance between consecutive samples
        if (i > 0) dist = distance(theStops[i], theStops[i - 1]);
        // Accumulate the distances
        totalDist += dist;
        // Also compute and normalize the velocities to draw the double tracks
        theVelocities[i] = normalize([velocity(di * i - seg, seg, 0), velocity(di * i - seg, seg, 1)], 5);
    }
    // Draw the simple track
    if (simple)
    {
        context.save();
        context.beginPath();
        context.moveTo(thePoints[0][0], thePoints[0][1]);
        for (let i = 0; i < n; i ++) context.bezierCurveTo(theControls[i][0], theControls[i][1], theControls[i][2], theControls[i][3], thePoints[incr(i)][0], thePoints[incr(i)][1]);
        context.closePath();
        context.stroke();
        context.restore();
    }
    else
    {
        // Draw the parallel tracks
        for (let i = 0; i < m - 1; i ++)
        {
            context.save();
            context.beginPath();
            // Compute the track segment as position plus orthogonal vector to the velocity and position minus orthogonal vector
            // The orthogonal vector to (x, y) is (y, -x) and (-y, x)
            context.moveTo(theStops[i][0] + theVelocities[i][1], theStops[i][1] - theVelocities[i][0]);
            context.lineTo(theStops[i + 1][0] + theVelocities[i + 1][1], theStops[i + 1][1] - theVelocities[i + 1][0]);
            context.moveTo(theStops[i][0] - theVelocities[i][1], theStops[i][1] + theVelocities[i][0]);
            context.lineTo(theStops[i + 1][0] - theVelocities[i + 1][1], theStops[i + 1][1] + theVelocities[i + 1][0]);
            context.stroke();
            context.restore();
        }
    }
    // Compute the arc length parameter
    function arcu(x = 0)
    {
        seg = 0;
        // Find the segment x corresponds to by incrementing until x exceeds the total-distance-so-far the first time
        while (x > theDistances[seg][1] && seg < m - 1) seg ++;
        // Since di is set to be very small, interpolation is not done
        return theDistances[seg][0];
    }
    let u = 0;
    // Draw the rail ties
    if (!simple)
    {
        for (let i = 0; i <= totalDist - 20; i += 20)
        {
            u = arcu(i);
            seg = Math.floor(u);
            // Draw a rectangle every 20 units of distance
            context.save();
            context.fillStyle = "black";
            context.translate(position(u - seg, seg, 0), position(u - seg, seg, 1));
            context.rotate(0.5 * Math.PI + Math.atan2(velocity(u - seg, seg, 1), velocity(u - seg, seg, 0)));
            context.fillRect(-10, -2.5, 20, 5);
            context.restore();
        }
    }
    // Draw the control dots
    drawPoints();
    // Draw the train
    let h = 20;
    let w = 15;
    for (let i = 0; i < n; i ++)
    {
        // Note that param is between 0 and n, so the current distance (from 0) is totalDist * param / n
        // Draw the cars three times its lengths (3 * h) distance apart
        // Make sure the current distance is between 0 and totalDist
        if (arclength) u = arcu((totalDist * param / n - i * h * 3 + totalDist) % totalDist);
        // Draw the cars one percent of its length in terms of param unit
        // Make sure the resulting param is between 0 and n
        else u = (param - i * h / 100 + n) % n;
        // Determines which segment the car is currently on
        seg = Math.floor(u);
        // Draw the car
        context.save();
        context.fillStyle = "blue";
        context.translate(position(u - seg, seg, 0), position(u - seg, seg, 1));
        context.rotate(Math.atan2(velocity(u - seg, seg, 1), velocity(u - seg, seg, 0)));
        context.fillRect(-h, -w, 2 * h, 2 * w);
        context.strokeRect(-h, -w, 2 * h, 2 * w);
        // Draw two circles as links
        context.beginPath();
        context.arc(1.25 * h, 0, 0.25 * h, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
        context.beginPath();
        context.arc(-1.25 * h, 0, 0.25 * h, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
        // Draw a triangle on the first car
        if (i == 0)
        {
            context.fillStyle = "green";
            context.beginPath();
            context.moveTo(0.5 * h, 0);
            context.lineTo(-0.25 * h, 0.5 * w);
            context.lineTo(-0.25 * h, -0.5 * w);
            context.closePath();
            context.fill();
            context.stroke();
        }
        context.restore();
    }
    // End Example Solution
}

/**
 * Setup stuff - make a "window.onload" that sets up the UI and starts
 * the train
 */
let oldOnLoad = window.onload;
window.onload = function() {
    let theCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let theContext = theCanvas.getContext("2d");
    // we need the slider for the draw function, but we need the draw function
    // to create the slider - so create a variable and we'll change it later
    let theSlider; // = undefined;

    // note: we wrap the draw call so we can pass the right arguments
    function wrapDraw() {
        // do modular arithmetic since the end of the track should be the beginning
        draw(theCanvas, Number(theSlider.value) % thePoints.length);
    }
    // create a UI
    let runcavas = new RunCanvas(theCanvas,wrapDraw);
    // now we can connect the draw function correctly
    theSlider = runcavas.range;

    function addCheckbox(name,initial=false) {
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        document.getElementsByTagName("body")[0].appendChild(checkbox);
        checkbox.id = name;
        checkbox.onchange = wrapDraw;
        checkbox.checked = initial;
        let checklabel = document.createElement("label");
        checklabel.setAttribute("for","simple-track");
        checklabel.innerText = name;
        document.getElementsByTagName("body")[0].appendChild(checklabel);
    }
    // note: if you add these features, uncomment the lines for the checkboxes
    // in your code, you can test if the checkbox is checked by something like:
    // document.getElementById("simple-track").checked
    // in your drawing code
    //
    // lines to uncomment to make checkboxes
    addCheckbox("simple-track",false);
    addCheckbox("arc-length",true);
    // addCheckbox("bspline",false);

    // helper function - set the slider to have max = # of control points
    function setNumPoints() {
        runcavas.setupSlider(0,thePoints.length,0.05);
    }

    setNumPoints();
    runcavas.setValue(0);

    // add the point dragging UI
    draggablePoints(theCanvas,thePoints,
                    wrapDraw,
                    10,setNumPoints);


};
