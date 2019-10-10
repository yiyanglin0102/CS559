// empty shell for students to do their quadcopter
// exercise

// see other files for explanation of these comments
 // @ts-check
/* jshint -W069, esversion:6 */

// Begin Simple Example Solution
function basic ()
{
    // somewhere in your program (maybe not here) you'll want a line
    // that looks like:
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("p6"));
    let context = canvas.getContext("2d");
    // Set the speed of the QuadCopter
    let frontSpeed = 0.05;
    // Set the speed of the propeller
    let propellerSpeed = 0.5;
    // Set the radius of the circular path
    let pathRadius = 200;
    // Initialize the current location and angles
    // (x, y) keeps track of the location of the center of the QuadCopter
    let x = 0.5 * canvas.width + pathRadius;
    let y = 0.5 * canvas.height;
    // a keeps track of the path angle from the center of the canvas
    // This implies (x, y) = (radius * sin(a), radius * cos(a))
    let a = 0;
    // r keeps track of the angle the QaudCopter is facing 
    let r = 0.5 * Math.PI;
    // s keeps track of the angle of the propeller
    let s = 0;
    // This function draws a simple arm
    function drawSimpleArm(context, s)
    {
        // Set the sizes of the parts of the QuadCopter
        let propellerAngle = s;
        let armLength = 40;
        let armThick = 10;
        let propellerLength = 40;
        let propellerThick = 10;
        // Draw a rectangle as the arm
        context.fillRect(- 0.5 * armThick, - 0.5 * armThick, armLength, armThick);
        context.save();
            // Move the canvas to draw the propeller
            context.translate(armLength - armThick, 2);
            context.rotate(propellerAngle);
            // Draw a rectangle as the propeller
            context.fillRect(-0.5 * propellerLength, -0.5 * propellerThick, propellerLength, propellerThick);
        context.restore();
    }
    // This function draws a simple QuadCopter
    function drawSimpleCopter(context, x, y, r, s)
    {
        // Set the sizes of the parts of the QuadCopter
        let frontX = x;
        let frontY = y;
        let frontAngle = r;
        let frontLength = 80;
        let frontThick = 50;
        let armThick = 10;
        // Start drawing
        context.save();
            // Move the canvas to draw the front
            context.translate(frontX, frontY);
            context.rotate(frontAngle);
            context.fillStyle = "black";
            context.fillRect(-0.5 * frontLength, -0.5 * frontThick, frontLength, frontThick);
            // Draw four arms and propellers four times
            context.save();
                context.translate(0.5 * (frontLength - armThick), 0.5 * (frontThick - armThick));
                context.rotate(0.25 * Math.PI);
                drawSimpleArm(context, s);
            context.restore();
            context.save();
                context.translate(-0.5 * (frontLength - armThick), 0.5 * (frontThick - armThick));
                context.rotate(0.75 * Math.PI);
                drawSimpleArm(context, s);
            context.restore();
            context.save();
                context.translate(0.5 * (frontLength - armThick), -0.5 * (frontThick - armThick));
                context.rotate(-0.25 * Math.PI);
                drawSimpleArm(context, s);
            context.restore();
            context.save();
                context.translate(-0.5 * (frontLength - armThick), -0.5 * (frontThick - armThick));
                context.rotate(-0.75 * Math.PI);
                drawSimpleArm(context, s);
            context.restore();
        context.restore();
    }

    function animateSimpleCopter()
    {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Update the current angle along the circular path
        a = (a + frontSpeed) % (2 * Math.PI);
        // Compute the location of the front
        x = 0.5 * canvas.width + pathRadius * Math.sin(a);
        y = 0.5 * canvas.height + pathRadius * Math.cos(a);
        // Compute the angle of the front
        // The angle is the arctan of the change in y-coordinates over the change in the x-coordinates
        r = Math.atan((Math.cos(a) - Math.cos(a - frontSpeed)) / (Math.sin(a) - Math.sin(a - frontSpeed)));
        // Update the angle of propeller rotation
        s = (s + propellerSpeed) % (2 * Math.PI);
        drawSimpleCopter(context, x, y, r, s);
        window.requestAnimationFrame(animateSimpleCopter);
    }
    animateSimpleCopter();
}
// End Simple Example Solution

// Begin Bonus Example Solution
// Code copied from Workbook 2
// Get the x-coordinate and y-coordinate relavent to the canvas' top left corner for mouse events
/** @param {MouseEvent} event */
function getX(event) {return event.clientX - event.target.getBoundingClientRect().left;}
/** @param {MouseEvent} event */
function getY(event) {return event.clientY - event.target.getBoundingClientRect().top;}
// This function draws a QuadCopter
function drawQuadCopter(context, state, style)
{
    // Copy the states to local variables
    let frontX = state.x;
    let frontY = state.y;
    let frontAngle = state.r;
    let propellerAngle = state.s;
    // Copy the styles to local variables
    let frontLength = style.l;
    let frontThick = style.w;
    let armLength = style.la;
    let armThick = style.wa;
    let propellerLength = style.lp;
    let propellerThick = style.wp;
    let bodyColor = style.c;
    let armColor = style.ca;
    let propellerBackColor = style.cpb;
    let propellerColor = style.cp;
    // Start drawing
    context.save();
        // Move the canvas to draw the front
        context.translate(frontX, frontY);
        context.rotate(frontAngle);
        context.fillStyle = bodyColor;
        context.fillRect(-0.5 * frontLength, -0.5 * frontThick, frontLength, frontThick);
        // Draw four arms and propellers using a for loop over (-1, -1), (-1, +1), (+1, -1), (-1, -1)
        for (let i = -1; i <= 1; i += 2)
        {
            for (let j = -1; j <= 1; j += 2)
            {
                context.save();
                    // Move the canvas to draw the arms
                    context.translate(i * 0.5 * (frontLength - armThick), j * 0.5 * (frontThick - armThick));
                    context.rotate(j * (2 - i) * 0.25 * Math.PI);
                    context.fillStyle = armColor;
                    context.fillRect(- 0.5 * armThick, - 0.5 * armThick, armLength, armThick);
                    context.save();
                        // Move the canvas to draw the propeller
                        context.translate(armLength - armThick, 0);
                        context.fillStyle = propellerBackColor;
                        context.strokeStyle = bodyColor;
                        // Draw a circle as the background for the propeller
                        context.beginPath();
                        context.arc(0, 0, 0.5 * propellerLength, 0, 2 * Math.PI);
                        // Draw the boundary of the circle if the color is white
                        // Fill the interior of the circle if the color is not white
                        if (propellerBackColor == "white") context.stroke();
                        context.fill();
                        context.rotate(propellerAngle);
                        context.fillStyle = propellerColor;
                        // Draw a rectangle as the propeller
                        context.fillRect(-0.5 * propellerLength, -0.5 * propellerThick, propellerLength, propellerThick);
                    context.restore();    
                context.restore();
            }
        }
    context.restore();
}
// This function draws a Person
function drawPerson (context, state, style)
{
    // Copy the states to local variables
    let headX = state.x;
    let headY = state.y;
    let armAngle = state.r;
    // Copy the styles to local variables
    let personLength = style.l;
    let personThick = style.w;
    let personColor = style.c;
    context.save();
        // Move the canvas to draw the head and body of the Person
        context.translate(headX, headY);
        context.strokeStyle = personColor;
        context.lineWidth = personThick;
        // Draw the head of the Person
        context.beginPath();
        context.arc(0, 0, personLength, 0, 2 * Math.PI);
        context.moveTo(0, personLength);
        // Draw the body of the Person
        context.lineTo(0, personLength * 2);
        context.stroke();
        for (let i = -1; i <= 1; i += 2)
        {
            // Draw the legs of the Person
            context.beginPath();
            context.moveTo(0, personLength * 2);
            context.lineTo(i * personLength, personLength * 3);
            context.stroke();
            context.save();
            // Move the canvas the draw the arms of the Person
            context.translate(0, personLength);
            context.rotate(-armAngle + i * Math.PI / 2 - Math.PI / 4);
            // Draw the arms of the Person
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(personLength * 2, 0);
            context.stroke();
            context.restore();
        }
    context.restore();
}
// This function generates a list of x, y coordinates representing a circular path
function circlePath (pathX, pathY, x, y, r, s)
{
    // Compute the number of steps given the speed
    let nSteps = 2 * Math.PI * r / s;
    // Clear the current path
    pathX.length = 0;
    pathY.length = 0;
    // Add points to the path uniformly along a circle
    for (let i = 0; i < nSteps; i ++)
    {
        pathX[i] = x + r * Math.sin(i * s / r);
        pathY[i] = y + r * Math.cos(i * s / r);
    }
}
// This function generates a list of x, y coordinates representing a linear path
function linePath (pathX, pathY, current, x, y, s)
{
    // Compute the number of steps given the speed
    let dx = pathX[current] - x;
    let dy = pathY[current] - y;
    let dist = Math.sqrt(dx * dx + dy * dy); 
    let nSteps = dist / s;
    // Clear the current path
    pathX.length = 0;
    pathY.length = 0;
    // Add points to the path uniformly along a line
    for (let i = 0; i < nSteps; i ++)
    {
        pathX[i] = x + dx * (1 - i / nSteps);
        pathY[i] = y + dy * (1 - i / nSteps);
    }
}
// Main function
function bonus ()
{
    // somewhere in your program (maybe not here) you'll want a line
    // that looks like:
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("p6bonus"));
    let context = canvas.getContext("2d");
    // Set the speed of the QuadCopter
    let frontSpeed = 2;
    // Set the speed of the propeller
    let propellerSpeed = 0.5;
    // Set the speed of the person's arm waving
    let armSpeed = 0.2;
    // Set the speed of the rotation of QuadCopter
    let rotateSpeed = 0.05;
    // Set the probability of a random Person appearing
    let probPerson = 0.005;
    // Keep track of the current location of each QuadCopter
    let current = [0, 0, 0];
    // Keep track of whether each QuadCopter deviated from its circular motion
    let changePath = [0, 0, 0];
    // Keep track of whether each QuadCopter requires a change in its direction
    let changeAngle = [0, 0, 0];
    // Initialize path control variables
    let pathX = [[], [], []];
    let pathY = [[], [], []];
    // Initialize the state and style variables
    let states = [];
    let styles = [];
    // Set the intial state and style of the Person
    let personStates = {"x":-1, "y":-1, "r":0};
    let personStyles = {"l":5, "w":2, "c":"green"};
    // The QuadCopter flies in a circle at the beginning
    // Set the initial states and styles of the QuadCopters
    for (let i = 0; i < 3; i ++)
    {
        circlePath(pathX[i], pathY[i], canvas.width / 4 * (i + 1), canvas.height / 4 * (i + 1), canvas.width / 8, frontSpeed);
        states[i] = {"x": pathX[i][current[i]], "y": pathY[i][current[i]], "r": 0, "s":0};
    }
    styles[0] = {"l": 80, "w":50, "la":40, "wa":30, "lp":20, "wp":2, "c":"gray", "ca":"gray", "cpb":"aqua", "cp":"gray"};
    styles[1] = {"l": 80, "w":50, "la":20, "wa":10, "lp":40, "wp":5, "c":"green", "ca":"rgba(0,0,0,0)", "cpb":"white", "cp":"green"};
    styles[2] = {"l": 40, "w":25, "la":20, "wa":5, "lp":20, "wp":5, "c":"red", "ca":"green", "cpb":"rgba(0,0,0,0)", "cp":"blue"};
    // These are helper functions to increment and decrement the index by 1
    let incr = function(i, cur) {return (cur[i] + 1) % pathX[i].length};
    let decr = function(i, cur) {return (cur[i] - 1) % pathX[i].length};
    let angle = function(a) {return (a + 2.5 * Math.PI) % Math.PI - 0.5 * Math.PI;}
    // This function adds a person when the mouse is clicked
    function click(x, y)
    {
        // Change the path to a line from the current location to the location of the person
        linePath(pathX[0], pathY[0], current[0], x, y ,frontSpeed);
        // Update the location of the person
        personStates.x = x;
        personStates.y = y;
        changePath[0] = 1;
        current[0] = 1;
        // Rotate the QuadCopter before moving
        changeAngle[0] = states[0].r - Math.atan((pathY[0][1] - pathY[0][0]) / (pathX[0][1] - pathX[0][0]));
        changeAngle[0] = angle(changeAngle[0]);
    }
    // This function moves a QuadCopter responding to key events
    function key(event)
    {
        // Copy the current location
        pathX[1][0] = states[1].x;
        pathY[1][0] = states[1].y;
        current[1] = 0;
        // Change the path to a single point at the current location
        pathX[1].length = 1;
        pathY[1].length = 1;
        // KeyCode = 37 left, 38 up, 39 right, 40 down
        // KeyCode = 65 a, 67 c, 68 d, 69 e, 81 q, 83 s, 87 w, 88 x, 90 z
        let k = event.keyCode;
        // Prevent up, down, left, right keys from move the whole page up, down, left, right
        if ((k > 36 && k < 41) || (k > 64 && k < 91)) event.preventDefault();
        // Move the QuadCopter up, down, left, right according to the key
        if (k == 37 || k == 81 || k == 65 || k == 90) pathX[1][0] -= frontSpeed;
        if (k == 38 || k == 81 || k == 87 || k == 69) pathY[1][0] -= frontSpeed;
        if (k == 39 || k == 69 || k == 68 || k == 67) pathX[1][0] += frontSpeed;
        if (k == 40 || k == 83 || k == 90 || k == 88 || k == 67) pathY[1][0] += frontSpeed;
        // Change the QuadCopter angle according to the key
        if (k == 37 || k == 65 || k == 39 || k == 68) changeAngle[1] = states[1].r - Math.PI;
        else if (k == 38 || k == 87 || k == 40 || k == 83 || k == 88) changeAngle[1] = states[1].r - 0.5 * Math.PI;
        else if (k == 81 || k == 67) changeAngle[1] = states[1].r - 0.25 * Math.PI;
        else if (k == 69 || k == 90) changeAngle[1] = states[1].r - 0.75 * Math.PI;
        changeAngle[1] = angle(changeAngle[1]);
    }
    // This function animates the QuadCopters
    function animateQuadCopter()
    {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the person if there is one and wave its arms
        if (personStates.x >= 0)
        {
            drawPerson(context, personStates, personStyles);
            personStates.r = (personStates.r + armSpeed) % (0.5 * Math.PI);
        }
        // Add a person with small probability if there is no one
        else if (Math.random() < probPerson) click(Math.random() * canvas.width, Math.random() * canvas.height);
        // Draw three QuadCopters
        for (let i = 0; i < 3; i ++)
        {
            // Change the path back to a circle as a QuadCopter reaches a Person
            if (changePath[i] == 1 && current[i] == pathX[i].length - 1) 
            {
                circlePath(pathX[i], pathY[i], pathX[i][current[i]], pathY[i][current[i]] - 100, 100, frontSpeed); 
                // Move the Person out of canvas
                personStates.x = -1;
                personStates.y = -1;
                changePath[i] = 0;
                current[i] = 0;
                // Rotate the QuadCopter before moving
                changeAngle[0] = states[0].r - Math.atan((pathY[0][1] - pathY[0][0]) / (pathX[0][1] - pathY[0][0]));
                changeAngle[0] = angle(changeAngle[0]);
            }
            // Rotate before moving if the currect direction is incorrect
            // If a positive rotation is needed, decrement the angle 
            if (changeAngle[i] > 0)
            {
                states[i].r -= Math.min(changeAngle[i], rotateSpeed);
                changeAngle[i] -= Math.min(changeAngle[i], rotateSpeed);
            }
            // If a negative rotation is needed, increment the angle 
            else if (changeAngle[i] < 0)
            {
                states[i].r += Math.min(-changeAngle[i], rotateSpeed);
                changeAngle[i] += Math.min(-changeAngle[i], rotateSpeed);
            }
            // If the angle is correct, move the QuadCopter
            else
            {
                // Update the location of the QuadCopter according to the next element in the path
                states[i].x = pathX[i][current[i]];
                states[i].y = pathY[i][current[i]];
                // Update the angle of the QuadCopter according to the change between the current and the previous element in the path
                // The angle is the arctan of the change in y-coordinates over the change in the x-coordinates
                if (pathX[i].length > 1) states[i].r = Math.atan((pathY[i][current[i]] - pathY[i][decr(i, current)]) / (pathX[i][current[i]] - pathX[i][decr(i, current)]));
                // Move to the next element in the path
                current[i] = incr(i, current);
            }
            // Update the angle of propeller rotation
            states[i].s = (states[i].s + propellerSpeed) % (2 * Math.PI);
            drawQuadCopter(context, states[i], styles[i]);
        }
        window.requestAnimationFrame(animateQuadCopter);
    }
    // Assign the mouse and key events
    canvas.onclick = event => click(getX(event), getY(event));
    window.onkeydown = event => key(event);
    animateQuadCopter();
}
// End Bonus Example Solution

window.onload = function ()
{
    basic();
    bonus();
};
