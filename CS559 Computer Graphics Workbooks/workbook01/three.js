/**
 * JavaScript file that goes along with Workbook 1, Page 3
 * 
 * this file is unfortunately called "three.js" - not to be confused with a library
 * we will use later in the class
 * 
 * everything is put into one big function that gets run "onload"
 */
// note that we don't do a global "use strict" because this can create a problem
// if we include another file
// "use strict";

// we do enable typescript type checking - see
// http://graphics.cs.wisc.edu/WP/cs559-sp2019/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better 
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

window.onload = function() {
    /**
     * Code for BOX01
     * this finds the span and changes it to have new text
     */
    let span01 = document.getElementById("box1-span");
    span01.innerHTML = "write my text in the JavaScript Program";

    // we can also change the styles of things
    span01.style["backgroundColor"] = "#CEE";   // CEE = light cyan
    span01.style["color"] = "#008";             // 008 = mid blue  
    // note that I chose to write style["color"] rather than style.color
    // this is a coding style thing.
    // JavaScript pros prefer the dot notation (in fact, jshint will give a warning)
    // but I did it this way since it emphasizes what's going on


    /**
     * Code for Box2
     * This code does things with the buttons to show events
     */

     // get the first button, the first list element, and the corresponding text
     // element
    let button21 = document.getElementById("box2-button1");
    let li21 = document.getElementById("box2-li1");
    // when the button is clicked, change the text
    button21.onclick = function() {
        li21.innerText = "Button 1 was clicked!";
    };

    // for the second button, we can try the mouse down and mouse up events
    let button22 = document.getElementById("box2-button2");
    let li22 = document.getElementById("box2-li2");
    // on mouse down, change the text
    button22.onmousedown = function() {
        li22.innerText = "Button 2 is being pressed - to break it move the mouse outside the button before releasing";
    };
    button22.onmouseup = function() {
        li22.innerText = "Button 2 has been released";
    };

    // the problem is the we only get mouse up events if the cursor is over
    // the button.
    // there are lots of ways to deal with this - here's one using the
    // mouseleave event (when the mouse leaves the button)
    let button23 = document.getElementById("box2-button3");
    let li23 = document.getElementById("box2-li3");
    // I will keep track of state myself
    let button23state = 0;
    button23.onmousedown = function() {
        li23.innerText = "Button 3 is being pressed";
        button23state = 1;
    };
    button23.onmouseup = function() {
        if (button23state) {
            li23.innerText = "Button 3 has been released correctly";
        } else {
            li23.innerText = "Button 3 was released without being pressed (enter while press)";
        }
        button23state = 0;
    };
    button23.onmouseleave = function() {
        if (button23state) {
            li23.innerText = "Button 3 was left without being released";
        } 
        button23state = 0;
    };


    /**
     * Code for Box3
     * 
     * Here, use the 3 sliders and catch different events
     */
    // note the weird comments to declare type information!
    // these aren't necessary, but they can be useful for type checking
    /** @type{HTMLInputElement} */ let slider31 = (/** @type{HTMLInputElement} */ document.getElementById("box3-slider1"));
    /** @type{HTMLInputElement} */ let slider32 = (/** @type{HTMLInputElement} */ document.getElementById("box3-slider2"));
    /** @type{HTMLInputElement} */ let slider33 = (/** @type{HTMLInputElement} */ document.getElementById("box3-slider3"));
 
    // respond to different events on each
    slider31.onchange = function() {
        document.getElementById("box3-li1").innerHTML = `Slider 1 - <b>onchange</b> - new value ${slider31.value}`;
    };
    slider32.oninput = function() {
        document.getElementById("box3-li2").innerHTML = `Slider 2 - <b>oninput</b> - new value ${slider32.value}`;
    };
    slider33.onclick = function() {
        document.getElementById("box3-li3").innerHTML = `Slider 3 - <b>onclick</b> - new value ${slider33.value}`;
    };


    /**
     * Code for Box 4
     * 
     * Have the sliders change each other
     */
    /** @type{HTMLInputElement} */ let slider41 = (/** @type{HTMLInputElement} */ document.getElementById("box4-slider1"));
    /** @type{HTMLInputElement} */ let slider42 = (/** @type{HTMLInputElement} */ document.getElementById("box4-slider2"));
    slider41.onchange = function() {
        slider42.value = slider41.value;
    };
    slider42.oninput = function() {
        slider41.value = slider42.value;
    };

    /**
     * Code for Box 5
     * 
     * Request animation frame examples
     * 
     * Notice that I use the "performance.now" function to get the timing information
     * https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
     * 
     */
    // use request animation frame to do something 16ms
    // in the future - this kindof one off usage is a little
    // weird
    // basically, what this code is doing is scheduling an event for the future
    // and then handling the event
    let timestamp = performance.now();
    window.requestAnimationFrame(function() {
        let span = document.getElementById("box5-rs1");
        // toFixed converts a floating point number to something
        // with a fixed number of decimal places
        // we can use template literal to display the number
        span.innerText = `Hello from ${(performance.now()-timestamp).toFixed(1)} ms in the future.`;
    });

    let rs2 = document.getElementById("box5-rs2");
    window.requestAnimationFrame(function() {
        // this is the function for the first request
        rs2.innerText = "Hello from First. ";
        // remember when this happened
        let ts1 = performance.now();
        // now queue up the second one, even farther in the future
        window.requestAnimationFrame(function() {
            // this is the function forthe second request
            // not that I am adding to innertext
            let now = performance.now();
            // remember that we can see the variable ts1 from the outer
            // function (thanks to closure!)
            rs2.innerText += ` Hello from Second ${(now-ts1).toFixed(1)} ms after First.`;
        });
    });

    // a more typical usage of request animation frame
    // a function schedules itself to be called in order to
    // make a loop
    /** @type{HTMLInputElement} */ let slr1 = (/** @type{HTMLInputElement} */ document.getElementById("box5-slider"));
    function advanceSLR1() {
        // add 1, roll over to zero if we hit the max
        // note that the value of the slider is a string,
        // so we have to convert it to a number
        // The more obvious 1+"1" = "11" - thanks to JavaScripts
        // aggressive coercion rules
        let newValue = (Number(slr1.value)+1) % 100;
        slr1.value = newValue.toString();
        // ask for this to be called again 16ms in the future
        window.requestAnimationFrame(advanceSLR1);
    }
    // note that just defined the function, now we need to call it
    // to start the loop
    advanceSLR1();

    /**
     * Box 6 - examples of animation loop programming
     */
    // this example is really similar to the Box 5 example - notice how
    // both sliders can work, even though neither generates
    // any events. everything happens by "polling."
    /** @type{HTMLInputElement} */ let slr2 = (/** @type{HTMLInputElement} */ document.getElementById("box6-slider1"));
    /** @type{HTMLInputElement} */ let slr2b = (/** @type{HTMLInputElement} */ document.getElementById("box6-slider2"));
    function advanceSLR2() {
        // add speed, roll over to zero if we hit the max
        // note that the value of the slider is a string,
        // so we have to convert it to a number
        // The more obvious 1+"1" = "11" - thanks to JavaScripts
        // aggressive coercion rules
        let speed = Number(slr2.value);
        let newValue = (Number(slr2b.value)+speed) % 100;
        if (newValue<0) newValue=100;
        slr2b.value = newValue.toString();
        // ask for this to be called again 16ms in the future
        window.requestAnimationFrame(advanceSLR2);
    }
    // note that just defined the function, now we need to call it
    // to start the loop
    advanceSLR2();

    /** @type{HTMLInputElement} */ let slr3 = (/** @type{HTMLInputElement} */ document.getElementById("box6-slider3"));
    /** @type{HTMLInputElement} */ let speedbut = (/** @type{HTMLInputElement} */ document.getElementById("box6-check"));
    function advanceSLR3() {
        // add speed, roll over to zero if we hit the max
        // note that the value of the slider is a string,
        // so we have to convert it to a number
        // The more obvious 1+"1" = "11" - thanks to JavaScripts
        // aggressive coercion rules
        let speed = speedbut.checked ? 3 : 1;
        let newValue = (Number(slr3.value)+speed) % 100;
        if (newValue<0) newValue=100;
        slr3.value = newValue.toString();
        // ask for this to be called again 16ms in the future
        window.requestAnimationFrame(advanceSLR3);
    }
    // note that just defined the function, now we need to call it
    // to start the loop
    advanceSLR3();

    /** @type{HTMLInputElement} */ let slr4 = (/** @type{HTMLInputElement} */ document.getElementById("box6-slider4"));
    /** @type{HTMLInputElement} */ let gobut = (/** @type{HTMLInputElement} */ document.getElementById("box6-check2"));
    function advanceSLR4() {
        // add speed, roll over to zero if we hit the max
        // note that the value of the slider is a string,
        // so we have to convert it to a number
        // The more obvious 1+"1" = "11" - thanks to JavaScripts
        // aggressive coercion rules
        let speed = gobut.checked ? 2 : 0;
        let newValue = (Number(slr4.value)+speed) % 100;
        if (newValue<0) newValue=100;
        slr4.value = newValue.toString();
        // ask for this to be called again 16ms in the future
        window.requestAnimationFrame(advanceSLR4);
    }
    // note that just defined the function, now we need to call it
    // to start the loop
    advanceSLR4();

    /**
     * Box 7 - blinking the hard way
     * 
     * I'm going to do the work in a function, so I can use it for multiple things
     */

    /**
     * A function that makes an HTML element blink
     * 
     * This creates a function that does the blinking, and makes an animation loop
     * with requestAnimationFrame
     * 
     * @param {string} id - which element to find
     * @param {number} [rate=250] - blink rate in milliseconds
     * @param {Array<string>} [blinkColors=["red","yellow","green"]] - colors to cycle through
     */
    function makeBlink(id, rate, blinkColors) {
        rate = rate ? rate : 250;
        blinkColors = blinkColors ? blinkColors : ["red","yellow","green"];
        let toblink = document.getElementById(id);
        let lastBlinkTime = 0;
        let lastBlinkColor = 0;
        function blinker() {
            let time = performance.now();
            if ((time-lastBlinkTime) > rate) {
                lastBlinkTime = time;
                toblink.style.backgroundColor = blinkColors[lastBlinkColor % blinkColors.length];
                lastBlinkColor++;
            }
            window.requestAnimationFrame(blinker);
        }
        blinker();    
    }
    makeBlink("box7-span1");
    makeBlink("box7-span2",500);
    makeBlink("box7-span3",350,["lightpink","lightyellow","lightgreen"]);
};