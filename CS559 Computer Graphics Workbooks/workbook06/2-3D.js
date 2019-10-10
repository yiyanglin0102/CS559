/*jshint esversion: 6 */
// @ts-check

import {onWindowOnload} from "./Libs/helpers.js";


// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

// the simplest thing I can do
// draw a box
function box2() {
  //@@Snippet:box2
  // create the window that we want to draw into - this will
  // create a Canvas element - we'll set it to be
  let renderer = new T.WebGLRenderer();
  renderer.setSize(200,200);
  // put the canvas into the DOM
  document.getElementById("b2div").appendChild(renderer.domElement);

  // make a "scene" - a world to put the box into
  let scene = new T.Scene();

  // This transforms the world to the view
  // in this case a simple scaling
  let camera = new T.OrthographicCamera(-2,2, -2,2, -2,2);

  // we are going to make our box out of green "stuff"
  // this green stuff shows up as green even if there is no lighting
  var material = new T.MeshBasicMaterial( { color: 0x00ff00 } );

  // make a box - note that we make the geometry (a collection of triangles)
  // and then make a mesh object out of that geometry - which attaches the
  // triangles to a material
  let geometry = new T.BoxGeometry(1,1,1);
  let mesh = new T.Mesh(geometry, material);

  // now we need to put that box into the world
  scene.add(mesh);

  // now we just need to draw the scene with the camera
  renderer.render( scene, camera );
  //@@Snippet:box2
}
onWindowOnload(box2);

//
// just like box2, except with a second box - farther away
function box3() {
    // create the window that we want to draw into - this will
    // create a Canvas element - we'll set it to be
    let renderer = new T.WebGLRenderer();
    renderer.setSize(200,200);
    // put the canvas into the DOM
    document.getElementById("b3div").appendChild(renderer.domElement);
  
    // make a "scene" - a world to put the box into
    let scene = new T.Scene();
  
    // This transforms the world to the view
    // in this case a simple scaling
    let camera = new T.OrthographicCamera(-2,2, -2,2, -2,2);
  
    // we are going to make our box out of green "stuff"
    // this green stuff shows up as green even if there is no lighting
    let greenStuff = new T.MeshBasicMaterial( { color: 0x00ff00 } );
  

    // make a box - note that we make the geometry (a collection of triangles)
    // and then make a mesh object out of that geometry - which attaches the
    // triangles to a material
    let geometry = new T.BoxGeometry(1,1,1);
    let mesh1 = new T.Mesh(geometry, greenStuff);

    // now we need to put that box into the world
    scene.add(mesh1);

    //@@Snippet:yellowBox3
    let yellowStuff = new T.MeshBasicMaterial( { color: 0xffff00 } );
    let mesh2 = new T.Mesh(geometry,yellowStuff);
    mesh2.position.x = 0.2;
    mesh2.position.z = -1;
    scene.add(mesh2);
    //@@Snippet:yellowBox3
  
    // now we just need to draw the scene with the camera
    renderer.render( scene, camera );
}
onWindowOnload(box3);
  
function box4a() {
    // create the window that we want to draw into - this will
    // create a Canvas element - we'll set it to be
    let renderer = new T.WebGLRenderer();
    renderer.setSize(200,200);
    // put the canvas into the DOM
    document.getElementById("b4diva").appendChild(renderer.domElement);
  
    // make a "scene" - a world to put the box into
    let scene = new T.Scene();
  
    // This transforms the world to the view
    // in this case a simple scaling
    let camera = new T.OrthographicCamera(-2,2, -2,2, -2,2);
  
    // we are going to make our box out of green "stuff"
    // this green stuff shows up as green even if there is no lighting
    let greenStuff = new T.MeshStandardMaterial( { color: 0x00ff00 } );
  

    // make a box - note that we make the geometry (a collection of triangles)
    // and then make a mesh object out of that geometry - which attaches the
    // triangles to a material
    let geometry = new T.BoxGeometry(1,1,1);
    let mesh1 = new T.Mesh(geometry, greenStuff);

    // now we need to put that box into the world
    scene.add(mesh1);

    let yellowStuff = new T.MeshStandardMaterial( { color: 0xffff00 } );
    let mesh2 = new T.Mesh(geometry,yellowStuff);
    mesh2.position.x = 0.2;
    mesh2.position.z = -1;
    scene.add(mesh2);
  
    // now we just need to draw the scene with the camera
    renderer.render( scene, camera );
}
onWindowOnload(box4a);

function box4b() {
    // create the window that we want to draw into - this will
    // create a Canvas element - we'll set it to be
    let renderer = new T.WebGLRenderer();
    renderer.setSize(200,200);
    // put the canvas into the DOM
    document.getElementById("b4divb").appendChild(renderer.domElement);
  
    // make a "scene" - a world to put the box into
    let scene = new T.Scene();
  
    // This transforms the world to the view
    // in this case a simple scaling
    let camera = new T.OrthographicCamera(-2,2, -2,2, -2,2);
  
    // we are going to make our box out of green "stuff"
    // this green stuff shows up as green even if there is no lighting
    let greenStuff = new T.MeshStandardMaterial( { color: 0x00ff00 } );
  

    // make a box - note that we make the geometry (a collection of triangles)
    // and then make a mesh object out of that geometry - which attaches the
    // triangles to a material
    let geometry = new T.BoxGeometry(1,1,1);
    let mesh1 = new T.Mesh(geometry, greenStuff);

    // now we need to put that box into the world
    scene.add(mesh1);

    let yellowStuff = new T.MeshStandardMaterial( { color: 0xffff00 } );
    let mesh2 = new T.Mesh(geometry,yellowStuff);
    mesh2.position.x = 0.2;
    mesh2.position.z = -1;
    scene.add(mesh2);

    //@@Snippet:light4
    let ambientLight = new T.AmbientLight ( 0xffffff, 0.5);
    scene.add(ambientLight);
    let pointLight = new T.PointLight( 0xffffff, 1 );
    pointLight.position.set( 0,-20,-10 );
    scene.add( pointLight );
    //@@Snippet:light4
  
    // now we just need to draw the scene with the camera
    renderer.render( scene, camera );
}
onWindowOnload(box4b);

function box5() {
    // create the window that we want to draw into - this will
    // create a Canvas element - we'll set it to be
    let renderer = new T.WebGLRenderer();
    renderer.setSize(200,200);
    // put the canvas into the DOM
    document.getElementById("b5div").appendChild(renderer.domElement);
  
    // make a "scene" - a world to put the box into
    let scene = new T.Scene();
  
    // This transforms the world to the view
    // in this case a simple scaling
    //@@Snippet:camera5
    let camera = new T.PerspectiveCamera(50,1);
    camera.position.set(3,5,5);
    camera.lookAt(0,0,0);
    //@@Snippet:camera5

    // we are going to make our box out of green "stuff"
    // this green stuff shows up as green even if there is no lighting
    let greenStuff = new T.MeshStandardMaterial( { color: 0x00ff00 } );
  

    // make a box - note that we make the geometry (a collection of triangles)
    // and then make a mesh object out of that geometry - which attaches the
    // triangles to a material
    let geometry = new T.BoxGeometry(1,1,1);
    let mesh1 = new T.Mesh(geometry, greenStuff);

    // now we need to put that box into the world
    scene.add(mesh1);

    // this makes a second (yellow) box, to the right of and behind the first
    let yellowStuff = new T.MeshStandardMaterial( { color: 0xffff00 } );
    let mesh2 = new T.Mesh(geometry,yellowStuff);
    mesh2.position.x = 0.2;
    mesh2.position.z = -1;
    scene.add(mesh2);

    let ambientLight = new T.AmbientLight ( 0xffffff, 0.5);
    scene.add(ambientLight);
    let pointLight = new T.PointLight( 0xffffff, 1 );
    pointLight.position.set( 0,10,5 );
    scene.add( pointLight );
  
    // now we just need to draw the scene with the camera
    renderer.render( scene, camera );
}
onWindowOnload(box5);

// spin!
function box6() {
    // create the window that we want to draw into - this will
    // create a Canvas element - we'll set it to be
    let renderer = new T.WebGLRenderer();
    renderer.setSize(200,200);
    // put the canvas into the DOM
    document.getElementById("b6div").appendChild(renderer.domElement);
  
    // make a "scene" - a world to put the box into
    let scene = new T.Scene();
  
    // This transforms the world to the view
    // in this case a simple scaling
    //@@Snippet:camera5
    let camera = new T.PerspectiveCamera(50,1);
    camera.position.set(3,5,5);
    camera.lookAt(0,0,0);
    //@@Snippet:camera5

    // we are going to make our box out of green "stuff"
    // this green stuff shows up as green even if there is no lighting
    let greenStuff = new T.MeshStandardMaterial( { color: 0x00ff00 } );
  

    // make a box - note that we make the geometry (a collection of triangles)
    // and then make a mesh object out of that geometry - which attaches the
    // triangles to a material
    let geometry = new T.BoxGeometry(1,1,1);
    let mesh1 = new T.Mesh(geometry, greenStuff);

    // now we need to put that box into the world
    scene.add(mesh1);

    let yellowStuff = new T.MeshStandardMaterial( { color: 0xffff00 } );
    let mesh2 = new T.Mesh(geometry,yellowStuff);
    mesh2.position.x = 0.2;
    mesh2.position.z = -1;
    scene.add(mesh2);

    let ambientLight = new T.AmbientLight ( 0xffffff, 0.5);
    scene.add(ambientLight);
    let pointLight = new T.PointLight( 0xffffff, 1 );
    pointLight.position.set( 0,10,5 );
    scene.add( pointLight );
  
    // since we're animating, add OrbitControls
    let controls = new T.OrbitControls(camera,renderer.domElement);

    function draw() {
        // update the scene...
        mesh1.rotateY(0.02);
        // now we just need to draw the scene with the camera
        renderer.render( scene, camera );
        // have an animation loop
        window.requestAnimationFrame(draw);
    }
    draw();
}
onWindowOnload(box6);
