/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 * 
 * Test Objects - these examples are for use in testing the framework
 * and are less generally useful
 *  
 */

 /** @module TestObjects */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";

// a global variable to keep track of how many objects we create
// this allows us to give unique names
let testobjsctr = 0;

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

function degreesToRadians(deg) {
    return deg * Math.PI / 180;
}

/**
 * A simple object that is like a dump truck (with a hinge), but just made of 
 * boxes.
 * A simple way to test a parametric object
 */
export class HingeCube extends GrObject {
    constructor() {
        let group = new T.Group();
        let box = new T.BoxGeometry(1,0.5,1);
        let mesh1 = new T.Mesh(box,new T.MeshStandardMaterial({color:0xA0A000}));
        mesh1.position.y = 0.25;
        group.add(mesh1);

        let mesh2 = new T.Mesh(box,new T.MeshStandardMaterial({color:0xFFFF00}));
        // set group with origin at pivot point
        let g2 = new T.Group();
        g2.position.set(0,0.5,-0.5);
        g2.add(mesh2);
        mesh2.position.y = 0.25;
        mesh2.position.z = 0.5;
        group.add(g2);

        super(`DumpCube-${testobjsctr++}`,group,
              [ ['x',-5,5,2],['z',-5,5,2],['theta',-180,180,0],
                ['tilt',0,90,0]
              ]);
        
        this.group = group;
        this.mesh1 = mesh1;
        this.mesh2 = mesh2;
        this.g2 = g2;
    }

    update(paramValues) {
        this.group.position.x = paramValues[0];
        this.group.position.z = paramValues[1];
        this.group.rotation.y = degreesToRadians(paramValues[2]);
        this.g2.rotation.x = degreesToRadians(-paramValues[3]);
    }
}


// for faking deferred loading
// from https://flaviocopes.com/javascript-sleep/
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/**
 * test for an object that is created slowly (like loading an OBJ)
 * 
 * the catch is that we need to have an object to install in the world
 * (since we can't defer that), but we don't have "the" object
 * 
 * the trick: make a Group - when the deferred object finally arrives,
 * stick it in the group
 * 
 * here, we fake OBJ loading with sleep
 */
export class DelayTest extends GrObject {
    constructor() {
        let group = new T.Group();
        super("Delay-Test", group);
        this.group = group;
        // use sleep, rather than OBJ loader
        sleep(1500).then(function() {
            group.add(new T.Mesh(new T.TorusKnotGeometry(), new T.MeshStandardMaterial({color:"red"})));
        });
    }
}
  
/**
 * Better delayed object - put a proxy object in its place, and then remove it
 */
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

/**
 * test for changing an object's material
 */
export class MaterialDelayTest extends GrObject {
    constructor() {
        let group = new T.Group();
        super("Delay-Test", group);
        this.material = new T.MeshStandardMaterial({color:"white"});
        this.geometry = new T.TorusGeometry();
        this.mesh = new T.Mesh(this.geometry,this.material);
        let self=this;
        group.add(this.mesh);
        group.position.x = -3;
        // use sleep, rather than OBJ loader
        sleep(1000).then(function() {
            // note: we can't use "this" because this isn't lexically scoped
            self.material.setValues({color:"red"});
            self.material.needsUpdate = true;
        });
    }
}

class CheckSign extends GrObject {
    /**
     * 
     * @param {Object} props
     * @param {number} [props.checks=4] - number of squares per side
     * @param {string} [props.colortype="vertex"] - vertex,face,none
     * @param {number} [props.x]
     * @param {number} [props.y]
     * @param {number} [props.z]
     * @param {number} [props.scale=1]
     * @param {THREE.Color | string | Number} [props.materialcolor]
     */
    constructor(props) {
        let group = new T.Group();
        super("CheckSign1",group);

        let geometry = new T.Geometry();

        let nchecks = props.checks | 4;
        let nverts = nchecks+1;
        let scale = (props.scale > 0.0001) ? props.scale : 1;        // disallow 0

        let colortype;
        switch (props.colortype && props.colortype[0]) {
            case 'v':
                colortype = T.VertexColors;
                break;
            case 'f':
                colortype = T.FaceColors;
                break;
            case 'n':
                colortype = T.NoColors;
                break;
            default:
                console.log(`no or bad colortype - assuming vertex`);
                colortype = T.VertexColors;
        }


        for(let i=0;i<nverts+1;i++) {
            for (let j=0; j<nverts; j++) {
                geometry.vertices.push(new T.Vector3(i,j,0));
            }
        }
        for(let i=0; i<nchecks; i++) {
            for (let j=0; j<nchecks; j++) {
                let f1 = new T.Face3(i*nverts+j,i*nverts+j+1,(i+1)*nverts+j);
                let f2 = new T.Face3(i*nverts+j+1,(i+1)*nverts+j+1,(i+1)*nverts+j);

                f1.color = new T.Color("red");
                f2.vertexColors[0] = new T.Color(1,0,0);
                f2.vertexColors[1] = new T.Color(1,1,1);
                f2.vertexColors[2] = new T.Color(0,0,1);

                geometry.faces.push(f1);
                geometry.faces.push(f2);

             }
        }
        geometry.computeFaceNormals();

        let materialProps = {side : T.DoubleSide, vertexColors:colortype};
        if (props.materialcolor) {
            materialProps["color"] = props.materialcolor;
        }
        let material = new T.MeshStandardMaterial(materialProps);
        console.log(materialProps);

        let mesh = new T.Mesh(geometry, material);
        // center at 0,0
        mesh.scale.set(scale,scale,scale);
        // warning - scale does not affect translation!
        mesh.translateX(scale * (-nchecks/2));
        mesh.translateY(scale * (-nchecks/2));

        group.add(mesh);

        group.position.x = props.x | 0;
        group.position.y = props.y | 0;
        group.position.z = props.z | 0;
    }
}
