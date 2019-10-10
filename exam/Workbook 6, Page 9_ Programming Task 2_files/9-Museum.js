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

window.onload = function () {

    /** @type{THREE.Scene} */
    let scene = new THREE.Scene();
    /** @type{number} */
    let wid = 700; // window.innerWidth;
    /** @type{number} */
    let ht = 500; // window.innerHeight;
    /** @type{THREE.PerspectiveCamera} */
    let main_camera = new THREE.PerspectiveCamera(40, wid / ht, 1, 100);
    main_camera.position.set(2, 5, 2);
    main_camera.rotation.set(-0.5, 0, 0);
    let active_camera = main_camera;
    /** @type{THREE.WebGLRenderer} */
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(wid, ht);
    renderer.shadowMap.enabled = true;

    let controls = new T.OrbitControls(main_camera, renderer.domElement);

    document.getElementById("museum_area").appendChild(renderer.domElement);
    setupButtons();
    setupBasicScene();

    // Here, we add a basic, simple first object to the museum.
    /**@type{THREE.Material} */
    let material = new THREE.MeshPhongMaterial({ color: "#00aa00", shininess: 15, specular: "#00ff00" });
    /**@type{THREE.Geometry} */
    let geometry = new THREE.CubeGeometry(0.5, 0.5, 0.5);



    // first object

    /**@type{THREE.Mesh} */
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(2, 1.35, 2);
    cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
    cube.castShadow = true;




    // test
    let box = new T.BoxGeometry(1, 1, 1);
    let cube1 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "purple" }));
    // cube1.rotateY(45);
    cube1.position.set(-1.5, 1.5, -1.5);
    scene.add(cube1);








































    // dinosaur
    // let test = new T.BoxGeometry(0.1,0.1,0.1);
    // let test1 = new T.Mesh(test,new T.MeshStandardMaterial({color:"green"}));
    // // cube1.rotateY(45);
    // test1.position.set(0,0,0);
    // scene.add(test1);

    // for(let i = 0; i < 3; i++)
    // {
    //     let test = new T.BoxGeometry(0.1,0.1+i/10,0.1+i/10);
    //     let test1 = new T.Mesh(test,new T.MeshStandardMaterial({color:"green"}));
    //     test1.position.set(0,0,0);
    //     scene.add(test1);
    // }


    // head
    let head = new T.BoxGeometry(0.6, 0.3, 0.3);
    let head1 = new T.Mesh(head, new T.MeshStandardMaterial({ color: "lightgreen" }));
    head1.position.set(-0.05, 0, 0);
    head1.rotateZ(50);
    scene.add(head1);



    //neck
    let neck = new T.BoxGeometry(0.3, 0.4, 0.3);
    let neck1 = new T.Mesh(neck, new T.MeshStandardMaterial({ color: "lightgreen" }));
    neck1.position.set(0.1, -0.3, 0);
    neck1.rotateZ(60);
    scene.add(neck1);


    //body
    let body = new T.BoxGeometry(0.5, 0.3, 0.3);
    let body1 = new T.Mesh(body, new T.MeshStandardMaterial({ color: "lightgreen" }));
    body1.position.set(0.3, -0.45, 0);
    scene.add(body1);

    // tail
    let tail = new T.BoxGeometry(0.35, 0.2, 0.2);
    let tail1 = new T.Mesh(tail, new T.MeshStandardMaterial({ color: "lightgreen" }));
    tail1.position.set(0.6, -0.4, 0);
    tail1.rotateZ(10);

    scene.add(tail1);

    // small tail 
    let smtail = new T.BoxGeometry(0.25, 0.1, 0.1);
    let smtail1 = new T.Mesh(smtail, new T.MeshStandardMaterial({ color: "lightgreen" }));
    smtail1.position.set(0.8, -0.3, 0);
    smtail1.rotateZ(10);

    scene.add(smtail1);

    // right leg

    let legR = new T.BoxGeometry(0.1, 0.3, 0.1);
    let legR1 = new T.Mesh(legR, new T.MeshStandardMaterial({ color: "lightgreen" }));
    legR1.position.set(0.4, -0.8, -0.15);
    // legR1.rotateZ(10);

    scene.add(legR1);

// left leg

let legL = new T.BoxGeometry(0.15, 0.3, 0.1);
let legL1 = new T.Mesh(legL, new T.MeshStandardMaterial({ color: "lightgreen" }));
legL1.position.set(0.4, -0.8, 0.15);
legR1.rotateZ(0);

scene.add(legL1);


































    /**@type{THREE.SpotLight} */
    let spotlight_1 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_1.angle = Math.PI / 16;
    spotlight_1.position.set(2, 5, 2);
    spotlight_1.target = cube;
    spotlight_1.castShadow = true;
    scene.add(spotlight_1);

    // TODO: You need to place the lights.
    let spotlight_2 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_2.angle = Math.PI / 16;
    spotlight_2.castShadow = true;
    scene.add(spotlight_2);
    let spotlight_3 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_3.angle = Math.PI / 16;
    spotlight_3.castShadow = true;
    scene.add(spotlight_3);
    let spotlight_4 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_4.angle = Math.PI / 16;
    spotlight_4.castShadow = true;
    scene.add(spotlight_4);


    // TODO: You need to place these cameras.
    let camera_1 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    let camera_2 = new THREE.PerspectiveCamera(30, wid / ht, 1, 100);
    let camera_3 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    let camera_4 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    scene.add(cube);

    // finally, draw the scene. Also, add animation.
    renderer.render(scene, main_camera);
    function animate() {
        cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.005);
        renderer.render(scene, active_camera);
        requestAnimationFrame(animate);
    }
    animate();

    // Simple wrapper function for code to set up the basic scene
    // Specifically, sets up the stuff students don't need to use directly.
    function setupBasicScene() {
        // make a ground plane.
        let geometry1 = new THREE.CubeGeometry(10, 0.1, 10);
        let material1 = new THREE.MeshStandardMaterial({ color: "#dddddd", metalness: 0.2, roughness: 0.8 });
        /**@type{THREE.Mesh} */
        let ground = new THREE.Mesh(geometry1, material1);
        ground.position.set(0, -1, 0);
        scene.add(ground);

        let locs = [-2, 2];
        /**@type{THREE.Geometry} */
        let geometry2 = new THREE.CylinderGeometry(0.5, 0.75, 2, 16, 8);
        /**@type{THREE.Material} */
        let material2 = new THREE.MeshPhongMaterial({ color: "#888888", shininess: 50 });
        locs.forEach(function (x_loc) {
            locs.forEach(function (z_loc) {
                /**@type{THREE.Mesh} */
                let object = new THREE.Mesh(geometry2, material2);
                object.position.x = x_loc;
                object.position.z = z_loc;
                object.position.y = 0;
                object.receiveShadow = true;

                scene.add(object);
            });
        });

        /**@type{THREE.AmbientLight} */
        let amb_light = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(amb_light);
    }

    function setupButtons() {
        document.getElementById("main_cam").onclick = function () {
            active_camera = main_camera;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_1").onclick = function () {
            active_camera = camera_1;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_2").onclick = function () {
            active_camera = camera_2;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_3").onclick = function () {
            active_camera = camera_3;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_4").onclick = function () {
            active_camera = camera_4;
            renderer.render(scene, active_camera);
        };
    }

    let light = new T.SpotLight("white", 0.6, 0, Math.PI / 30, 0); // ,0,Math.PI/9);
    light.position.set(0, 20, 0);
    scene.add(light);
    let sh = new T.SpotLightHelper(light);
    scene.add(sh);

    let spot = new T.SpotLight("blue");
    spot.angle = Math.PI / 48;       // narrow (5 degrees)
    spot.position.set(0, 10, 0);
    spot.target.position.set(1.5, 0, 1.5);
    scene.add(spot);
    scene.add(spot.target);

    function draw() {
        // make things go around the circle - once around every 2 second
        let theta = Math.PI * 4 * (performance.now() % 2000) / 2000;
        let x = 2 * Math.cos(theta);
        let z = 2 * Math.sin(theta);


        spot.target.position.set(z, 0, x);
        // renderer.setClearColor("lightblue");

        // renderer.render(scene,camera);
        window.requestAnimationFrame(draw);
    }
    draw();

};