# Page 9-5 - Environment Maps

$s.box
## Box 1: Environment Maps

On the previous page, we learned about texture maps that surround objects. On that page, we just looked at them. On this page, we'll use them to fake reflections on objects. This is called **Environment Mapping.** Since all lighting is basically reflections, environment mapping becomes an important method for faking fancy lighting.

We discussed the basic ideas of environment mapping in class. The required reading deals with it briefly in Section 11.4.5 (where they refer to it as *reflection mapping*).

As you should remember from class, the key idea of environment mapping is that we use the normal of the surface to figure out what direction the mirror reflection would be coming from, and then use that direction to look up the color in the environment map. Unlike all of the mapping strategies we've discussed so far, in environment mapping we don't use the UV coordinates from the object: instead we compute the texture coordinates based on the object's normal and the direction of the camera.

Implementing environment maps is tricky because you have to do the computation of the texture coordinate (which depends on the camera, the object position, and the object normal). And then you have to look up the texture in the environment map. Fortunately, THREE implements this for us! All we have to do is use it. (Well, make sure you understand the concepts since you may be asked about them on the exam).
$s.endbox

$s.box
## Box 2: Using an Environment Map

The basic use of an environment is to make a mirrored object. In THREE, this is as simple as using a material that supports Environment Mapping, and using an appropriate texture with it. `MeshStandardMaterial` does this. Even `MeshBasicMaterial` does it.

Read the [documentation](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.envMap). You will need to use a [`CubeTextureMap`](https://threejs.org/docs/#api/en/textures/CubeTexture).

And, as you can guess, you have to do it.

In the example below (`5-environment.js`, if you haven't guessed), put an environment mapped object into the scene. Pick an object that is appropriate for environment mapping (a primitive like a sphere or torus is fine). Find an environment map, or paint one yourself. Be sure to put the images into the repo!

Note: your object will "reflect" what is in the environment map, not what is in the scene (we'll deal with this later). That's OK for this exercise, but it may look silly to have the green ground plane not reflected in the object (so the bottom of the object won't be green). You can just remove the ground plane (`GrWorld` has that option). Even better, paint your textures so the bottom has the green in it, so objects look at if they are properly reflecting the ground plane.

$s.endbox

$s.sumbox
## Summary: Environment Maps

Environment maps are an important way to fake fancy lighting effects using simple rendering.

On the [next page](6-shadows.html), we'll try out shadow maps, which work in a completely different way.

$s.endbox

<script src="THREE/three.js"></script>
<script src="THREE/OrbitControls.js"></script>
<script src="5-environment.js" type="module"></script>
