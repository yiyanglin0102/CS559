# Page 9-4 - Skyboxes

$s.box
## Box 1: Sky Boxes. Not-Really-Sky-Boxes and THREE

A Sky Box is a big object that surrounds the world on which you put a texture, so the background isn't just a solid color. The idea is that it is infinitely far away (so all regular objects are in front of it).

A Sky Box is not just a big box (or Sphere) around the objects in the world! It needs to do special things to be "infinitely far away".

**Warning: some of this may not make sense since we haven't talked about Z-Buffers in detail yet.**

1. A SkyBox moves with the camera (so you can never get close to/pass through the wall). Think about it: if something is "infinitely far away" then moving towards it doesn't make it get any closer.
2. A SkyBox is drawn with its depth values (for Z-Buffering) to be infinitely far away, so any object drawn is closer than it. Think about it: if something is "infinitely far away" everything that is finite is closer.
3. A SkyBox isn't too huge (because then it might be beyond the far plane of the camera), but it works as if it is infinitely far because it is drawn first and #2. Think about it: "infinitely far" is beyond the "far" distance of the camera, so it wouldn't be drawn unless we did something special.

Unfortunately, most of the example code for THREE  simply make a big cube (or sphere). The first five tutorials I found online for "three.js skybox" all did this. (and I stopped looking after that). But, it turns out that the "correct" approach is built into THREE.

Much of the time, the big textured box (or sphere) approach is OK, as long as you don't move the camera too far, keep your objects close, and have a huge "far" distance for the camera (which creates other issues).

So for this exercise, you can just make a big textured box (or sphere) around your world. The learning goal here is to learn to use a cube map (a texture that wraps around a cube), and then you can just put a big cube with a cube-map texture around the world, so if you keep the camera near the center, it will look as if you have a real sky box. And you probably shouldn't use lighting on the skybox.

A real skybox does three things, which aren't obvious how to do in THREE:

1. Make the box always be centered around the camera.
2. Make it have infinite Z-buffer values (typically this is done by just turning off Z-writing when drawing it, and drawing it first so the clear values are kept)
3. Drawing the object first (with #2) so it appears huge (behind everything) even though it isn't.

Unfortunately, #2 and #3 aren't easy to do in THREE. #2 can be done by writing a custom shader (which we won't get to until next week, or using a hidden parameter), and #3 requires controlling the order of drawing (which goes against the retained mode model).

However, **proper sky boxes are built into three!** It does all of the three things for you. All you need to do is assign a [`CubeTexture`](https://threejs.org/docs/#api/en/textures/CubeTexture) to be the [`background` of the `Scene`](https://threejs.org/docs/#api/en/scenes/Scene.background). For the CS559 Framework, the `Scene` is a property of `GrWorld`.

Of course, confirming that the built in SkyBoxes are really SkyBoxes is hard because it's not well documented. You can look at the THREE.JS source code (file `WebGLBackground.js`, around line 47).

$s.endbox

$s.box
## Box 2: Spheres and Cubes

If you're putting "a box" around the world, you can choose the shape of the box. Since it's infinitely far away (in principle) and covered with texture and not lit, the shape doesn't matter that much. Both spheres and cubes work well. Cylinders are a less common alternative (but were common 20 years ago). There are pros and cons to each shape. But the differences generally do not outweigh the convenience: if your texture is for a cube or sphere, then use that appropriate geometry. It is possible to change textures from one form to another.

By the way, the texture for a shape (like the cube or sphere) that is designed to look right if your head is at the center of the shape (looking outward) in any direction is called an **environment map** because that is the most common usage of such textures. We'll do environment mapping on the next page. However, for now, don't be confused when I call the texture on the inside of a skybox an "Environment Map." And, hopefully you aren't confused that we still call it a box even if it is a sphere or cylinder.

As you might guess, an environment map for a cube is called a *cubic environment map*, an environment map for a sphere is called a *spherical environment map*, etc.

Since you should be curious...

+ `Cubic Environment Maps` are a popular choice because they are easy to author. You just take 6 regular pictures (that fit together. You can do this in the real world by getting a camera with a 90 degree field of view lens, and rotating it on a tripod (getting the up and down views can be hard)). It is really easy in computer graphics to point the camera in 6 directions. Another advantage of cubic environment maps is that it just uses 12, usual triangles (albeit big ones). The down side is that the corners are father away than the centers of the sides which creates sampling issues, so if you're not careful you can see the seams. Sometimes, all 6 faces are put into one image (see Figure 11.25 of the required reading), while other times, the 6 faces are made into 6 separate square images.

+ `Spherical Environment Maps` are a popular choice because all points are the same distance, so the sampling is more uniform. However, there are issues in putting texture coordinates on spheres (things tend to bunch up at the poles if you're not careful). Spherical textures are actually easier than cubic ones to take with a regular camera: you just take a picture of a mirrored ball. Drawing a cubic environment map by approximating the sphere as lot of triangles has some issues - special algorithms exist for spheres.

+ `Cylindrical Environment Maps` (sometimes called Panoramic Maps) are an old choice, that was used in Apple's Quicktime VR product in the mid-1990s. The intuition is that the top of the cylinder (ceiling) and bottom (floor) are usually boring, so we treat them as separate pieces. Then the interesting part of the world you get just by turning on one axis. Cylindrical panoramas are easy to capture (just place the camera on a tripod and turn) and don't have the sampling issues of spheres (there are no poles). However, they don't deal with the top and bottom in a uniform way.

In practice, you probably want to use cubic maps if you are making it yourself (since they look like pictures and are easy to understand). But in THREE, it's easy enough to use spheres or cubes. Understanding the differences between the map types can help you build your intuitions about texturing in general.

If you find an "equirectangular" image (which is basically packing a sphere map into a rectangle on the web, there is a [handy web converter](https://www.360toolkit.co/convert-spherical-equirectangular-to-cubemap)). It can even write out 6 separate image files (except that multi-file download seems to work best in Chrome). Six separate images are useful for THREE.JS's [`CubeTextureLoader`](https://threejs.org/docs/#api/en/loaders/CubeTextureLoader).

The online converter is really handy. There is also an [older page](http://paulbourke.net/miscellaneous/cubemaps/) that talks about some of the issues in conversion. It doesn't provide a free tool.

$s.endbox

$s.box
## Box 3: The Not-Really-A-SkyBox Exercise

Enough things on the web use the term "Sky Box" (but aren't really "Sky Boxes"), that we will let you make "A Big Box with a texture on it that surrounds your world" for this exercise. Just make sure you realize why this isn't really a sky box (which will make for a good exam question).

This is strange because real SkyBoxes are built in (maybe it's a newer feature)? And really easy - just use a `CubeTextureLoader` and connect it to the `Scene`.

Anyway, you can choose which one you want to try.

What you must do: In the scene for this page you must...

1. Put some objects onto the ground plane. (you can use stuff from other exercises, or just some primitives).
2. Put a big box (or sphere) around your world ,or use `Scene.background`.
3. Find (or create) a cubic texture appropriate for a SkyBox, and place it on your big box. Preferably without lighting.

The big part of this (for the assignment) is #3. As described in Box 2, these textures are commonly called `Environment Maps`. The idea is they should seamlessly wrap around so if you are in the box, it is what you would see as you looked around from the center. I recommend that if you find something meant for a Sphere, you convert it to a box.

Don't forget to add the texture to the repo!

The code goes into `4-skybox.js`.
$s.endbox

$s.sumbox
## Summary: Cube Textures

In this exercise, made a skybox (or a kind-of skybox). You also learned to use cube textures. This will be very useful for environment maps on the [next page](5-environment.html).
$s.endbox

<script src="THREE/three.js"></script>
<script src="THREE/OrbitControls.js"></script>
<script src="4-skybox.js" type="module"></script>
