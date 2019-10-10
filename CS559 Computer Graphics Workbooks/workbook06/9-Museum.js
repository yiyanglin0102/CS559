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

window.onload = function ()
{
    /** @type{THREE.Scene} */
    let scene = new THREE.Scene();
    /** @type{number} */
    let wid = 700; // window.innerWidth;
    /** @type{number} */
    let ht  = 500; // window.innerHeight;
    /** @type{THREE.PerspectiveCamera} */
    let main_camera = new THREE.PerspectiveCamera(60, wid/ht, 1, 100);
    main_camera.position.set(0, 4, 6);
    main_camera.rotation.set(-0.5, 0, 0);
    let active_camera = main_camera;
    /** @type{THREE.WebGLRenderer} */
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(wid, ht);
    renderer.shadowMap.enabled = true;

    document.getElementById("museum_area").appendChild(renderer.domElement);
    setupButtons();
    setupBasicScene();

    // Here, we add a basic, simple first object to the museum.
    /**@type{THREE.Material} */
    let material = new THREE.MeshPhongMaterial( {color:"#00aa00", shininess:15, specular:"#00ff00"} );
    /**@type{THREE.Geometry} */
    let geometry = new THREE.CubeGeometry(0.5, 0.5, 0.5);
    /**@type{THREE.Mesh} */
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(2, 1.35, 2);
    cube.rotation.set(Math.PI/4, 0, Math.PI/4);
    cube.castShadow = true;

    // TODO: You need to create three more objects, and place them on pedestals.

    /**@type{THREE.SpotLight} */
    let spotlight_1 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_1.angle = Math.PI/16;
    spotlight_1.position.set(2, 5, 2);
    spotlight_1.target = cube;
    spotlight_1.castShadow = true;
    scene.add(spotlight_1);

    // TODO: You need to place the lights.
    let spotlight_2 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_2.angle = Math.PI/16;
    spotlight_2.castShadow = true;
    let spotlight_3 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_3.angle = Math.PI/16;
    spotlight_3.castShadow = true;
    let spotlight_4 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_4.angle = Math.PI/16;
    spotlight_4.castShadow = true;

    // TODO: You need to place these cameras.
    let camera_1 = new THREE.PerspectiveCamera(60, wid/ht, 1, 100);
    let camera_2 = new THREE.PerspectiveCamera(60, wid/ht, 1, 100);
    let camera_3 = new THREE.PerspectiveCamera(60, wid/ht, 1, 100);
    let camera_4 = new THREE.PerspectiveCamera(60, wid/ht, 1, 100);
    scene.add(cube);

    // finally, draw the scene. Also, add animation.
	renderer.render(scene, main_camera);
    function animate()
    {
        cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.005);
        renderer.render(scene, active_camera);
        requestAnimationFrame(animate);
    }
    animate();
    
    // Simple wrapper function for code to set up the basic scene
    // Specifically, sets up the stuff students don't need to use directly.
    function setupBasicScene()
    {
        // make a ground plane.
        let geometry1 = new THREE.CubeGeometry(10, 0.1, 10);
        let material1 = new THREE.MeshStandardMaterial({color:"#dddddd", metalness:0.2, roughness:0.8});
        /**@type{THREE.Mesh} */
        let ground = new THREE.Mesh(geometry1, material1);
        ground.position.set(0, -1, 0);
        scene.add(ground);

        let locs = [-2, 2];
        /**@type{THREE.Geometry} */
        let geometry2 = new THREE.CylinderGeometry(0.5, 0.75, 2, 16, 8);
        /**@type{THREE.Material} */
        let material2 = new THREE.MeshPhongMaterial( {color:"#888888", shininess:50} );
        locs.forEach(function(x_loc)
        {
            locs.forEach(function(z_loc)
            {
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

    function setupButtons()
    {
        document.getElementById("main_cam").onclick = function()
        {
            active_camera = main_camera;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_1").onclick = function()
        {
            active_camera = camera_1;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_2").onclick = function()
        {
            active_camera = camera_2;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_3").onclick = function()
        {
            active_camera = camera_3;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_4").onclick = function()
        {
            active_camera = camera_4;
            renderer.render(scene, active_camera);
        };
    }
    
};