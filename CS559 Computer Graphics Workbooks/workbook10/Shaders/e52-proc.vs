/*
 * Simple Shader for exercise 5-2
 * Simplest vertex shader, except that we add the UV coordinate
 * All we do is pass this to the fragment shader
 *
 * You should not need to change this fragment shader for exercise 5-2,
 * but you can if you want to.
 */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;

/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    // pass the texture coordinate to the fragment
    v_uv = uv;

    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
