# Questions file for Workbook 1

Please leave the headings (lines with ##) intact. Please put your answers on a line after the questions.

Please give short answers - a sentence or two is sufficient (in some cases one word is sufficient).

## What Editor / IDE did you use for this assignment?

I used VSCode.

## Why did we need to place a span in the first paragraph of page three box 1?

The span is placed so that it has an id which JavaScript can use to refer to it.

## What is different between the two sliders in Box 4 of page three?

(1) They have different names; (2) The first slider updates on change and the second slider updates on input.

## What does the first line of the "makeBlink" in file three.js do? (hint: this is a common JavaScript idiom)

The line is used to make sure rate is not 0 and change the rate to 250 in case it is.
This is the "old" way to do default parameters in JavaScript.

## In the "makeBlink" function in file three.js, there is a percent sign (%) in the assignment to backgroundColor. Why?

The percent sign is modular division, it makes sure that we don't go off the end of the array, causing the accesses to wrap around instead.

## What Editor / IDE did you use for this assignment?

The percent sign is used to mod lastBlinkColor to an integer between 0 and the length of the array blinkColors minus 1.
