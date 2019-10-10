/*jshint esversion: 6 */ 
// @ts-check
/**
 *  Simple thing to make a list of points in a Canvas draggable
 *
 * Designed for making quick UIs for CS559 demos
 */

 /**
  * Set up Draggable Points for an HTML Canvas
  * pass in the array of point positions (which it will change in the future)
  * and this will add the appropriate event handlers to the Canvas
  * 
  * The "redraw" function is called for any event that changes the state of
  * the points (mouse down, up, move).
  * If the redraw is called by something else (e.g., and animation loop) it
  * can be set to null
  * 
  * @param {HTMLCanvasElement} canvas - canvas to attach to
  * @param {Array<Array<number>>} pointList - list of points
  * @param {?FrameRequestCallback} redraw - function to be called when things change
  * @param {number} [circleRadius =10] - radius of circles (for hit testing)
  * @param {function} [changeNumber=undefined] - function to call if the number of points changes    
  }}
  */
export function draggablePoints(canvas, pointList, redraw, circleRadius=10,changeNumber=undefined)
{
    // keep state within the closure of the function
    let theCanvas = canvas;
    let thePoints = pointList;
    let theRedraw = redraw;
    let dragging = -1;

    if (!circleRadius) { circleRadius=10; }
    let circRadiusSq = circleRadius * circleRadius;

    canvas.addEventListener("mousedown",mouseDown);
    canvas.addEventListener("mousemove",drag);
    canvas.addEventListener("mouseup",endDrag);
    canvas.addEventListener("mouseleave",endDrag);

    // box up the redraw
    function doRedraw() {
        if (theRedraw) {
            // rather than drawing immediately, queue up a redraw
            // note that this runs the redraw once (just not now)
            window.requestAnimationFrame(theRedraw);
        }
    }

    // get the mouse position relative to a canvas
    function mousePosition(evt) {
        // remember - the clientX,clientY is not the actual mouse position
        // in the canvas coorindate system!
        let x = evt.clientX;
        let y = evt.clientY;
        var canvasbox = theCanvas.getBoundingClientRect();
        x -= canvasbox.left;
        y -= canvasbox.top;
        return [x,y];
    }

    // select the point nearest to the mouse 
    // note that this returns the index of the point - it does not set selection
    // or cause a redraw - you probably don't want to use this
    // as a handler
    function pickPoint(evt) {
        let [x,y] = mousePosition(evt);
    
        // nothing is selected, and minimum distance
        let sel=-1;
        let minD=circRadiusSq;
        thePoints.forEach((pt,i)=>{
            let dx = pt[0]-x;
            let dy = pt[1]-y;
            let d = dx*dx+dy*dy;
            if (d<minD) {
                minD = d;
                sel = i;
            }
        });
        return sel;
    }
   
    // mouse click - perform dragging 
    // if shift is held down, make a new point
    // if ctrl or meta is held down, delete the point
    // we need to do meta for the mac, where ctrl means something
    /**
     * 
     * @param {MouseEvent} evt 
     */
    function mouseDown(evt) {
        if (evt.shiftKey) {
            // we need to decide where to put the point
            // guess 1 = after the selected point
            let select = pickPoint(evt);

            if (select >=0) {
                let p1 = select;
                let p2 = (select+1) % thePoints.length;
                let newPt = [(thePoints[p1][0]+thePoints[p2][0])/2,
                (thePoints[p1][1]+thePoints[p2][1])/2];
                thePoints.splice(p1+1,0,newPt);           
            } else {
                // easy part is where, 
                // the harder part is what position
                let xy = mousePosition(evt);
                thePoints.push(xy);
                if (changeNumber) changeNumber();
                doRedraw();
            }
        } else if (evt.ctrlKey || evt.metaKey) {
            // do not delete the only point
            if (thePoints.length > 1) {
                let select = pickPoint(evt);
                if (select>=0) {
                    thePoints.splice(select,1);
                    if (changeNumber) changeNumber();
                    doRedraw();
                }
            }
        } else {
            let select = pickPoint(evt);

            if (select >= 0) {
                dragging = select;
                doRedraw();
            }    
        }
    }
    function endDrag(evt) {
        dragging = -1;
        doRedraw();
    }
    function drag(evt) {
        if (dragging >= 0) {
            let xy = mousePosition(evt);
            thePoints[dragging] = xy;
            doRedraw();
        }
    }
}