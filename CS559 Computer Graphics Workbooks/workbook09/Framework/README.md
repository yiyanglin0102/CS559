## CS559 3D Framework (a.k.a. "Graphics Town")

This directory contains framework code to be used for the assignments for the
CS559 (Computer Graphics) class at the University of Wisconsin.

It provides a thin wrapper around the [THREE.JS](https://threejs.org/) library to make
it more convenient to do class assignments.

This version starts with the 2019 re-write of the code.
There was a prior 2015 version (in "non-modern" JavaScript) that was used from 2015-2018.
There were even older versions in C++, beginning from 2000, with the last C++ versin in 2014.

If you want to read about the history of Graphics Town (prior to 2014) and see what the old C++ version was like, read [this](http://graphics.cs.wisc.edu/WP/cs559-fall2014/2014/11/07/project-2-graphics-town-framework-code/). If you want to see the original JavaScript framework, you can look [here](http://graphics.cs.wisc.edu/WP/cs559-fall2015/2015/10/15/project-program-group-2-graphics-town/) for a description. Yes, that really was all the documentation we gave to students.

**WARNING:** This documentation is created using JSDoc, and I am not a JSDoc expert. You should also read the code directly. There may also be version skew between the documentation and the code. Trust the code.

### What you really want to know

Most of the work that you will do (as a student) will be creating subclasses of `GrObject` to make new kinds of objects for the world. You should make sure you understand how `GrObject` works. You can see examples in `SimpleObjects` and `TestObjects`. Even more examples are provided with the assignments.

### Some important details

1. The framework code assumes that THREE.JS (and the Orbit Controls) are loaded as a global namespace **before** the modules that use it are accessed. So, before loading "myfile.js" (which should be a module), you need to do:

~~~~html
<script src="THREE/three.js"></script>
<script src="THREE/OrbitControls.js"></script>
<script src="8-graphicspark.js" type="module"></script>
~~~~

2. Because you need to have the objects when the `GrObject` is created, this can be a problem if you don't have the object immediately (for example, if you are loading an obj file). The best way to deal with this is to create a THREE `Group` object when the `GrObject` is created and then add the new object to the group. Even better: put a temporary object into the group, and replace it with the new object when it is loaded. Here is a simple example (using `sleep` rather than a real loader, but it's the same delayed execution thing). Beware of the non-lexical `this` (you can't use `this` in the deferred function). What this example does is create an Object that is a cube initially, but changes to a TorusKnot after 2 seconds.

~~~~javascript
export class BetterDelayTest extends GrObject {
    constructor() {
        let group = new T.Group();
        super("Delay-Test", group);
        this.group = group;
        // make a cube that will be there temporarily
        let tempCube = new T.Mesh(new T.BoxGeometry(), new T.MeshStandardMaterial());
        group.add(tempCube);
        // use sleep, rather than OBJ loader
        sleep(2000).then(function() {
            group.remove(tempCube);
            group.add(new T.Mesh(new T.TorusKnotGeometry(), new T.MeshStandardMaterial({color:"purple"})));
        });
    }
}
~~~~