/**
 * 4-Matrix-Exercise.js - code for workbook 4 page 4
 * provides a non-working example for students to edit
 *
 * written by Michael Gleicher, January 2019
 *
 */

// see other files for explanation of these comments
 // @ts-check
/* jshint -W069, esversion:6 */

/**
 * If you want to read up on JavaScript classes, check out your favorite book or...
 * the chapter in the Exploring JS book: http://exploringjs.com/es6/ch_classes.html
 * 
 */

// Begin Example Solution
// Set the size of the boids
const size = 5;
// Set the duration of the boids staying red after collision
const duration = 10;
// Set the probability that a boid is a leader
const leader = 0.05;
// Initialize the mouse positions
let mouseX = -1;
let mouseY = -1;
// Initialize the slider variables
let max_angle = 0;
let nearby_distance = 0;
let weight_alignment = 1;
let weight_separation = 1;
let weight_cohesion = 1;
let weight_chasing = 1;
let weight_mouse = 1;

class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     * @param {number} mv - maximum speed, leader = 2, other = 1
     * @param {number} s - state
     */
    constructor(x,y,vx=1,vy=0,mv=1,s=0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.s = s;
        this.mv = mv;
        this.normalize();
    }

    // Make sure the speed is 1 at all times
    normalize()
    {
        let norm = this.vx * this.vx + this.vy * this.vy;
        // If by accident, the norm is 0, normalize another random vector
        if (norm == 0)
        {
            this.vx = rand(-1, 1);
            this.vy = rand(-1, 1);
            this.normalize();
        }
        // Otherwise, divide the vector by its norm
        else if (norm != this.mv)
        {
            norm = Math.sqrt(norm);
            this.vx *= this.mv / norm;
            this.vy *= this.mv / norm;
        }
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.save();
        // Set the color to red if the Boid is in a positive state
        if (this.s > 0) context.fillStyle = "red";
        else if (this.mv == 2) context.fillStyle = "blue";
        this.s = Math.max(this.s - 1, 0);
        // Draw the triangle
        context.translate(this.x, this.y);
        context.rotate(Math.atan2(this.vy, this.vx));
        context.beginPath();
        context.moveTo(size, 0);
        context.lineTo(-size, size);
        context.lineTo(-size, -size);
        context.closePath();
        context.fill();
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        
        if (this.s == 0)
        {
            // This is the final angle
            let angle = 0;
            // These are the current positions and angle of the boid
            let x = this.x;
            let y = this.y;
            let a = Math.atan2(this.vy, this.vx);
            // These are variables used to calculate the alignment angle
            let alignment = a;
            let total_alignment = 0;
            let total_distance = 0;
            let distance = 0;
            // These are variables used to calculate the separation angle
            let separation = a;
            let min_distance = -1;
            let min_x = 0;
            let min_y = 0;
            // These are variables used to calculate the cohesion angle
            let cohesion = a;
            let average_x = 0;
            let average_y = 0;
            let count = 0;
            // These are variables used to calcuate the chasing angle
            let chasing = a;
            let leader_distance = -1;
            let leader_x = 0;
            let leader_y = 0;
            // These are variables used to calculate the mouse angle
            let mouse = a;
            flock.forEach(function(boid) {
                // Compute the distance between the boids
                distance = Math.sqrt((boid.x - x) * (boid.x - x) + (boid.y - y) * (boid.y - y));
                if (distance > 0 && distance < nearby_distance)
                {
                    // Accumulate weighted angles from nearby boids
                    total_distance += 1.0 / distance;
                    // Note that the angle is calculated as the difference between the angles of boids and normalized between -PI and PI
                    total_alignment += 1.0 / distance * ((Math.atan2(boid.vy, boid.vx) - a + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
                    // Accumulate the closest boid
                    if (min_distance < 0 || distance < min_distance)
                    {
                        min_distance = distance;
                        min_x = boid.x;
                        min_y = boid.y;
                    }
                    // Accumulate the average nearby boid location
                    average_x += boid.x;
                    average_y += boid.y;
                    count ++;
                }
                // Accumulate the closest leader
                if (boid.mv == 2 && (leader_distance < 0 || distance < leader_distance))
                {
                    leader_distance = distance;
                    leader_x = boid.x;
                    leader_y = boid.y;
                }
            });
            // Compute the change in angles
            if (total_distance != 0) alignment = a + total_alignment / total_distance;
            if (min_distance > 0) separation = Math.PI + Math.atan2(min_y - y, min_x - x);
            if (count > 0) cohesion = Math.atan2(average_y / count - y, average_x / count - x);
            if (this.mv != 2 && leader_distance > 0) chasing = Math.atan2(leader_y - y, leader_x - x);
            if (mouseX >= 0 && mouseY >= 0) mouse = Math.atan2(mouseY - y, mouseX - x);
            // Compute the weighted sum of the changes and bound it by maximum turning angle
            angle = alignment * weight_alignment + separation * weight_separation + cohesion * weight_cohesion + weight_chasing * chasing + weight_mouse * mouse;
            if (weight_alignment + weight_separation + weight_cohesion + weight_chasing + weight_mouse == 0) angle = 2 * Math.PI / 180;
            else angle = (a - angle / (weight_alignment + weight_separation + weight_cohesion + weight_chasing + weight_mouse) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
            // Bound the angle between + and - maximum angle
            angle = Math.max(Math.min(angle, max_angle), -max_angle);
            // Compute the new rotation vector
            const s = Math.sin(angle);
            const c = Math.cos(angle);

            let ovx = this.vx;
            let ovy = this.vy;

            this.vx =  ovx * c + ovy * s;
            this.vy = -ovx * s + ovy * c;
        }
    }
}

// Find a random number between 0 and 1
function rand (a = 0, b = 1)
{
    return Math.random() * (b - a) + a;
}

window.onload = function() {
    /** @type Array<Boid> */
    let theBoids = [];

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
    let context = canvas.getContext("2d");

    let speedSlider =/** @type {HTMLInputElement} */ (document.getElementById("speed"));
    
    function draw() {
        context.clearRect(0,0,canvas.width,canvas.height);
        // Draw the obstacles
        theObstacles.forEach(function(obstacle) {
            context.save();
            context.translate(obstacle.x, obstacle.y);
            context.fillStyle = "green";
            if (obstacle.t == 0)
            {
                context.beginPath();
                context.arc(0, 0, obstacle.r, 0, 2 * Math.PI);
                context.fill();
            }
            else context.fillRect(- obstacle.r, - obstacle.r, obstacle.r * 2, obstacle.r * 2);
            context.restore();
        });
        // Draw the boids
        theBoids.forEach(boid => boid.draw(context));
    }

    // Sample of the mouse click location
    canvas.onmousedown = function(event) {
        mouseX = event.clientX - /** @type {HTMLElement} */ (event.target).getBoundingClientRect().left;
        mouseY = event.clientY - /** @type {HTMLElement} */ (event.target).getBoundingClientRect().top;
    };
    // Clear the mouse click location
   canvas.onmouseup = function(event) {
        mouseX = -1;
        mouseY = -1;
    };

    /**
     * Create some initial boids
     * STUDENT: may want to replace this
     */
    theBoids.push(new Boid(100,100));
    theBoids.push(new Boid(200,200,-1,0));
    theBoids.push(new Boid(300,300,0,-1));
    theBoids.push(new Boid(400,400,0,1));

    // (x, y) is the position, r is the size, and t = 0 if it is circle, and t = 1 if it is a square
    let theObstacles = [{"x":100, "y":500, "r":50, "t":0}, {"x":500, "y":100, "r":50, "t":1}, {"x":200, "y":400, "r":50, "t":1}, {"x":400, "y":200, "r":50, "t":0}];

    /**
     * Handle the buttons
     */
    document.getElementById("add").onclick = function () {
        // Students Fill This In
        for (let i = 0; i < 10; i ++) 
        {
            let x = rand(size, canvas.width - size);
            let y = rand(size, canvas.height - size);
            // Check to make sure it is not inside any obstacles
            let inside = theObstacles.filter(obstacle => check_inside(x, y, obstacle));
            // Set the speed depending on whether the boid is a leader
            let speed = 1;
            if (Math.random() < 0.05) speed = 2;
            // Set random speed between -1 and 1
            if (inside.length == 0) theBoids.push(new Boid(x, y, rand(-1, 1), rand(-1, 1), speed));
            else i --;
        }
    };
    document.getElementById("clear").onclick = function() {
        // Student Fill This In
        theBoids.length = 0;
    };

    // Check if (x, y) is inside the obstacle
    function check_inside (x, y, obstacle)
    {
        if (obstacle.t == 0) return Math.sqrt((obstacle.x - x) * (obstacle.x - x) + (obstacle.y - y) * (obstacle.y - y)) <= obstacle.r + size;
        else return Math.abs(obstacle.x - x) < obstacle.r + size && Math.abs(obstacle.y - y) <= obstacle.r + size;
    }

    // Set the slider values
    function set_sliders (a, b, c, d, e)
    {
        /** @type {HTMLInputElement} */ (document.getElementById("weight_alignment")).value = a;
        /** @type {HTMLInputElement} */ (document.getElementById("weight_separation")).value = b;
        /** @type {HTMLInputElement} */ (document.getElementById("weight_cohesion")).value = c;
        /** @type {HTMLInputElement} */ (document.getElementById("weight_chasing")).value = d;
        /** @type {HTMLInputElement} */ (document.getElementById("weight_mouse")).value = e;
        update_weights();
    }

    // Update the parameters according to the sliders
    function update_weights ()
    {
        max_angle = Number(/** @type {HTMLInputElement} */ (document.getElementById("max_angle")).value);
        nearby_distance = Number(/** @type {HTMLInputElement} */ (document.getElementById("nearby_distance")).value);
        weight_alignment = Number(/** @type {HTMLInputElement} */ (document.getElementById("weight_alignment")).value);
        weight_separation = Number(/** @type {HTMLInputElement} */ (document.getElementById("weight_separation")).value);
        weight_cohesion = Number(/** @type {HTMLInputElement} */ (document.getElementById("weight_cohesion")).value);
        weight_chasing = Number(/** @type {HTMLInputElement} */ (document.getElementById("weight_chasing")).value);
        weight_mouse = Number(/** @type {HTMLInputElement} */ (document.getElementById("weight_mouse")).value);
    }
    // Handle the sliders
    update_weights();
    document.getElementById("max_angle").onchange = update_weights;
    document.getElementById("nearby_distance").onchange = update_weights;
    document.getElementById("weight_alignment").onchange = update_weights;
    document.getElementById("weight_separation").onchange = update_weights;
    document.getElementById("weight_cohesion").onchange = update_weights;
    document.getElementById("weight_chasing").onchange = update_weights;
    document.getElementById("weight_mouse").onchange = update_weights;
    // Update the sliders according to the buttons
    document.getElementById("alignment").onclick = function () {set_sliders(1, 0, 0, 0, 0);};
    document.getElementById("separation").onclick = function () {set_sliders(0, 1, 0, 0, 0);};
    document.getElementById("cohesion").onclick = function () {set_sliders(0, 0, 1, 0, 0);};
    document.getElementById("chasing").onclick = function () {set_sliders(0, 0, 0, 1, 0);};
    document.getElementById("mouse").onclick = function () {set_sliders(0, 0, 0, 0, 1);};
    document.getElementById("balanced").onclick = function () {set_sliders(0.5, 0.5, 0.5, 0.5, 0.5);};
    document.getElementById("none").onclick = function () {set_sliders(0, 0, 0, 0, 0);};

    /**
     * The Actual Execution
     */
    function loop() {
        // change directions
        theBoids.forEach(boid => boid.steer(theBoids));
        // move forward
        let speed = Number(speedSlider.value);
        theBoids.forEach(function(boid) {
            boid.x += boid.vx * speed;
            boid.y += boid.vy * speed;
        });
        // make sure that we stay on the screen
        theBoids.forEach(function(boid) {
            /**
             * Students should replace this with collision code
             */
            // Change the direction if the boid hit the vertical boundaries of the canvas
            if (boid.s == 0 && (boid.x <= size && boid.vx < 0) || (boid.x >= canvas.width - size && boid.vx > 0)) 
            {
                boid.vx = -boid.vx;
                boid.s = duration;
            }
            // Change the direction if the boid hit the horizontal boundaries of the canvas
            if (boid.s == 0 && (boid.y <= size && boid.vy < 0) || (boid.y >= canvas.height - size && boid.vy > 0))
            {
                boid.vy = -boid.vy;
                boid.s = duration;
            }
            // Change the direction if the boid hits an obstacle
            theObstacles.forEach(function(obstacle)
            {
                if (check_inside(boid.x, boid.y, obstacle))
                {
                    // Change to the direction opposite to the center of the obstacle if it is a circle
                    if (obstacle.t == 0)
                    {
                        boid.vy = boid.y - obstacle.y;
                        boid.vx = boid.x - obstacle.x;
                    }
                    // Change to the direction according to which edge the boid hits if it is a rectangle
                    else
                    {
                        if (Math.abs(boid.y - obstacle.y) <= Math.abs(boid.x - obstacle.x)) boid.vx = Math.sign(boid.x - obstacle.x) * Math.abs(boid.vx);
                        else boid.vy = Math.sign(boid.y - obstacle.y) * Math.abs(boid.vy);
                    }
                    boid.normalize();
                    boid.s = duration;
                } 
            });
            // Change the direction if the boid hits another boid
            theBoids.forEach(function(otherBoid) {
                if (boid != otherBoid && (boid.x - otherBoid.x) * (boid.x - otherBoid.x) + (boid.y - otherBoid.y) * (boid.y - otherBoid.y) <= 4 * size * size)
                {
                    // Change to the direction opposite to the center of the other boid
                    boid.vx = boid.x - otherBoid.x;
                    boid.vy = boid.y - otherBoid.y;
                    boid.normalize();
                    boid.s = duration;
                }
            });
        });
        // now we can draw
        draw();
        // and loop
        window.requestAnimationFrame(loop);
    }
    loop();
};
// End Example Solution