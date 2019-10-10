/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import {onWindowOnload} from "./Libs/helpers.js";

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

// HELPER FUCTIONS

/**
* @param {String} file the filename and path of the object.
* @return {THREE.Object3D}
*/
function import_obj(file) {
    // An imported object!
    // Source: https://github.com/mrdoob/three.js/issues/6822
    let imported_obj = new T.Object3D();
    let loader = new T.OBJLoader();

    loader.load( file, function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof T.Mesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
                // child.geometry.computeFaceNormals();
                child.geometry.computeVertexNormals();
            }
        });
        imported_obj.add(object);
    });
    return imported_obj;
}

/**
* @returns {THREE.MeshPhongMaterial}
*/
function random_mat() {
    return new T.MeshPhongMaterial({
        color: new T.Color(
            Math.random(),
            Math.random(),
            Math.random()
        ),
        emissive: new T.Color(
            Math.random(),
            Math.random(),
            Math.random()
        ),
        emissiveIntensity: Math.random(),
        // metalness: Math.random(),
        // roughness: Math.random(),
        // castShadow: true,
        // receiveShadow: true
        side: T.DoubleSide,
    });
}

function new_prop() {
    let prop_segment = new T.Mesh(
        new T.CircleBufferGeometry(0.2,1,0,0.6),
        random_mat()
    );
    let seg1 = prop_segment.clone();
    let seg2 = prop_segment.clone();
    seg2.rotateZ(Math.PI);
    let prop1 = new T.Group();
    prop1.add(seg1);
    prop1.add(seg2);
    return prop1;
}

/**
* @param {Number} scale the amount to scale our little copter by.
* @param {Number} num_props the total number of props the little copter has.
*/
let new_copter = function (scale=1, num_props=2) {
    let f = {};
    f.props = [];
    f.speed = 0.15;

    let new_f = new T.Group();
    let new_f_airframe = new T.Mesh(
        new T.CubeGeometry(0.2*scale,0.2*scale,0.2*scale),
        random_mat()
    );
    new_f.add(new_f_airframe);
    f.airframe = new_f;

    for (let i=0; i<num_props; i++) {
        let prop = new_prop();
        prop.translateY((0.2+i/10)*scale);
        prop.rotateX(Math.PI / 2);
        new_f.add(prop);
        f.props.push(prop);
    }

    /**
    * @param {THREE.Mesh[]} copters
    */
    f.animate = function (copters,b52) {

        // Animate all the props.
        f.props.forEach( (prop,i) => {
            if (i%2==0) {
                prop.rotateZ(0.2);
            } else {
                prop.rotateZ(-0.2);
            }
        });

        // Movement in global space.
        // Match heading with group (but mostly the b52).

        // Rotate towards b52 and center of mass.
        let max_dist = 5; // a distance we don't want to get past
        let min_dist = 1.7;  // don't get any closer than this
        let dist = (f.airframe.position.clone()).add((b52.position.clone()).multiplyScalar(-1)).length();
        // Get the direction to the b52.
        let b52_dir = new T.Matrix4();
        b52_dir.lookAt(f.airframe.position, b52.position, f.airframe.up);
        let b52_dir_ori = new T.Quaternion();
        b52_dir.decompose(new T.Vector3(), b52_dir_ori, new T.Vector3());
        f.airframe.quaternion.slerp(b52_dir_ori, 0.03);

        // Rotate away if too close. (A proximity check.)
        // Just the b52.
        if (dist < min_dist) {
            f.airframe.quaternion.slerp(b52_dir_ori, -0.05 * min_dist / dist);
        }
        // All the other copters.
        copters.forEach( (c) => {
            let dist = (f.airframe.position.clone()).add((c.airframe.position.clone()).multiplyScalar(-1)).length();
            if (dist < min_dist) {
                // Get the direction to the copter.
                let copter_dir = new T.Matrix4();
                copter_dir.lookAt(f.airframe.position, c.airframe.position, f.airframe.up);
                let copter_dir_ori = new T.Quaternion();
                copter_dir.decompose(new T.Vector3(), copter_dir_ori, new T.Vector3());
                f.airframe.quaternion.slerp(copter_dir_ori, -0.01);
            }
        });

        // Move forward.
        let f_dir = new T.Vector3();
        f.airframe.getWorldDirection(f_dir);

        f.airframe.translateZ(-1 * f.speed);
    };
    return f;
};

/**
 * @typedef AircraftProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {number} [speed=0.001]
 * @property {number} [max_yaw=10] in radians
 * @property {number} [max_pitch=10] in radians
 * @property {number} [max_roll=4] in radians
 */
class Aircraft {
    /**
     * @param {AircraftProperties} params
     */
    constructor(params={}) {
        this.ob = new T.Group();
        this.speed = params.speed ? Number(params.speed) : 0.001;
        this.max_yaw = params.max_yaw ? Number(params.max_yaw) : 0.01;
        this.max_pitch = params.max_pitch ? Number(params.max_pitch) : 10;
        this.max_roll = params.max_roll ? Number(params.max_roll) : 10;
    }

    // A corollary to the Boids attraction to center of mass.
    /**
    * @param {THREE.Object3D} target
    */
    move_to (target) {
        // Get the direction to the target.
        let target_dir = new T.Matrix4();
        target_dir.lookAt(this.ob.position, target.position, target.up);
        let target_dir_ori = new T.Quaternion();
        target_dir.decompose(new T.Vector3(), target_dir_ori, new T.Vector3());
        this.ob.quaternion.rotateTowards(target_dir_ori, this.max_yaw);
    }

    // A corollary to the Boids collision avoidance.
    /**
    *@param {THREE.Mesh} object
    */
    move_away (object) {

    }

}

/**
 * @typedef B52Properties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {number} [speed=0.001]
 * @property {number} [max_yaw=10] in radians
 * @property {number} [max_pitch=10] in radians
 * @property {number} [max_roll=4] in radians
 */
class B52 extends Aircraft {
    /**
     * @param {B52Properties} params
     */
    constructor (params={}) {
        super(params);

        // Plane 1
        let airframe = import_obj( "OBJ/b52-low-poly.obj");
        airframe.scale.set(0.5,0.5,0.5);
        airframe.rotateY(Math.PI);
        this.ob.add(airframe);

        // Plane 1 propellers.
        let prop1 = new_prop();
        prop1.position.set(0.7,-0.05,-0.8);
        this.ob.add(prop1);
        let prop2 = new_prop();
        prop2.position.set(-0.7,-0.05,-0.8);
        this.ob.add(prop2);
        let prop3 = new_prop();
        prop3.position.set(1.24,-0.06,-0.4);
        this.ob.add(prop3);
        let prop4 = new_prop();
        prop4.position.set(-1.24,-0.06,-0.4);
        this.ob.add(prop4);
        this.ob.position.setY(3);
        this.props = [prop1, prop2, prop3, prop4];

        return this;
    }
    animate () {
        // Move forward.
        let dir = new T.Vector3();
        this.ob.getWorldDirection(dir);
        this.ob.translateZ(-1 * this.speed);

        // Rotate props.
        this.props.forEach( (prop,i) => {
            if (i%2==0) {
                prop.rotateZ(0.1);
            } else {
                prop.rotateZ(-0.1);
            }
        });
    }
}

class MiniCopter extends Aircraft {
    constructor (params={}) {
        super(params);
    }
    animate () {
        // Move forward.
        let dir = new T.Vector3();
        this.ob.getWorldDirection(dir);
        this.ob.translateZ(-1 * this.speed);

        // Rotate props.
        this.props.forEach( (prop,i) => {
            if (i%2==0) {
                prop.rotateZ(0.1);
            } else {
                prop.rotateZ(-0.1);
            }
        });
    }
}

/**
 * @typedef BuildingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 * @property {number} [height=2]
 */
class Building {
    /**
     * @param {BuildingProperties} params
     */
    constructor (params={}) {
        this.ob = new T.Group();
        this.ob.position.x = params.x ? Number(params.x) : 0;
        this.ob.position.y = params.y ? Number(params.y) : 0;
        this.ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        this.ob.scale.set(scale, scale, scale);
    }


}

/**
 * @typedef RadarProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
class RadarDish extends Building {
    /**
     * @param {RadarProperties} params
     */
    constructor (params={}) {

        // Base.
        let base = new T.Group();

        let bldg_geo = new T.LatheGeometry([
            new T.Vector2(2,0),
            new T.Vector2(2,3),
            new T.Vector2(1.5,5),
            new T.Vector2(0.4,6),
            new T.Vector2(0,6),
        ]);
        let bldg_mat = random_mat();
        let bldg = new T.Mesh(bldg_geo, bldg_mat);
        base.add(bldg);

        // Dish.
        let dish_group = new T.Group();

        let dish_geo = new T.LatheGeometry([
            new T.Vector2(0,0),
            new T.Vector2(2,0.4),
            new T.Vector2(3,0.8),
            new T.Vector2(4,1.6),
        ]);
        let dish_mat = random_mat();
        let dish = new T.Mesh(dish_geo, dish_mat);
        dish.translateZ(0.5);
        dish.rotateX(Math.PI / 2);
        dish_group.add(dish);

        let dr_geo = new T.CylinderGeometry(1,1,2);
        let dr_mat = random_mat();
        let dr = new T.Mesh( dr_geo, dr_mat );
        dr.rotateZ(Math.PI / 2);
        dish_group.add(dr);

        // Dish pointy thing.
        let dpt_geo = new T.CylinderGeometry(0.1,0.1,2);
        let dpt_mat = random_mat();
        let dpt = new T.Mesh(dpt_geo,dpt_mat);
        dpt.translateZ(1);
        dpt.rotateX(Math.PI / 2);
        dish_group.add(dpt);

        dish_group.translateY(6);

        super(params);
        this.dish = dish_group;

        this.ob.add(base);
        this.ob.add(dish_group);
    }

    /**
    * @param {THREE.Object3D} target the target to track.
    */
    animate (target) {
        this.dish.lookAt(target.position);
    }
}

class Waypoint {
    constructor(params={}) {

        this.ob = new T.Mesh(
            new T.CubeGeometry(),
            new T.MeshStandardMaterial()
        );
        this.ob.position.x = params.x ? params.x : 0;
        this.ob.position.y = params.y ? params.y : 0;
        this.ob.position.z = params.z ? params.z : 0;

        this.base = 0x00e3ff;
        this.dest = 0xFF0000;

        this.ob.material.color.setHex( this.base );
        this.is_dest = false;



        return this;
    }
    set_dest () {
        this.ob.material.color.setHex( this.dest );
        this.is_dest = true;
    };
    set_base () {
        this.ob.material.color.setHex ( this.base );
        if (this.is_dest) {
            this.is_dest = false;
        }
    }

    /**
    * @param {THREE.Mesh} object object to check closeness to
    * @param {Number} min_dist if dist < min_dist, return true
    * @return {Boolean}
    */
    is_close (object,min_dist) {
        let dist = (object.position.clone()).add((this.ob.position.clone()).multiplyScalar(-1)).length();
        if (dist<min_dist) {
            return true;
        } else {
            return false;
        }
    }
}

// CORE LOGIC
function main() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(600,400);
    document.body.appendChild(renderer.domElement);

    let scene = new T.Scene();
    let main_camera = new T.PerspectiveCamera(40, renderer.domElement.width / renderer.domElement.height, 1,1000);

    main_camera.position.z = 30;
    main_camera.position.y = 50;
    main_camera.position.x = 25;
    main_camera.lookAt(0,0,0);

    let buff_camera = new T.PerspectiveCamera(60, renderer.domElement.width / renderer.domElement.height, 0.1,1000);
    let active_camera = main_camera;
    setupcameras();

    // since we're animating, add OrbitControls
    let controls = new T.OrbitControls(active_camera,renderer.domElement);
    // let controls2 = new T.OrbitControls(buff_camera,renderer.domElement);
    scene.add(new T.AmbientLight("white",0.2));

    // two lights - both a little off white to give some contrast
    let dirLight1 = new T.DirectionalLight(0xF0E0D0,1);
    dirLight1.position.set(1,1,0);
    scene.add(dirLight1);

    let dirLight2 = new T.DirectionalLight(0xD0E0F0,1);
    dirLight2.position.set(-1,1,-.2);
    scene.add(dirLight2);

    // make a ground plane
    let ground_size = 100;
    let groundBox = new T.BoxGeometry(ground_size,0.1,ground_size);
    let groundMesh = new T.Mesh(groundBox,new T.MeshStandardMaterial( {color:0x88B888, roughness:.9}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -.05;
    scene.add(groundMesh);

    // Add some waypoints to the map.
    let num_waypoints = 8;
    let wps = [];
    let rand_x = 0;
    let rand_y = 0;
    let rand_z = 0;
    for (let i=0; i<num_waypoints; i++) {
        // Generate a random location.
        rand_x = Math.random()*ground_size - ground_size/2;
        rand_y = Math.random()*20;
        rand_z = Math.random()*ground_size - ground_size/2;

        // Put a waypoint there.
        let wp = new Waypoint({x:rand_x, y:rand_y, z:rand_z});
        wps.push(wp);
        scene.add(wp.ob);
    }
    // Pick a random wp and set it as active.
    let r_idx = Math.floor(Math.random()*wps.length);
    wps[r_idx].set_dest();

    // Now a list of planes...
    let fs_num = 20; // number of followers to add to the list.
    let fs = [];    // a list of followers.
    for (let i = 0; i < fs_num; i++) {
        let nc = new_copter();
        fs.push(nc);    // add to our list
        let x_po = Math.random()*20 - 10;
        let y_po = Math.random()*20;
        let z_po = Math.random()*20 - 10;
        nc.airframe.position.set(x_po,y_po,z_po); // move it to a random place (within limits).
        scene.add(nc.airframe);
    }

    let b52 = new B52({
        speed:0.1
    });
    buff_camera.position.set(0,3,2);
    buff_camera.rotateX(-Math.PI / 6);
    b52.ob.add(buff_camera);
    scene.add(b52.ob);

    let radar = new RadarDish({x:10,z:10,size:0.3});
    scene.add(radar.ob);

    function animateLoop() {

        let dest = wps[0];
        wps.forEach( (wp) => {
            if (wp.is_dest) {
                dest = wp;
            }
        });

        if (dest.is_close(b52.ob,4)) {
            // Select a new waypoint as a destination.
            dest.set_base();
            let r_idx = Math.floor(Math.random()*wps.length);
            wps[r_idx].set_dest();
        }

        // Set a target and move the b52.
        b52.move_to(dest.ob);
        b52.animate();

        // Animate the radar.
        radar.animate(b52.ob);

        // followers
        fs.forEach( (f) => {
            f.animate(fs,b52.ob);
        });

        // Move the buff follow cam.
        // buff_camera.position.set(b52.ob.position.x, b52.ob.position.y+0.4, b52.ob.position.z-0.3);
        // buff_camera.quaternion.copy(b52.ob.quaternion);

        renderer.render(scene,active_camera);
        window.requestAnimationFrame(animateLoop);
    }

    function setupcameras() {
        document.getElementById("main_cam").onclick = function()
        {
            active_camera = main_camera;
            renderer.render(scene, active_camera);
        };
        document.getElementById("buff_cam").onclick = function()
        {
            active_camera = buff_camera;
            renderer.render(scene, active_camera);
        };
    }

    animateLoop();
}
onWindowOnload(main);
