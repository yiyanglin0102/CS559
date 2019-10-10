# Page 9-6 - Shadow Maps

$s.box
In class, we'll learn how shadow maps work. (maybe not before this workbook is due). Fortunately, you don't have to implement them (there are some tricky details), since they are build into THREE.

Shadow maps are different than other kinds of maps. They are pictures made from cameras positioned at the light sources. We don't use them for colors (or surface properties), we use them for depth testing (to see if the camera at the light source can see each point in the scene). The lookups are depth tests that turn light on and off. This will be explained in class, and is discussed in Section 11.4.4 of the required reading.

Implementing shadow maps can be tricky. Fortunately, they are built into THREE.

THREE makes it pretty easy to use shadow maps. All you need to do is:

1. Make sure that your renderer has `shadowMapEnabled` set to true.
2. Make sure that you set the appropriate properties for objects. Some objects should cast shadows, and some objects should receive shadows. You need to use the `castShadow` and `receiveShadow` of objects.
3. Make sure your lights are set to `castShadow`. It's easiest to use shadows with spot lights (for reasons we'll discuss in class).

That's pretty much it. There are plenty of parameters and options you can tune to make things look the way you want.

For this exercise, all you need to do is make shadows in the scene below. Note: you'll have to make your own spotlight. You are welcome to remove my objects and put in your own. The file is `6-shadows.js`. Of course, you can use this as an opportunity to experiment with more lights and shadows.

After you've done this exercise, go on to the [last page of the workbook](7-multipass.html).
$s.endbox

<script src="THREE/three.js"></script>
<script src="THREE/OrbitControls.js"></script>
<script src="6-shadows.js" type="module"></script>
