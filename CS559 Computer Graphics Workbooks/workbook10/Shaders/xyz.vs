/*
 * Simple vertex shader for procedural textures using XYZ coordinates 
 */

 /* Provided by THREE: (see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram)
  */

varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

void main() {
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    v_xyz_local = position;
    v_xyz_world = (modelMatrix * vec4( position, 1.0 )).xyz;

}