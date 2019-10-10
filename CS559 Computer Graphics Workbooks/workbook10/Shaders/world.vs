// world with islands - displacement map based on the green channel

varying vec2 v_uv;
uniform sampler2D colormap;

void main() {
    float height = texture2D(colormap,uv).g;    // get the green value

    vec3 pos = position + height*normal *.4;

    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

    v_uv = uv;
}