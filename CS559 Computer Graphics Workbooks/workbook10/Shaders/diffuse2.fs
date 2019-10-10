/* simplest possible fragment shader - just a constant color */
/* but a wrinkle: we pass the color from the javascript program in a uniform */
varying vec3 v_normal;

// note that this is in WORLD COORDINATES
const vec3 lightDirWorld = vec3(0,1,0);
const vec3 baseColor = vec3(1,.8,.4);

void main()
{
    // we need to renormalize the normal since it was interpolated
    vec3 nhat = normalize(v_normal);

    // get the lighting vector in the view coordinates
    // warning: this is REALLY wasteful!
    vec3 lightDir = normalize( viewMatrix * vec4(lightDirWorld,0) ).xyz;

    // deal with two sided lighting
    float light = abs(dot(nhat, lightDir));

    // brighten the base color
    gl_FragColor = vec4(light * baseColor,1);
}
