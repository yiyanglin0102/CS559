
/*jshint esversion: 6 */
// @ts-check

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

// get things we need
import { GrWorld } from "./Framework/GrWorld.js";
import { GrObject } from "./Framework/GrObject.js";
import * as InputHelpers from "./Libs/inputHelpers.js";
import * as Helpers from "./Libs/helpers.js";

class TwoTriangles extends GrObject {
    constructor() {
        let geometry = new T.Geometry();
        //
        geometry.vertices.push(new T.Vector3(-1,1,-1));
        geometry.vertices.push(new T.Vector3( 0,0, 0));
        geometry.vertices.push(new T.Vector3( 0,2, 0));
        geometry.vertices.push(new T.Vector3( 1,1,-1));
        //
        let f1 = new T.Face3(0,1,2);
        geometry.faces.push(f1);
        let f2 = new T.Face3(1,3,2);
        geometry.faces.push(f2);
        geometry.computeFaceNormals();
        //
        let material = new T.MeshStandardMaterial({color:"yellow",roughness:0.75});
        let mesh = new T.Mesh(geometry,material);
        //
        super("TwoTriangles1",mesh);
    }
}

class TwoColoredTriangles extends GrObject {
    constructor() {
        let geometry = new T.Geometry();
        //
        geometry.vertices.push(new T.Vector3(-1,1,-1));
        geometry.vertices.push(new T.Vector3( 0,0, 0));
        geometry.vertices.push(new T.Vector3( 0,2, 0));
        geometry.vertices.push(new T.Vector3( 1,1,-1));
        //
        let f1 = new T.Face3(0,1,2);
        f1.color.setStyle("yellow");
        geometry.faces.push(f1);
        let f2 = new T.Face3(1,3,2);
        f2.color.setStyle("orange");
        geometry.faces.push(f2);
        geometry.computeFaceNormals();
        //
        let material = new T.MeshStandardMaterial({roughness:0.75, vertexColors:T.VertexColors});
        let mesh = new T.Mesh(geometry,material);
        super("TwoTriangles1",mesh);
    }
}

class TwoGradientTriangles extends GrObject {
    constructor() {
        let geometry = new T.Geometry();
        //
        geometry.vertices.push(new T.Vector3(-1,1,-1));
        geometry.vertices.push(new T.Vector3( 0,0, 0));
        geometry.vertices.push(new T.Vector3( 0,2, 0));
        geometry.vertices.push(new T.Vector3( 1,1,-1));
        //
        let f1 = new T.Face3(0,1,2);
        f1.vertexColors[0] = new T.Color("red");     // 0
        f1.vertexColors[1] = new T.Color("yellow");  // 1
        f1.vertexColors[2] = new T.Color("white");   // 2
        geometry.faces.push(f1);
        let f2 = new T.Face3(1,3,2);
        f2.vertexColors[0] = new T.Color("yellow");  // 1
        f2.vertexColors[1] = new T.Color("green");   // 3
        f2.vertexColors[2] = new T.Color("white");
        geometry.faces.push(f2);
        geometry.computeFaceNormals();
        //
        let material = new T.MeshStandardMaterial({roughness:0.75, vertexColors:T.VertexColors});
        let mesh = new T.Mesh(geometry,material);
        super("TwoTriangles1",mesh);
    }
}


function shift(grobj,x) {
    grobj.objects[0].translateX(x);
    return grobj;
}

function test() {
    let mydiv = document.getElementById("color-tris");

    let box = InputHelpers.makeBoxDiv({width:mydiv ? 640:820},mydiv);
    if (!mydiv) {
        InputHelpers.makeBreak();   // sticks a break after the box
    }
    InputHelpers.makeHead("Three Different Colorings",box);

    let world = new GrWorld({width:mydiv ? 600:800, where:box});
    let tt = shift(new TwoTriangles(), -3);
    world.add(tt);

    let t2 = shift(new TwoColoredTriangles(), 0);
    world.add(t2);

    let t3 = shift(new TwoGradientTriangles(), 3);
    world.add(t3);

    let div = InputHelpers.makeBoxDiv({},box);

    let sl = new InputHelpers.LabelSlider("ry", {min:-2,max:2,where:div});

    InputHelpers.makeBreak(box);

    sl.oninput = function(evt) {
        let v = sl.value();
        tt.objects[0].rotation.y = v;
        t2.objects[0].rotation.y = v;
        t3.objects[0].rotation.y = v;
    };

    world.go();
}
Helpers.onWindowOnload(test);

