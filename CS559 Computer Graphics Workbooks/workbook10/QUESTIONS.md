# Questions for Workbook 10

For this workbook, we won't grade the questions. You don't need to turn them in.

However, we are giving you some things to think about so you can make sure you understand the concepts (which are easy to overlook when you are focusing on programming).

## Q: Variables

GLSL has several different "qualifiers" for variables: none, const, attribute, uniform, varying.

+ What is the difference?
+ What is each type used for?
+ Which type of shader uses each one?
+ Which ones are used in your host program to communicate with the shaders?

## Q: Inputs and Outputs

GLSL "programs" (shaders) communicate by receiving and sending data through special variables.

You can see the complete list of built in ones on the GLSL ES reference card (https://www.khronos.org/opengles/sdk/docs/reference_cards/OpenGL-ES-2_0-Reference-card.pdf).

What are the minimum inputs and outputs of a vertex shader? Why do we need these?

What are the minimum inputs and outputs of a fragment shader? Why do we need these?

## Q: Aliasing

What causes the jaggies in the procedural shading programs?

Why are the derivative computations useful in anti-aliasing these programs?


## Q: Displacement Maps vs Normal/Bump Maps

When we talked about texturing, we learned about displacement maps, which really change the geometry, vs. Normal or Bump maps, which only change the appearance of the surface without moving it.

Why is it difficult (impossible?) to implement displacement maps in a fragment program? Why is it easier to implement a Normal or Bump map in the fragment shader?

Why does the square in Box 7-2 look flat? (hint: the square is made up of 2 triangles).

## Q: Terminology

Why are **fragments** different than **pixels**?

When we discussed meshes, we talked about *splitting vertices*. Why must split vertices be processed as separate vertices?

What is a swizzle? (in GLSL)
