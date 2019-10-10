/*
 * Simplest possible vertex shader
 */

 /* Provided by THREE: (see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram)
uniform mat4 modelViewMatrix;
attribute vec3 position;
  */

/* In this example (S1) there is a uniform from our program (color), but
 * we don't need it in the vertex shader
 */
/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}