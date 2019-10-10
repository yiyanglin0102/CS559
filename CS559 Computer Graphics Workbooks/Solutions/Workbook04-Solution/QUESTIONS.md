# Questions for Workbook 4

In order to have pictures and equations in the questions, the questions are in [8-Questions.html](8-Questions.html), but please put your answers here. The brief versions of the questions in this file won't make sense unless you read [8-Questions.html](8-Questions.html).

## Question 1: Give expressions for dx,dy,ex,ey,fx, and fy as functions of cx,cy,sx,sy

dx = (1 - sx) cx, 
dy = (1 - sy) cy, 
ex = sx, 
ey = sy, 
and, 
fx = sx, 
fy = sy,
gx = (1 / sx - 1) cx, 
gy = (1 / sy - 1) cy.

## Question 2: Give the matrix (9 numbers, row-major order) for the answer to question 1

[sx, 0, (1 - sx) cx; 0, sy, (1 - sy) cy; 0, 0, 1].

## Question 3: Write the formula for the middle square of the result matrix `c=a*b` when matrices are row major arrays.

c[4] = a[3] * b[1] + a[4] * b[4] + a[5] * b[7].

## Question 4: Write the matrix (9 numbers, in row major form) for the transformation in the picture.

[3, 1, 1; 1, 3, 2; 0, 0, 1].

## Question 5: Write the matrix (9 numbers, in row major form) for the transformation in the picture.

[2, 2, 2; 2, -2, 3; 0, 0, 1].

## Question 6: Write the JavaScript code for the transformation in the picture of Question 5. All you need to give are rotate, translate and scale commands.

# TRS
context.translate(2, 3);
context.rotate(Math.PI / 4);
context.scale(2 Math.sqrt(2), -2 Math.sqrt(2));

# TSR
context.translate(2, 3);
context.scale(2 Math.sqrt(2), -2 Math.sqrt(2));
context.rotate(-Math.PI / 4);

# RST
context.rotate(Math.PI / 4);
context.scale(2 Math.sqrt(2), -2 Math.sqrt(2));
context.translate(5 / 4, -1 / 4);

# SRT
context.scale(2 Math.sqrt(2), -2 Math.sqrt(2));
context.rotate(-Math.PI / 4);
context.translate(5 / 4, -1 / 4);

# RTS
context.rotate(Math.PI / 4);
context.translate(5 * Math.sqrt(2) / 2, Math.sqrt(2) / 2);
context.scale(2 Math.sqrt(2), -2 Math.sqrt(2));

# STR
context.scale(2 Math.sqrt(2), -2 Math.sqrt(2));
context.translate(Math.sqrt(2) / 2, -3 * Math.sqrt(2) / 2);
context.rotate(-Math.PI / 4);



