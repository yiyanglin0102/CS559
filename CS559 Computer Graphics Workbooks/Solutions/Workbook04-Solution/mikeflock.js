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
 * NOT FOR STUDENTS
 */
let mouseX = -10;
let mouseY = -10;

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
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        const s = Math.sin(0.02);
        const c = Math.cos(0.02);
        let ovx = this.vx;
        let ovy = this.vy;
        this.vx =  ovx * c + ovy * s;
        this.vy = -ovx * s + ovy * c;
        */
        if (mouseX > 0) {
            let tx = mouseX;
            let ty = mouseY;

            let dx = tx-this.x;
            let dy = ty-this.y;
            let d = Math.sqrt(dx*dx+dy*dy);

            const maxT = .05;
            if (d>maxT) {
                // the desired direction vector
                let oldA = Math.atan2(this.vy,this.vx);
                let goalA = Math.atan2(dy,dx);

                let dA = goalA - oldA;

                // see if we've flipped around
                if (dA > Math.PI) {dA -= 2*Math.PI; }
                if (dA < -Math.PI) {dA += 2*Math.PI; }

                if (dA>maxT) { dA=maxT;}
                if (dA<-maxT) {dA=-maxT;}

                this.vx = Math.cos(oldA+dA);
                this.vy = Math.sin(oldA+dA);
            }
        }
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
        if (mouseX>0) {
            context.save();
            context.fillStyle = "blue";
            context.fillRect(mouseX-10,mouseY-10,20,20);
            context.restore();
        }
       theBoids.forEach(boid => boid.draw(context));
    }

    /**
     * Create some initial boids
     */
    theBoids.push(new Boid(100,100));
    theBoids.push(new Boid(200,200,-1,0));
    theBoids.push(new Boid(300,300,0,-1));
    theBoids.push(new Boid(400,400,0,1));

    /**
     * Handle the buttons
     */
    document.getElementById("add").onclick = function () {
        for(let i=0; i<10; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let a = Math.random() * Math.PI*2;
            theBoids.push(new Boid(x,y,Math.cos(a),Math.sin(a)));
        }
    };
    document.getElementById("clear").onclick = function() {
        theBoids.length = 0;
    };


    /**
     * MOUSE STUFF - NOT FOR STUDENTS
     */
    canvas.onmouseleave = function() {
        mouseX = -10;
        mouseY = -10;
    }
    canvas.onmousemove = function(event) {
        var canvasbox = canvas.getBoundingClientRect();
        mouseX = event.clientX - canvasbox.left;
        mouseY = event.clientY - canvasbox.top;
    }

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
            /*
            boid.x = boid.x % canvas.width;
            boid.y = boid.y % canvas.height;
            if (boid.x < 0) boid.x += canvas.width;
            if (boid.y < 0) boid.y += canvas.height;
            */
           /******
            * Example collision
            */
           if (boid.x >= canvas.width) {
               boid.x = canvas.width - (boid.x-canvas.width);
               boid.vx *= -1;
           }
           if (boid.y >= canvas.height) {
               boid.y = canvas.height - (boid.y - canvas.height);
               boid.vy *= -1;
           }
           if (boid.x <= 0) {
               boid.x = -boid.x;
               boid.vx *= -1;
           }
           if (boid.y <=0) {
               boid.y = -boid.y;
               boid.vy *= -1;
           }
        });
        // now we can draw
        draw();
        // and loop
        window.requestAnimationFrame(loop);
    
    }
    loop();
};