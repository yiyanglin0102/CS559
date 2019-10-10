/*jshint esversion: 6 */
// @ts-check

/**
 * Access to THREE's loaders within the CS559 framework
 */

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import {GrObject} from "./GrObject.js";

/**
 * Rescale an object - assumes that the object is a group with 1 mesh in it
 * 
 * @param {THREE.Object3D} obj 
 */
function normObject(obj, scale=1.0, center=true, ground=true) {
    // since other bounding box things aren't reliable
    let box = new T.Box3();
    box.setFromObject(obj);
    // easier than vector subtract
    let dx = box.max.x-box.min.x;
    let dy = box.max.y-box.min.y;
    let dz = box.max.z-box.min.z;
    let size = Math.max(dx,dy,dz);
    let s = scale/size;
    obj.scale.set(s,s,s);

    if (center) {
        obj.translateX( - s * (box.max.x+box.min.x)/2 );
        obj.translateZ( - s * (box.max.z+box.min.z)/2 );
        if (!ground) {  // only center Y if not grounding
            obj.translateY( - s * (box.max.y+box.min.y)/2 );
        }
    }
    if (ground) {
        obj.translateY( - box.min.y * s);
    }
}

/**
 * A base class of GrObjects loaded from an OBJ file
 * note: this has to deal with the deferred loading
 * 
 * Warning: While ObjLoader2 might be better, ObjLoader is simpler
 */
export class ObjGrObject extends GrObject {
    /**
     * 
     * @param {Object} params 
     * @property {string} params.obj
     * @property {string} [params.mtl]
     * @property {Object} [params.mtloptions]
     * @property {Number} [norm] - normalize the object (make the largest dimension this value)
     * @property {Number} [x] - initial translate for the group
     * @property {Number} [y]
     * @property {Number} [z]
     * @property {String} [name]
     */
    constructor(params={}) {
        // check to make sure the libraries are loaded
        if (!T.MTLLoader) {
            alert("Bad HTML: No THREE.MTLLoader");
            throw "No THREE.MTLLoader";
        }
        if (!T.OBJLoader) {
            alert("Bad HTML: No THREE.ObjLoader2");
            throw "No THREE.ObjLoader";
        }

        if (!params.obj) {
            alert("Bad OBJ object - no obj file given!");
            throw "No OBJ given!";
        }

        let name = params.name || "Objfile(UNNAMED)";
        let objholder = new T.Group();

        super(name,objholder); 

        // if there is a material, load it first, and then have that load the OBJ file
        if (params.mtl) {
            let mtloader = new T.MTLLoader();
            if (params.mtloptions) {
                mtloader.setMaterialOptions(params.mtloptions);
            }

            // note that the callback then calls the Obj Loader
            mtloader.load(params.mtl, function(myMaterialCreator) {
                myMaterialCreator.preload();
                let objLoader = new T.OBJLoader();
                objLoader.setMaterials(myMaterialCreator);
                objLoader.load(params.obj,function(obj) {
                    if (params.norm)
                        normObject(obj, params.norm);
                    objholder.add(obj);
                });
            });

        } else {    // no material file, just an obj
            let objLoader = new T.OBJLoader();
            objLoader.load(params.obj,function(obj) {
                if (params.norm)
                    normObject(obj, params.norm);
                objholder.add(obj);
            });
        }
        objholder.translateX(params.x || 0);
        objholder.translateY(params.y || 0);
        objholder.translateZ(params.z || 0);
    }
}

/* load from an FBX file */
export class FbxGrObject extends GrObject {
    /**
     * 
     * @param {Object} [params] 
     * @property {string} params.fbx
     * @property {Number} [norm] - normalize the object (make the largest dimension this value)
     * @property {Number} [x] - initial translate for the group
     * @property {Number} [y]
     * @property {Number} [z]
     * @property {String} [name]
     */
    constructor(params={}) {
        if (!T.FBXLoader) {
            alert("Bad HTML: No FBX Loader");
            throw "No THREE.FBXLoader";
        }
        let name = params.name || "FBXfile(UNNAMED)";
        let objholder = new T.Group();
        super(name,objholder); 

        let fbx = new T.FBXLoader();
        fbx.load(params.fbx, function(obj) {
            if (params.norm)
                normObject(obj, params.norm);
            objholder.add(obj);
        });
        objholder.translateX(params.x || 0);
        objholder.translateY(params.y || 0);
        objholder.translateZ(params.z || 0);
    }
}