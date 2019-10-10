# Page 9-3 - Bump and Normal Maps

$s.box
## Box 1: Normal Maps

Normal maps are the concept that we'll use textures to change the *apparent* shape of the object by using the texture to modulate the normals on the surface so it interacts with light differently than it normally would.

We'll discuss the details in class. Normal maps are described very briefly in the required reading (11.4.2).

The basic idea is that the R,G,B channels of the texture map will give us the X,Y,Z direction of the normal vector. However, there is a catch: what X,Y,Z do we use?

The most common way to do normal maps is to define a local coordinate system so that Z is the direction of the "real" normal (so 0,0,1 would be keeping the original normals). This is convenient because it means that blue colors in the normal map mean "keep the normals the same", and everything else represents a change from the object's true shape. The other two directions are the directions of U and V along the surface. This is called *tangent space normal maps*.

THREE supports tangent space normal maps. It also supports "object space normal maps" that just use the XYZ of the object's local coordinate system.

There is one other issue: we want to have normals with negative directions, but we don't have negative colors. So we really use (r-.5,g-.5,b-.5) for x,y,z, and then normalize. So, the "no change - keep the real normal" (0,0,1), is the color 0x8080FF - which is a pale blue. When you see normal maps, they tend to have a lot of this color.

There is an excellent tutorial on normal maps in the [Unity documentation](https://docs.unity3d.com/Manual/StandardShaderMaterialParameterNormalMap.html). They like to call normal maps a kind of bump maps (so height maps, which are a kind of displacement map discussed below, are also bump maps for them). This is different than I have always used the words. But they explain the concepts well with nice examples.


$s.endbox

$s.box
## Box 2: Bump Maps and Normal Maps

The term *bump map* is often used interchangeably with *normal map*, but it really refers to a special kind of normal map that was actually invented first. Historically, bump maps refer to this specific kind of normal map, although some people use bump map as a general term (see the Unity documentation as an example).

Making normal maps is a bit of a pain since you have to create 3-vectors (for the normal direction). It's hard to understand what the colors mean.

Bump maps simplify this. They use only 1 color channel (so the textures have 1 number). The number is interpreted as a height. You could think of the bump map as a height map that alters the surface by pushing it upwards (in the normal direction) at each point. However, it doesn't really change the shape - it just adjusts the normal vectors as if it had this altered shape. The normals (as we would have from a normal map) are computed from the height differences.

Bump maps are very easy to make, since you just paint some bumpiness.

$s.endbox

$s.box
## Box 3: Normal Maps and Displacement Maps

Remember, normal maps (and bump maps) don't change the actual shape, they only change the *apparent* shape by changing the normals, which affect how light interacts with the surface (including reflections).

This has some limitations, including:

1. If you look at things from the side, you'll see the object is not bumpy.
2. There are no self-occlusions.
3. Things like shadows that depend on shape don't see the bumps (since they aren't really there)

There is yet another kind of mapping called **displacement mapping** that is like normal mapping, except that rather than changing the normal, it actually changes the positions/shape (which also affects the normals). Displacement mapping is different than all the other mappings we talk about because it causes things to move: if you compute it for a pixel, that pixel might move to a different place (in which case, it will be a different pixel). With displacement mapping, you need to worry about making holes in things.

From an implementation perspective (coming attractions for class), displacement mapping is implemented very differently. There is displacement mapping in THREE, but it works by moving the vertices of triangles, rather than changing pixel colors. Therefore, you can't use THREE displacement mapping if you have big triangles.

$s.endbox

$s.box
## Box 4: The Normal Map and Bump Map Exercise

Your turn. In the scene below, add two objects. On one of them, put a bump map. On the other one, put a normal map. Try to think of some kind of bumpiness that you'd want to add, and figure out how to make it. It is OK to find textures for this on the web (but be sure to give proper attribution where the textures come from!).

In order to see the effects of the bump and normal maps, you will probably either want your objects or the lights to move, which will make it more obvious that there is bumpiness.

Put the code in `3-normal.js`, and don't forget to add any texture files.
$s.endbox

$s.sumbox
Next, we'll return to textures with colors, but think about a special use of them. The [next page](4-skybox.html) describes Sky Boxes.
$s.endbox

<script src="THREE/three.js"></script>
<script src="THREE/OrbitControls.js"></script>
<script src="3-normal.js" type="module"></script>
