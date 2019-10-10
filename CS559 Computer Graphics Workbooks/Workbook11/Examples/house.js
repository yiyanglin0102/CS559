/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Houses: adapted from the original C++ Graphics Town
 */

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

// we need the GrObject
import { GrObject } from "../Framework/GrObject.js";
 
function uvTri(u1,v1,u2,v2,u3,v3) {
    return [new T.Vector2(u1,v1), new T.Vector2(u2,v2), new T.Vector2(u3,v3)]
}

/** Global (module) variables for simple Houses */
let simpleHouseCount = 0;
let simpleHouseGeometry;    // one geometry for all
let simpleHouseTexture;
let simpleHouseMaterial;
export class SimpleHouse extends GrObject {
    constructor(params={}) {
        if (!simpleHouseGeometry) {
            let w = 2;
            let h = 2;
            let d = 3;
            let r = 1;
            simpleHouseGeometry = new T.Geometry();
            // front vertices
            simpleHouseGeometry.vertices.push(new T.Vector3(  0,   0, 0));
            simpleHouseGeometry.vertices.push(new T.Vector3(  w,   0, 0));
            simpleHouseGeometry.vertices.push(new T.Vector3(  w,   h, 0));
            simpleHouseGeometry.vertices.push(new T.Vector3(  0,   h, 0));
            simpleHouseGeometry.vertices.push(new T.Vector3(w/2, h+r, 0));
            // back vertices
            simpleHouseGeometry.vertices.push(new T.Vector3(  0,   0, d));
            simpleHouseGeometry.vertices.push(new T.Vector3(  w,   0, d));
            simpleHouseGeometry.vertices.push(new T.Vector3(  w,   h, d));
            simpleHouseGeometry.vertices.push(new T.Vector3(  0,   h, d));
            simpleHouseGeometry.vertices.push(new T.Vector3(w/2, h+r, d));
            // front surface
            simpleHouseGeometry.faces.push(new T.Face3(0,1,2));
            simpleHouseGeometry.faces.push(new T.Face3(0,2,3));
            simpleHouseGeometry.faces.push(new T.Face3(3,2,4));
            // back surface
            simpleHouseGeometry.faces.push(new T.Face3(6,5,7));
            simpleHouseGeometry.faces.push(new T.Face3(5,8,7));
            simpleHouseGeometry.faces.push(new T.Face3(8,9,7));
            // right side
            simpleHouseGeometry.faces.push(new T.Face3(1,6,2));
            simpleHouseGeometry.faces.push(new T.Face3(6,7,2));
            // left side
            simpleHouseGeometry.faces.push(new T.Face3(5,0,3));
            simpleHouseGeometry.faces.push(new T.Face3(5,3,8));
            // roof
            simpleHouseGeometry.faces.push(new T.Face3(2,7,4));
            simpleHouseGeometry.faces.push(new T.Face3(7,9,4));
            simpleHouseGeometry.faces.push(new T.Face3(3,4,8));
            simpleHouseGeometry.faces.push(new T.Face3(8,4,9));
            // texture coords
            let tfaces = [];
            tfaces.push(uvTri(0,0, .25,0, .25,.25));        // front
            tfaces.push(uvTri(0,0, .25,.25, 0,.25));
            tfaces.push(uvTri(0,.25, .25,.25, 0,.5));  

            tfaces.push(uvTri(.25,0, 0,0, 0.25,.25));        // back
            tfaces.push(uvTri(0,0, 0,.25, .25,.25));
            tfaces.push(uvTri(0,.25, .25,.25, 0,.5));

            tfaces.push(uvTri(.25,0, .5,0, .25,.25));
            tfaces.push(uvTri(.5,0, .5,.25, .25,.25));

            tfaces.push(uvTri(.5,0, .25,0, .25,.25));
            tfaces.push(uvTri(.5,0, .25,.25, .5,.25));

            tfaces.push(uvTri(0,.5, 1,.5, 0,1));
            tfaces.push(uvTri(1,.5,1,1,0,1));

            tfaces.push(uvTri(0,.5, 0,1, 1,.5));
            tfaces.push(uvTri(1,.5, 0,1, 1,1));
            // now make the normals
            simpleHouseGeometry.computeFaceNormals();
            simpleHouseGeometry.faceVertexUvs = [ tfaces ]
        }
        if (!simpleHouseTexture) {
            simpleHouseTexture = new T.TextureLoader().load("./Examples/house.png");
        }
        if (!simpleHouseMaterial) {
            simpleHouseMaterial = new T.MeshStandardMaterial({
                color:"white",
                map:simpleHouseTexture,
                roughness:1.0,
                side:T.DoubleSide});
        }
        let mesh = new T.Mesh(simpleHouseGeometry,simpleHouseMaterial);
        mesh.translateX(params.x || 0);
        mesh.translateY(params.y || 0);
        mesh.translateZ(params.z || 0);
        super(`SimpleHouse-${++simpleHouseCount}`,mesh);
    }
}