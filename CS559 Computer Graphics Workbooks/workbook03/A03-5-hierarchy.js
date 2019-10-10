/**
 * A03-5-hierarchy.js - a simple JavaScript file that gets loaded with
 * page "A03-5-hierarchy.html"
 *
 * written by Michael Gleicher, January 2019
 *
 */

// see other files for explanation of these comments
 // @ts-check
/* jshint -W069, esversion:6 */

/**
 * Helper function to make the draw code below more concise
 * this way each shape can be one line
 * @param {CanvasRenderingContext2D} context 
 * @param {Array<Array<number>>} points 
 * @param {string} color 
 */
function poly(context, points, color="lightblue")
{
    context.fillStyle=color;
    context.beginPath();
    context.moveTo(points[0][0],points[0][1]);
    points.slice(1).forEach( pt => context.lineTo(pt[0],pt[1]));
    context.fill();
}

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {Array<number>} variables
 */
function drawBody(context,variables) {
    let bodyX = 100;
    let bodyY = 100;

    const limbLength=20;
    const limbThick=4;
    const footLength=10;

    context.save();     // body coordinate system
        context.translate(variables[0],variables[1]);
        poly(context,[[8,0],[12,-20],[-12,-20],[-8,0]],"lightblue");
        context.save();     // right arm coordinate system
            context.translate(10,-16);
            context.rotate(variables[2]);
            context.fillStyle = "purple";
            context.fillRect(0,-limbThick,limbLength,limbThick*2);
            context.save(); // elbow coordinate system
                context.translate(limbLength,0);
                context.rotate(variables[3]);
                context.fillStyle = "red";
                context.fillRect(0,-limbThick,limbLength,limbThick*2);
            context.restore();
        context.restore();
        context.save();     // left arm coordinate system
            context.scale(-1,1);    // point the axis to the LEFT!
            context.translate(10,-16);
            context.rotate(variables[4]);
            context.fillStyle = "purple";
            context.fillRect(0,-limbThick,limbLength,limbThick*2);
            context.save(); // elbow coordinate system
                context.translate(limbLength,0);
                context.rotate(variables[5]);
                context.fillStyle = "red";
                context.fillRect(0,-limbThick,limbLength,limbThick*2);
            context.restore();
         context.restore();
         context.save();    // right leg
            context.translate(6,0);
            context.rotate(variables[6]);
            context.fillStyle = "purple";
            context.fillRect(-limbThick,0,limbThick*2,limbLength);
            context.save(); // lower leg (knee coordinates)
                context.translate(0,limbLength);
                context.rotate(variables[7]);
                context.fillStyle="red";
                context.fillRect(-limbThick,0,limbThick*2,limbLength);
                context.save(); // foot (angle coordinates)
                    context.translate(0,limbLength);
                    context.rotate(variables[8]);
                    context.fillStyle="brown";
                    context.fillRect(-limbThick,0,limbThick+footLength,limbThick);
                context.restore();
            context.restore();
        context.restore();
        context.save();    // left leg
            context.scale(-1,1);
            context.translate(6,0);
            context.rotate(variables[9]);
            context.fillStyle = "purple";
            context.fillRect(-limbThick,0,limbThick*2,limbLength);
            context.save(); // lower leg (knee coordinates)
                context.translate(0,limbLength);
                context.rotate(variables[10]);
                context.fillStyle="red";
                context.fillRect(-limbThick,0,limbThick*2,limbLength);
                context.save(); // foot (angle coordinates)
                    context.translate(0,limbLength);
                    context.rotate(variables[11]);
                    context.fillStyle="brown";
                    context.fillRect(-limbThick,0,limbThick+footLength,limbThick);
                context.restore();
            context.restore();
        context.restore();
    context.restore();
}

window.onload = function() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("b1"));
    let context = canvas.getContext("2d");

    let controls = document.getElementById("b1box");
    let sliders = [];
    for (let sl=0; sl<12; sl++) {
        let slider = document.createElement("input");
        slider.setAttribute("type","range");
        slider.setAttribute("min","-1");
        slider.setAttribute("max","1");
        slider.setAttribute("step",".1");
        slider.setAttribute("style","width:100px");
        slider.value = "0";
        controls.appendChild(slider);
        sliders.push(slider);
    }
    // the first two sliders are for position and are special
    sliders[0].setAttribute("min","0");
    sliders[0].setAttribute("max","200");
    sliders[0].setAttribute("step","2");
    sliders[0].value = "100";
    sliders[1].setAttribute("min","0");
    sliders[1].setAttribute("max","200");
    sliders[1].setAttribute("step","2");
    sliders[1].value = "100";

    sliders.forEach(sl => sl.oninput = function() {
        context.clearRect(0,0,canvas.width,canvas.height);
        drawBody(context, sliders.map(slider => Number(slider.value)));
    });
    drawBody(context, sliders.map(slider => Number(slider.value)));

};