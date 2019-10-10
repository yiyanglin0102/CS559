/* simplest possible fragment shader - just a constant color */
/* but a wrinkle: we pass the color from the javascript program in a uniform */
varying vec3 v_normal;

// note that this is in VIEW COORDINATES
const vec3 lightDir = vec3(0,0,1);
const vec3 baseColor = vec3(1,.8,.4);

void main()
{
    // we need to renormalize the normal since it was interpolated
    vec3 nhat = normalize(v_normal);

    // deal with two sided lighting
    float light = abs(dot(nhat, lightDir));

    // brighten the base color
    gl_FragColor = vec4(light * baseColor,1);
}
