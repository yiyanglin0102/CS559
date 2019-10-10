/* simplest possible fragment shader - just a constant color */
/* but a wrinkle: we pass the color from the javascript program in a uniform */
varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

void main()
{
   gl_FragColor = vec4( abs(sin(v_xyz_world.x * 3.141)),
                        abs(sin(v_xyz_world.z * 3.141)),
                        0,1);
}
