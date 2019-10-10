# Questions file for Workbook 1

Please leave the headings (lines with ##) intact. Please put your answers on a line after the questions.

Please give short answers - a sentence or two is sufficient (in some cases one word is sufficient).

Note: this file is not indended to be MarkDown - I just use the "##" to denote questions.

## 1 - Reversing the order of translate and scale

We saw that reversing the order of a translate and scale changes the transformation.

However, if you reverse the order, there is an equivalent transformation - it will just have different values for the parameters.

That is, if we have:

    context.translate(x,y)
    context.scale(s,s)

It is equivalent to:
    context.scale(r,r);
    context.translate(u,v);

Given x,y, and s, give expressions for u,v, and r.


## 2- What does this do? (1)

In A05-5-hierarchy.js, there is an expression that appears twice:
    sliders.map(slider => Number(slider.value))

What does this do?

## 3- What does this do? (2)

In A05-5-hierarchy.js, there is a line:
    points.slice(1).forEach( pt => context.lineTo(pt[0],pt[1]));

What does this do?
(if it's easier to explain it by re-writing it as a for loop, that's acceptable)

## 4- Reading SVG

At the end of many tags, we see a slash (e.g. `/>`) - what does it mean?

## 5 - Combining transformations (1)

The following 3 lines of code could be re-written as a single line:
    context.scale(a,b);
    context.scale(c,c);
    context.scale(d,e);

What would that single line be? (it would have equivalent functionality)

## 6 - Combining transformations (2)

The following 3 lines of code could be re-written as a single line:
    context.rotate(a);
    context.rotate(b);
    context.rotate(c);

What would that single line be? (it would have equivalent functionality)

## 7 - Combining transformations (3)

The following 3 lines of code could be re-written as two lines:
    context.scale(a,a);
    context.translate(x,y);
    context.scale(b,b);

What would those two lines be? There are two solutions.
