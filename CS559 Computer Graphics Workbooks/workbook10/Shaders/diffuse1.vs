/*
 * Simplest vertex shader for diffuse lighting
 */

 /* Provided by THREE: (see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram)
  */

varying vec3 v_normal;

void main() {
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    // compute the normal and pass it to fragment
    v_normal = normalMatrix * normal;

}