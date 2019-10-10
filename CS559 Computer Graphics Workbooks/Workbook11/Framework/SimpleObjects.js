/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 *
 * Simple Example Objects - they don't do much, but for convenience they
 * provide wrappers around THREE objects
 *
 *
 */

 /** @module SimpleObjects */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

let simpleObjectCounter = 0;

// a simple GrObject - a cube
/**
 * @typedef CubeProperties
 * @type {object}
 * @property {THREE.Material} [material]
 * @property {string | number} [color]
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {number} [widthSegments=8] - only for Sphere
 * @property {number} [heightSegments=6] - only for Sphere
 */
export class GrCube extends GrObject {
    /**
     * @param {CubeProperties} params
     * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
     */
    constructor(params={},paramInfo=undefined) {
        let material;
        if (params.material) {
            material = params.material;
        } else if (params.color) {
            material = new T.MeshStandardMaterial( {color:params.color} );
        } else {
            material = new T.MeshStandardMaterial( {color: "#FF8888"});
        }
        let geom = new T.CubeGeometry(params.size,params.size,params.size);
        let mesh = new T.Mesh(geom, material);
        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this

        super(`Cube-${simpleObjectCounter++}`,mesh,paramInfo);

        // put the object in its place
        mesh.position.x = params.x ? Number(params.x) : 0;
        mesh.position.y = params.y ? Number(params.y) : 0;
        mesh.position.z = params.z ? Number(params.z) : 0;
    }
}

export class GrSphere extends GrObject {
    /**
     * @param {CubeProperties} params
     * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
     */
    constructor(params, paramInfo) {
        let material;
        if (params.material) {
            material = params.material;
        } else if (params.color) {
            material = new T.MeshStandardMaterial( {color:params.color} );
        } else {
            material = new T.MeshStandardMaterial( {color: "#FF8888"});
        }
        let geom = new T.SphereBufferGeometry(params.size ? (params.size   / 2.0) : 1.0,
            params.widthSegments ? params.widthSegments : 8,
            params.heightSegments ? params.heightSegments : 6
        );
        console.log(params.widthSegments);
        
        let mesh = new T.Mesh(geom, material);
        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this

        super(`Sphere-${simpleObjectCounter++}`,mesh,paramInfo);

        // put the object in its place
        mesh.position.x = params.x ? Number(params.x) : 0;
        mesh.position.y = params.y ? Number(params.y) : 0;
        mesh.position.z = params.z ? Number(params.z) : 0;
    }
}

export class GrSquareSign extends GrObject {
    /**
     * 
     * @param {Object} [params] 
     * @param {string | number} [params.color]
     * @param {THREE.Texture} [params.map]
     * @param {THREE.Material} [params.material]
     * @param {number} [params.x]
     * @param {number} [params.y]
     * @param {number} [params.z]
     * @param {number} [params.size]
     * @param {Array<string|Array>} [paramInfo ]
     */
    constructor(params={},paramInfo=[]) {
        // make a square out of triangles
        let geom=new T.Geometry();
        let size = params.size || 0.5;
        geom.vertices.push(new T.Vector3(-size,-size,0)); let uv0=new T.Vector2(0,0);
        geom.vertices.push(new T.Vector3( size,-size,0)); let uv1=new T.Vector2(1,0);
        geom.vertices.push(new T.Vector3(-size, size,0)); let uv2=new T.Vector2(0,1);
        geom.vertices.push(new T.Vector3( size, size,0)); let uv3=new T.Vector2(1,1);
        geom.faces.push(new T.Face3(0,1,2));
        geom.faces.push(new T.Face3(1,3,2));
        geom.computeFaceNormals();
        geom.faceVertexUvs = [ [[uv0, uv1, uv2], [uv1,uv3,uv2]] ];
        let material;
        if (params.material) {
            material = params.material;
        } else {
            let matprops = { side: T.DoubleSide };
            matprops.color = params.color ? params.color : 0xFFFFFF;
            if (params.map) matprops.map = params.map;
            material = new T.MeshStandardMaterial(matprops);
            console.log(matprops);
        }
        let mesh = new T.Mesh(geom,material);
        super(`SquareSign-${simpleObjectCounter++}`,mesh,paramInfo);
        // put the object in its place
        mesh.position.x = params.x ? Number(params.x) : 0;
        mesh.position.y = params.y ? Number(params.y) : 0;
        mesh.position.z = params.z ? Number(params.z) : 0;
    }
}

export class GrTorusKnot extends GrObject {
    /**
     * @param {Object} [params]
     * @param {string | number} [params.color]
     * @param {THREE.Material} [params.material]
     * @param {number} [params.x]
     * @param {number} [params.y]
     * @param {number} [params.z]
     * @param {number} [params.size]
     * @param {Array<string|Array>} [paramInfo] - parameters for the GrObject (for sliders)
     */
    constructor(params = {}, paramInfo = []) {
        let material;
        if (params.material) {
            material = params.material;
        } else if (params.color) {
            material = new T.MeshStandardMaterial( {color:params.color} );
        } else {
            material = new T.MeshStandardMaterial( {color: "#FF8888"});
        }
        let geom = new T.TorusKnotBufferGeometry();
        let mesh = new T.Mesh(geom, material);
        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this

        super(`TorusKnot-${simpleObjectCounter++}`,mesh,paramInfo);

        // put the object in its place
        mesh.position.x = params.x ? Number(params.x) : 0;
        mesh.position.y = params.y ? Number(params.y) : 0;
        mesh.position.z = params.z ? Number(params.z) : 0;

        // set size by scaling
        let size = params.size || 1.0;
        mesh.scale.set(size,size,size);
    }
}
