# Page 9-2 - Material Property Maps

$s.box
## Material Property Maps

Up until now, we've only been using texture to change colors. However, we can use a texture to control just about any property of a material. If you look at the documentation for `MeshStandardMaterial`, you can see a lot of the things we control about materials (like roughness, emission, and metalness) can be controlled with a map as well instead of giving a single value for the entire object.

For this exercise, pick one (or more) of those properties, and make a map that controls the property over the object. You need to make something where it is obvious what is going on. This means created a texture with variation, having an appropriate object to show (a primitive like a sphere is often good enough), and maybe some adjustments to the lighting.

Note: to show that you haven't just changed the colors, you probably want to make either the light or the object move (with animation).

You will probably want to create your own texture map. Make sure you include it in the repository.

$s.endbox

$s.sumbox
## Summary: Material Property Maps

Material property maps are a simple kind of map. We'll talk about variants of normal maps on the [next page](3-normal.html).
$s.endbox

<script src="THREE/three.js"></script>
<script src="THREE/OrbitControls.js"></script>
<script src="2-materials.js" type="module"></script>  
