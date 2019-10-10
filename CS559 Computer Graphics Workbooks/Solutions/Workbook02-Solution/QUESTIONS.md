# Questions file for Workbook 1

Please leave the headings (lines with ##) intact. Please put your answers on a line after the questions.

Please give short answers - a sentence or two is sufficient (in some cases one word is sufficient).

## How do you draw a circle in Canvas?

Use arc(x, y, r, 0, 2 * Math.PI).

## Can you use CSS to style SVG Circles?

Yes.

## Can you use CSS to style Canvas Circles?

No.

## When using canvas, why do we need to use events to figure out where the mouse is, even if we are polling the mouse position in an event loop?

It is so that the animation and mouse events can happen at the same time.

## What does the line with "filter" near the bottom of A02_p4.js do? What would happen if you removed it?

Filter removes the dots that outside the canvas from the list. Nothing would happen except there will be wasteful computation for dots that are not displayed on canvas anyways.
