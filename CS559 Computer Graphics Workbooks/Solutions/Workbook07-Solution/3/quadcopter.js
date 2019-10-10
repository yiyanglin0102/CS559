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

function quadcopter() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(600,400);
    document.body.appendChild(renderer.domElement);

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera(40, renderer.domElement.width / renderer.domElement.height, 1,1000);

    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 5;
    camera.lookAt(0,0,0);
 
    // since we're animating, add OrbitControls
    let controls = new T.OrbitControls(camera,renderer.domElement);

    scene.add(new T.AmbientLight("white",0.2));

    // two lights - both a little off white to give some contrast
    let dirLight1 = new T.DirectionalLight(0xF0E0D0,1);
    dirLight1.position.set(1,1,0);
    scene.add(dirLight1);

    let dirLight2 = new T.DirectionalLight(0xD0E0F0,1);
    dirLight2.position.set(-1,1,-0.2);
    scene.add(dirLight2);

    // make a ground plane
    let groundBox = new T.BoxGeometry(20,0.1,20);
    let groundMesh = new T.Mesh(groundBox,new T.MeshStandardMaterial( {color:0x88B888, roughness:0.9}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    // this is the part the student should change
    /*    Copter body looks like this. Center 0,0 is at dot
              -------
             /       \
            |    .    |
             \       /
              -------
    */

    // create a group that acts like the world (origin at 0,0,0 with standard normal x,y,z axes to rotate about)
    let worldGroup = new T.Group();

    // then create a quadcopter group on the inside of this worldGroup
    let quadCopterGroup = new T.Group();
    worldGroup.add(quadCopterGroup);

    let sideLen = 5;
    let hLenDiag = 3;
    let vLenDiag = 4;

    // creates the body shape
    let bodyShape = new T.Shape();   
    bodyShape.moveTo(-(hLenDiag + (sideLen / 2)), -(sideLen/2) );
    bodyShape.lineTo(-(hLenDiag + (sideLen / 2)), sideLen/2);
    bodyShape.lineTo(-(sideLen / 2), (sideLen / 2) + vLenDiag);
    bodyShape.lineTo(sideLen/2, (sideLen / 2) + vLenDiag);
    bodyShape.lineTo((hLenDiag + (sideLen / 2)), sideLen/2);
    bodyShape.lineTo((hLenDiag + (sideLen / 2)), -(sideLen / 2));
    bodyShape.lineTo(sideLen/2, -((sideLen/2) + vLenDiag));
    bodyShape.lineTo(-(sideLen/2), -((sideLen/2) + vLenDiag));
    bodyShape.lineTo(-(hLenDiag + (sideLen / 2)), -(sideLen/2) );

    let bodyExtrudeSettings = {
        steps: 2,
        depth: 2,
        bevelEnabled: false
    };

    // body geometry, material and mesh
    let geometry = new T.ExtrudeGeometry( bodyShape, bodyExtrudeSettings );
    let material = new T.MeshStandardMaterial( { color: 0x25a006, emissive: 0x00ff00, emissiveIntensity:0.5, roughness:0.75, metalness:1.0  } );
    let bodyMesh = new T.Mesh( geometry, material ) ;

    bodyMesh.rotateX(Math.PI / 2);
    bodyMesh.scale.set(0.1, 0.1, 0.1);

    // FRONT OF COPTER AND RADAR
    let frontGeom = new T.ConeGeometry(0.1, 0.3);
    let frontMaterial = new T.MeshStandardMaterial({color:"red"});

    let frontMesh = new T.Mesh(frontGeom, frontMaterial);

    frontMesh.rotateZ(Math.PI/2);
    frontMesh.position.set(-0.69, -0.1, 0);

    // ARMS
    let armGroup = new T.Group();
    armGroup.rotateY(Math.PI/4);

    let armX = 3;   // arm width
    let armY = 10;  // arm length

    // shape of the arm to draw
    let armShape = new T.Shape();
    armShape.moveTo(-armX/2,-armY/2);
    armShape.lineTo(armX/2, -armY/2);
    armShape.lineTo(armX/2, armY/2);
    armShape.lineTo(-armX/2, armY/2);
    armShape.lineTo(-armX/2, -armY/2);

    let armExtrudeSettings = {
        steps:2,
        depth:2.75,
        bevelEnabled: true,
        bevelThickness: 0.5,
	    bevelSize: 0.5,
	    bevelSegments: 3
    };


    let armGeom = new T.ExtrudeGeometry(armShape, armExtrudeSettings);
    let armMaterial = new T.MeshStandardMaterial( {color: 0x6aad69, roughness:0.75, metalness:1.0 });
    
    // arms[0] = bottom left, arms[1] = top right, arms[2] = top left, arms[3] = bottom right
    let arms = [];
    for(let i = 0; i < 4; i++) {

        let currentArm = new T.Mesh(armGeom, armMaterial);
        currentArm.scale.set(0.05, 0.05, 0.05);

        if (i ==0 || i == 1) {
            currentArm.rotateX(Math.PI/2);
            currentArm.rotateZ(-Math.PI/25);
        } else {
            currentArm.rotateZ(Math.PI/2);
            currentArm.rotateX(-Math.PI/25);
        }

        arms.push(currentArm);
        armGroup.add(currentArm);

    }

    arms[0].position.set(-0.01, -0.03, 0.8);
    arms[1].position.set(0.01, -0.03, -0.8);
    arms[2].position.set(-0.8, -0.105, -0.06);
    arms[3].position.set(0.8, -0.105, -0.08);

    // BLADES
    // blade groups to add spinning pegs and blade pieces
    let bladeBottomLeftGroup = new T.Group();
    let bladeBottomRightGroup = new T.Group();
    let bladeTopLeftGroup = new T.Group();
    let bladeTopRightGroup = new T.Group();

    // add these blades to the arm group
    armGroup.add(bladeBottomLeftGroup);
    armGroup.add(bladeBottomRightGroup);
    armGroup.add(bladeTopLeftGroup);
    armGroup.add(bladeTopRightGroup);

    // move the blade groups to their individual spot on each arm to make it easier to spin
    bladeBottomLeftGroup.position.set(0.015, 0.04, 0.97);
    bladeBottomRightGroup.position.set(0.97, 0.04, 0.01);
    bladeTopLeftGroup.position.set(-0.97, 0.04, -0.01);
    bladeTopRightGroup.position.set(-0.015, 0.04, -0.97);

    // BLADE PEGS
    let bladePegGeom = new T.CylinderGeometry(0.04, 0.06, 0.1);
    let bladePegMaterial = new T.MeshStandardMaterial({color: 0xddf2a9});

    let bladePegBotLeftMesh = new T.Mesh(bladePegGeom, bladePegMaterial);
    let bladePegBotRightMesh = new T.Mesh(bladePegGeom, bladePegMaterial);
    let bladePegTopLeftMesh = new T.Mesh(bladePegGeom, bladePegMaterial);
    let bladePegTopRightMesh = new T.Mesh(bladePegGeom, bladePegMaterial);

    // add all pegs to their individual groups
    bladeBottomLeftGroup.add(bladePegBotLeftMesh);
    bladeBottomRightGroup.add(bladePegBotRightMesh);
    bladeTopLeftGroup.add(bladePegTopLeftMesh);
    bladeTopRightGroup.add(bladePegTopRightMesh);

    // CIRCULAR PART OF BLADES
    let bladeOuterGeom = new T.TorusGeometry(0.2, 0.05, 24, 18);
    let bladeOuterMaterial = new T.MeshStandardMaterial({color: 0x8c0c08});

    // TRIANGULAR PART OF BLADES
    let bladeInnerGeom = new T.ConeGeometry(0.05,0.22, 16);
    let bladeInnerMaterial = new T.MeshStandardMaterial({color:0xe2211b});

    // create and store the outer and inner blades and position them
    let bladesOuter = [];
    let bladesInner = [];
    for (let bladeNum = 0; bladeNum < 4; bladeNum++) {

        let currentOuterBlade = new T.Mesh(bladeOuterGeom, bladeOuterMaterial);
        let innerBlade1 = new T.Mesh(bladeInnerGeom, bladeInnerMaterial);
        let innerBlade2 = new T.Mesh(bladeInnerGeom, bladeInnerMaterial);
        let innerBlade3 = new T.Mesh(bladeInnerGeom, bladeInnerMaterial);
        let innerBlade4 = new T.Mesh(bladeInnerGeom, bladeInnerMaterial);

        currentOuterBlade.position.y = 0.03;
        currentOuterBlade.rotation.x = Math.PI/2;

        innerBlade1.position.set(0, 0.04, 0.11);
        innerBlade1.rotation.x = Math.PI / 2;

        innerBlade2.scale.setY(-1);
        innerBlade2.position.set(0, 0.04, -0.11);
        innerBlade2.rotation.x = Math.PI / 2;

        innerBlade3.scale.setY(-1);
        innerBlade3.position.set(0.11, 0.04, 0);
        innerBlade3.rotation.z = Math.PI / 2;

        innerBlade4.position.set(-0.11, 0.04, 0);
        innerBlade4.rotation.z = Math.PI / 2;

        bladesOuter.push(currentOuterBlade);
        bladesInner.push(innerBlade1);
        bladesInner.push(innerBlade2);
        bladesInner.push(innerBlade3);
        bladesInner.push(innerBlade4);

    }

    // add outer blades to the individual blade groups
    bladeBottomLeftGroup.add(bladesOuter[0]);
    bladeBottomRightGroup.add(bladesOuter[1]);
    bladeTopLeftGroup.add(bladesOuter[2]);
    bladeTopRightGroup.add(bladesOuter[3]);

    // add inner blades to the individual blade groups
    bladeBottomLeftGroup.add(bladesInner[0]);
    bladeBottomLeftGroup.add(bladesInner[1]);
    bladeBottomLeftGroup.add(bladesInner[2]);
    bladeBottomLeftGroup.add(bladesInner[3]);

    bladeBottomRightGroup.add(bladesInner[4]);
    bladeBottomRightGroup.add(bladesInner[5]);
    bladeBottomRightGroup.add(bladesInner[6]);
    bladeBottomRightGroup.add(bladesInner[7]);

    bladeTopLeftGroup.add(bladesInner[8]);
    bladeTopLeftGroup.add(bladesInner[9]);
    bladeTopLeftGroup.add(bladesInner[10]);
    bladeTopLeftGroup.add(bladesInner[11]);

    bladeTopRightGroup.add(bladesInner[12]);
    bladeTopRightGroup.add(bladesInner[13]);
    bladeTopRightGroup.add(bladesInner[14]);
    bladeTopRightGroup.add(bladesInner[15]);

    // moves the quadCopterGroup to a default location and adds its other groups
    quadCopterGroup.position.set(0, 2, 3);
    quadCopterGroup.add(bodyMesh);
    quadCopterGroup.add(frontMesh);
    quadCopterGroup.add(armGroup);

    // SPINNING RADAR DISH FOR QUADCOPTER
    let radarGeom = new T.CylinderGeometry( 0.3, 0.3, 1, 32);
    let radarMaterial = new T.MeshBasicMaterial( {color: 0x0000ff} );
    let radar = new T.Mesh( radarGeom, radarMaterial );

    let radarFront = new T.Mesh(frontGeom, frontMaterial);

    radar.position.set(0, 0.5, 0);
    radarFront.rotateX(Math.PI/2);
    radarFront.position.set(0, 1, 0);

    worldGroup.add(radar);
    worldGroup.add(radarFront);

    // SECOND FLYING OBJECT AND SECOND WORLD
    let worldGroupSecond = new T.Group();

    worldGroupSecond.position.set(-4, 0, -7);

    // UNIQUE RADAR 2
    let baseUniqueRadarGeom = new T.CylinderGeometry(0.1, 0.5, 1.5, 18, 24);
    let baseUniqueMaterial = new T.MeshStandardMaterial({color:"gray", roughness: 0.6});
    let baseUniqueMesh = new T.Mesh(baseUniqueRadarGeom, baseUniqueMaterial);

    baseUniqueMesh.position.y = 0.75;

    let rotatingRadarGroup = new T.Group();
    rotatingRadarGroup.position.set(0.1, 1.4, 0);
    rotatingRadarGroup.rotateZ(Math.PI/2);

    let uniqueRadarGeom = new T.CylinderGeometry(0.35, 0.65, 0.75, 18, 24);
    let uniqueRadarMaterial = new T.MeshStandardMaterial({color: "silver"});
    let uniqueRadarMesh = new T.Mesh(uniqueRadarGeom, uniqueRadarMaterial);

    let uniqueRadarArrowGeom = new T.ConeGeometry(0.25, 1, 12, 16);
    let uniqueRadarArrowMaterial = new T.MeshStandardMaterial({color: "red"});
    let uniqueRadarArrowMesh = new T.Mesh(uniqueRadarArrowGeom, uniqueRadarArrowMaterial);

    uniqueRadarArrowMesh.position.y = -0.5;
    uniqueRadarArrowMesh.rotateX(Math.PI);

    rotatingRadarGroup.add(uniqueRadarMesh);
    rotatingRadarGroup.add(uniqueRadarArrowMesh);

    // UFO
    let ufoGroup = new T.Group();
    ufoGroup.position.set(4, 1.4, 0);

    let ufoGeom = new T.CylinderGeometry(0.2, 0.5, 0.3, 18, 24);
    let ufoMaterial = new T.MeshStandardMaterial({color:"silver", emissive: "lightgray", emissiveIntensity: 0.2});
    
    let ufoBaseMesh = new T.Mesh(ufoGeom, ufoMaterial);
    ufoBaseMesh.rotateZ(Math.PI);

    let ufoTopMesh = new T.Mesh(ufoGeom, ufoMaterial);
    ufoTopMesh.position.y = 0.3;

    let axelGeom = new T.CylinderGeometry(0.07, 0.07, 0.6);
    let axelMaterial = new T.MeshStandardMaterial({color: "cyan"});

    let axelMesh = new T.Mesh(axelGeom, axelMaterial);
    axelMesh.position.set(0, 0.7, 0);

    let ufoBladeGeom = new T.BoxGeometry(0.1, 0.2, 0.6);
    let ufoBladeMaterial = new T.MeshStandardMaterial({color: "red"});

    let ufoBladeGroup = new T.Group();
    ufoBladeGroup.position.set(0, 1, 0);

    let ufoBlades = [];
    for (let i = 0; i < 4; i++) {
        let curUfoBlade = new T.Mesh(ufoBladeGeom, ufoBladeMaterial);
        curUfoBlade.rotateZ(Math.PI/2);
        ufoBlades.push(curUfoBlade);
        ufoBladeGroup.add(curUfoBlade);
    }
    ufoBlades[0].position.z = 0.3;
    ufoBlades[1].position.z = -0.3;

    ufoBlades[2].rotateX(Math.PI/2);
    ufoBlades[2].position.x = 0.3;

    ufoBlades[3].rotateX(Math.PI/2);
    ufoBlades[3].position.x = -0.3;

    ufoGroup.add(ufoBaseMesh);
    ufoGroup.add(ufoTopMesh);
    ufoGroup.add(axelMesh);
    ufoGroup.add(ufoBladeGroup);

    worldGroupSecond.add(baseUniqueMesh);
    worldGroupSecond.add(rotatingRadarGroup);
    worldGroupSecond.add(ufoGroup);


    let axesHelper = new T.AxesHelper(2);
    scene.add(axesHelper);

    scene.add(worldGroup);
    scene.add(worldGroupSecond);

    let isUfoMovingUp = true;
    let ufoVelocity = 0.005;
    let previousAngle = 0;

    function animateLoop() {
        //** EXAMPLE CODE - STUDENT SHOULD REPLACE */

        // rotates the quadcopter and its radar
        worldGroup.rotateY(-0.005);
        bladeBottomLeftGroup.rotateY(0.3);
        bladeBottomRightGroup.rotateY(0.3);
        bladeTopRightGroup.rotateY(0.3);
        bladeTopLeftGroup.rotateY(0.3);

        // moves ufo up and down
        if(isUfoMovingUp) {

            if (ufoGroup.position.y >= 4) {
                isUfoMovingUp = false;
                ufoVelocity = -Math.abs(ufoVelocity);
            }

            ufoBladeGroup.rotateY(0.2);
            
        } else {

            ufoBladeGroup.rotateY(-0.15);
            if (ufoGroup.position.y <= 1.4) {
                isUfoMovingUp = true;
                ufoVelocity = Math.abs(ufoVelocity);
            }

        }

        ufoGroup.position.y += ufoVelocity;

        // rotates the radar to follow the ufo
        let angle = Math.atan2(ufoGroup.position.y-rotatingRadarGroup.position.y, ufoGroup.position.x - rotatingRadarGroup.position.x);
        rotatingRadarGroup.rotateZ(angle-previousAngle);
        previousAngle = angle;

        renderer.render(scene,camera);
        window.requestAnimationFrame(animateLoop);
    }
    animateLoop();
}
onWindowOnload(quadcopter);
