/**
 * a MODULE that implements box 3 of page 1
 */

/* jshint -W069, esversion:6 */

// the "export" tells JavaScript what the outside world can see
export function draw() {
    /** @type {HTMLCanvasElement} */
    let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("i03"));
    let context = canvas.getContext('2d');
 
    // draw squares with triangles in them
    // access "context" because its in scope
    // note that these both draw at the origin!
    function drawUpArrow() {
        context.save();
        context.fillStyle = "goldenrod";
        context.fillRect(0,0,20,20);
        context.fillStyle = "red";
        context.beginPath();
        context.moveTo(10,5);
        context.lineTo(5,15);
        context.lineTo(15,15);
        context.fill();
        context.restore();
    }
    function drawDownArrow() {
        context.save();
        context.fillStyle = "goldenrod";
        context.fillRect(0,0,20,20);
        context.fillStyle = "green";
        context.beginPath();
        context.moveTo(10,15);
        context.lineTo(5,5);
        context.lineTo(15,5);
        context.fill();
        context.restore();
    }

    for (let r=0; r<4; r++) {
        for (let c=0; c<4; c++) {
            context.save();
            context.translate(20+c*40, 20+r*40);
            // this is intentionally funky code:
            // note how I compute what function to call, then I call it!
            ( ((r+c)%2) ? drawUpArrow : drawDownArrow) ();
            context.restore();
        }
    }
}