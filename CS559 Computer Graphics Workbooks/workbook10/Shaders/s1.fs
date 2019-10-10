/* simplest possible fragment shader - just a constant color */
/* but a wrinkle: we pass the color from the javascript program in a uniform */
uniform vec3 color;

void main()
{
    gl_FragColor = vec4(color,1);
}
