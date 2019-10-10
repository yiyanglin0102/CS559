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
class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     */
    constructor(x,y,vx=1,vy=0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillRect(-5,-5,10,10);
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
		/*
		// Note - this sample behavior is just to help you understand
		// what a steering function might  do
		// all this one does is have things go in circles, rather than
		// straight lines
		// Something this simple would not count for the bonus points:
		// a "real" steering behavior must consider other boids,
		// or at least obstacles.
		
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        const angle = 2 * Math.PI / 180;
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        let ovx = this.vx;
        let ovy = this.vy;

        this.vx =  ovx * c + ovy * s;
        this.vy = -ovx * s + ovy * c;
		*/
    }
}

window.onload = function() {
    /** @type Array<Boid> */
    let theBoids = [];

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
    let context = canvas.getContext("2d");

    let speedSlider =/** @type {HTMLInputElement} */ (document.getElementById("speed"));

    function draw() {
        context.clearRect(0,0,canvas.width,canvas.height);
        theBoids.forEach(boid => boid.draw(context));
    }

    /**
     * Create some initial boids
     * STUDENT: may want to replace this
     */
    theBoids.push(new Boid(100,100));
    theBoids.push(new Boid(200,200,-1,0));
    theBoids.push(new Boid(300,300,0,-1));
    theBoids.push(new Boid(400,400,0,1));

    /**
     * Handle the buttons
     */
    document.getElementById("add").onclick = function () {
        // Students Fill This In
    };
    document.getElementById("clear").onclick = function() {
        // Student Fill This In
    };


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
            boid.x = boid.x % canvas.width;
            boid.y = boid.y % canvas.height;
            if (boid.x < 0) boid.x += canvas.width;
            if (boid.y < 0) boid.y += canvas.height;
        });
        // now we can draw
        draw();
        // and loop
        window.requestAnimationFrame(loop);
    
    }
    loop();
};