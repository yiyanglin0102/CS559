// declare the varying variable that gets passed to the fragment shader
 varying vec2 v_uv;

void main()
{
    gl_FragColor = vec4(v_uv, .5,1);
}
