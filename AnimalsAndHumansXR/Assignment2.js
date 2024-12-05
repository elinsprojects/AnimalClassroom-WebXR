//Elin Jernstrom - 117702181 - MSCIM - CS6105

import * as THREE from './libs/three.module.js';
import { OrbitControls } from './libs/OrbitControls.js';
import { GLTFLoader } from './libs/GLTFLoader.js';
import { VRButton } from './libs/VRButton.js';
import { GUI } from './libs/dat.gui.module.js';
import Stats from "./libs/stats.module.js";

//variables
var renderer;
var scene;
var camera;
var cameraControl;
let loader;
var spotLight;
var spotLight2;
var spotLight3;
var smallDogModel;
let mixers = []; 
let clocks = []; 


////////SCENE RELATED CONTENT: RENDERER, SCENE, CAMERA

//creating the renderer
function createRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(renderer));
    console.log("Renderer created")
}

//creating the scene
function createScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#E2F9FB");
    console.log("Scene created")

}

//creating the camera
function createCamera() {
    camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 23;
    camera.lookAt(scene.position);
    cameraControl = new OrbitControls(camera, renderer.domElement);
    camera.add(listener);
    console.log("Camera created")
}


///////////LIGHTING

function createLight() {
    // Ambient Light but brightest setting
    const light = new THREE.AmbientLight(0xffffff, 1); 
    scene.add(light);
    //hemisphere light on brightest
    const hemis = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(hemis);
    //SPOTLIGHTS 1,2,3 
    spotLight = new THREE.SpotLight(0xffffff, 10);
    spotLight.position.set(7, -2, 0);
    scene.add(spotLight);
    //target on body models
    const spotLightTarget = new THREE.Object3D();
    spotLight.target = spotLightTarget;
    scene.add(spotLightTarget);
    //spotlight 2
    spotLight2 = new THREE.SpotLight(0xffffff, 10);
    spotLight2.position.set(0, 1, -1);
    scene.add(spotLight2);
    //target for spotlight2 for dog and birds
    const spotLightTarget2 = new THREE.Object3D();
    spotLight2.target = spotLightTarget2;
    scene.add(spotLightTarget2);
    //spotlight3
    spotLight3 = new THREE.SpotLight(0xffffff, 10);
    spotLight3.position.set(-7, 1, -1);
    scene.add(spotLight3);
    //target for spotlight3 for balls 
    const spotLightTarget3 = new THREE.Object3D();
    spotLight3.target = spotLightTarget3;
    scene.add(spotLightTarget3);

}

/////////VIDEO LECTURE ON BODY ANATOMY

//variables for video
const video = document.getElementById('video');
video.src = "./assets/body.mp4";
var videoTexture;

function screen(video) {

    //Texture from the video: source https://stackoverflow.com/questions/76191912/how-do-i-map-a-video-texture-onto-a-specific-material-of-a-3d-object-using-three
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    //Size of plane
    const width = 2.5;
    const height = 1.5;
    //new geo
    const geometry = new THREE.PlaneGeometry(width, height);
    //material for texture
    const material = new THREE.MeshBasicMaterial({ map: videoTexture });
    //new mesh with the geom and mat
    const mesh = new THREE.Mesh(geometry, material);
    //position
    mesh.position.y = -1.5;
    mesh.position.z = -2.85;
    //adding to scene
    scene.add(mesh);
}

///////IMAGES AS TEXTURES ON PLANES FOR THE WALLS

//variables for images
const textureLoader = new THREE.TextureLoader();
const imageTexture = textureLoader.load("./assets/celebration.jpg");
const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture });

function image1() {
    //size
    const planeWidth = 2.5;
    const planeHeight = 1.5;
    //geo
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    //mesh with geom and mat
    const planeMesh = new THREE.Mesh(planeGeometry, imageMaterial);
    //Position
    planeMesh.position.set(-5.85, -1.5, -2.8); 
    console.log("Image 1 successfully loaded")
    // Add to scene
    scene.add(planeMesh);
}
//new images with same setup with variations of position and direction for image 2,3,4 and 5 and new variable names
const imageTexture2 = textureLoader.load("./assets/pride.jpg");
const imageMaterial2 = new THREE.MeshBasicMaterial({ map: imageTexture2 });

function image2() {
    const planeWidth = 2.5;
    const planeHeight = 1.5;
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const planeMesh = new THREE.Mesh(planeGeometry, imageMaterial2);
    planeMesh.position.set(5.85, -1.5, -2.8); 
    console.log("Image 2 successfully loaded")
    scene.add(planeMesh);
}

const imageTexture3 = textureLoader.load("./assets/couple.jpg");
const imageMaterial3 = new THREE.MeshBasicMaterial({ map: imageTexture3 });

function image3() {
    const planeWidth = 2.5;
    const planeHeight = 1.5;
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const planeMesh = new THREE.Mesh(planeGeometry, imageMaterial3);
    planeMesh.position.set(5.85, -1.5, 2.8); 
    planeMesh.rotation.y = Math.PI;
    console.log("Image 3 successfully loaded")
    scene.add(planeMesh);
}

const imageTexture4 = textureLoader.load("./assets/kids.jpg");
const imageMaterial4 = new THREE.MeshBasicMaterial({ map: imageTexture4 });

function image4() {
    const planeWidth = 2.5;
    const planeHeight = 1.5;
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const planeMesh = new THREE.Mesh(planeGeometry, imageMaterial4);
    planeMesh.position.set(-5.85, -1.5, 2.8); 
    planeMesh.rotation.y = Math.PI;
    console.log("Image 4 successfully loaded")
    scene.add(planeMesh);
}

const imageTexture5 = textureLoader.load("./assets/woman.jpg");
const imageMaterial5 = new THREE.MeshBasicMaterial({ map: imageTexture5 });

function image5() {
    const planeWidth = 2.5;
    const planeHeight = 1.5;
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const planeMesh = new THREE.Mesh(planeGeometry, imageMaterial5);
    planeMesh.position.set(0, -1.5, 2.8); 
    planeMesh.rotation.y = Math.PI;
    console.log("Image 4 successfully loaded")
    scene.add(planeMesh);
}


/////////MODELS ANIMATED AND STATIONARY

//loading stationary models
function loadClassroom() {
    loader = new GLTFLoader();
    loader.load("./assets/classroom.gltf", function (object) {
        console.log("Classroom is successfully loaded");
        scene.add(object.scene);
    });
}

//body models 1,2,3
function body1() {
    let bodyLoader = new GLTFLoader();
    bodyLoader.load("./assets/body.gltf", function (glb) {
        const bodyModel = glb.scene;
        bodyModel.position.set(8.6, -3.3, 0);
        bodyModel.rotation.set(0, -Math.PI / 2, 0);
        scene.add(bodyModel);
        console.log("Body is successfully loaded");
        //adding target for spotlight
        spotLight.target = bodyModel;

    })
}

function body2() {
    let body2Loader = new GLTFLoader();
    body2Loader.load("./assets/body.gltf", function (glb) {
        const body2Model = glb.scene;
        body2Model.position.set(8.6, -3.3, 1);
        body2Model.rotation.set(0, -Math.PI / 2, 0);
        scene.add(body2Model);
        console.log("Body 2 is successfully loaded");

    })
}

function body3() {
    let body3Loader = new GLTFLoader();
    body3Loader.load("./assets/body.gltf", function (glb) {
        const body3Model = glb.scene;
        body3Model.position.set(8.6, -3.3, -1);
        body3Model.rotation.set(0, -Math.PI / 2, 0);
        scene.add(body3Model);
        console.log("Body 3 is successfully loaded");


    })
}



//creating geometry sphere's with vertex shaders  
//Sources: ource: https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders and Lab14 on canvas

function ball1() {
    const radius = 0.3;
    const widthSegments = 32;
    const heightSegments = 32;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    //Source Lab14
    const vertexShader = `
        varying vec4 col;
        uniform vec4 colour_dark;
        uniform float temp;
        void main() {
            if (position.x * position.y * position.z < 0.0)
                col = colour_dark;
            else
                col = vec4(1.0, 1.0, 1.0, 1.0);
            vec3 newPosition = position * temp;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `;

    //Fragment shader with colour and transparency 
    const fragmentShader = `
    varying vec4 col;
    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
        }
    `;

    //New material using the vertex and fragment shaders
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            colour_dark: { value: new THREE.Color(0x000000) }, 
            temp: { value: 1.0 } 
        }
    });

    //new mesh using the geometry and shader material
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(-8.6, -1, 0);
    spotLight3.target = sphere;

    // Add sphere to the scene
    scene.add(sphere);
}



//source Lab14
function ball2() {
    const radius = 0.3;
    const widthSegments = 32;
    const heightSegments = 32;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // New vertex shader
    const vertexShader2 = `
        varying vec4 col;
        uniform vec4 colour_dark;
        uniform float temp;
        void main() {
            if (position.x * position.y * position.z < 0.0)
                col = colour_dark;
            else
                col = vec4(1.0, 0.4, 0.6, 1.0);
            vec3 newPosition = position * temp;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `;

    //Fragment shader
    const fragmentShader2 = `
    void main() {
    gl_FragColor = vec4(1.0, 0.4, 0.6, 1.0);
    }
    `;

    //New material using the vertex and fragment shaders
    const material2 = new THREE.ShaderMaterial({
        vertexShader: vertexShader2,
        fragmentShader: fragmentShader2,
        uniforms: {
            colour_dark: { value: new THREE.Color(0x000000) }, 
            temp: { value: 1.0 } 
        }
    });

    // Create a mesh using the geometry and shader material
    const sphere2 = new THREE.Mesh(geometry, material2);
    sphere2.position.set(-8.6, -1, -1.5);

    // Add the sphere to the scene
    scene.add(sphere2);
}

//fragment shader source: https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders
function ball3() {
    const radius = 0.3;
    const widthSegments = 32;
    const heightSegments = 32;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // new vertex shader
    const vertexShader3 = `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    // new fragment shader
    const fragmentShader3 = `
        void main() {
            gl_FragColor = vec4(0.0, 0.58, 0.86, 1.0);
        }
    `;

    // new shader material using the vertex and fragment shaders
    const material3 = new THREE.ShaderMaterial({
        vertexShader: vertexShader3,
        fragmentShader: fragmentShader3
    });

    // new mesh using the geometry and shader material
    const sphere3 = new THREE.Mesh(geometry, material3);
    sphere3.position.set(-8.6, -1, 1.5); 

    // Add the sphere to the scene
    scene.add(sphere3);
}

//////ANIMATED OBJECTS
//sources: https://discourse.threejs.org/t/how-do-i-play-a-glb-animation/60970/9

function loadSmallDog() {
    let smallDogLoader = new GLTFLoader();
    smallDogLoader.load("./assets/smallDog.gltf", function (glb) {
        smallDogModel = glb.scene;
        smallDogModel.position.set(-1, -3.3, -1);
        scene.add(smallDogModel);
        console.log("Small Dog is successfully loaded");
        //checking if animated
        if (glb.animations && glb.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(smallDogModel);
            glb.animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.play();
            });

            //calling clock to get correct timing - real time
            mixers.push(mixer);
            clocks.push(new THREE.Clock());
        }
        createPositionAnimalSound();
    }, undefined, function (onError) {
        console.error("Small Dog could not be loaded", onError);
    });
}

function loadBirds() {
    let birdsLoader = new GLTFLoader();
    birdsLoader.load("./assets/birds.gltf", function (glb) {
        const birdsModel = glb.scene;
        birdsModel.position.set(1, -1, -1);
        scene.add(birdsModel);
        console.log("Birds are successfully loaded");

        //checking if animated
        if (glb.animations && glb.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(birdsModel);
            glb.animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.play();
            });
            //calling clock to get correct timing - real time
            mixers.push(mixer);
            clocks.push(new THREE.Clock());
        }
    }, undefined, function (onError) {
        console.error("Birds could not be loaded", onError);
    });
}

//////AUDIO
//sources: Labs

//audio variable listeners
const listener = new THREE.AudioListener();
const animalPosSound = new THREE.PositionalAudio(listener);
const humanMatingCall = new THREE.PositionalAudio(listener);
const humanGossip = new THREE.PositionalAudio(listener);



//audio functions

function createPositionAnimalSound() {
    const audioLoader = new THREE.AudioLoader();
    //loading sound from source
    audioLoader.load('../assets/animals.wav', function (buffer) {
        animalPosSound.setBuffer(buffer)
        animalPosSound.setRefDistance(10)
    });
    //add the spatial source to dog 
    smallDogModel.add(animalPosSound);
}

//play function 
function playPositionalAnimalSound() {
    if (animalPosSound) {
        animalPosSound.play();
    } else {
        console.error("Can not play the animal sounds");
    }
}
//stop function 
function stopPositionalAnimalSound() {
    if (animalPosSound) {
        animalPosSound.stop();
    } else {
        console.error("Can not stop playing the animal sounds");
    }
}

//human mating call sound
function createHumanMatingCall() {
    const audioLoader2 = new THREE.AudioLoader();
    audioLoader2.load('../assets/Netflix.wav', function (buffer) {
        humanMatingCall.setBuffer(buffer)
        humanMatingCall.setRefDistance(10)
    });
}
//play function
function playHumanMatingCall() {
    if (humanMatingCall) {
        humanMatingCall.play();
        console.log("Playing human mating call")
    } else {
        console.error("Can not play the human sounds");
    }
}
//stop function
function stopHumanMatingCall() {
    if (humanMatingCall) {
        humanMatingCall.stop();
    } else {
        console.error("Can not stop playing the human sounds");
    }
}

//human bonding sounds 
function gossipSounds() {
    const audioLoader3 = new THREE.AudioLoader();
    audioLoader3.load('../assets/gossip.wav', function (buffer) {
        humanGossip.setBuffer(buffer)
        humanGossip.setRefDistance(10)
    });
}
//play function
function playGossipSounds() {
    if (humanGossip) {
        humanGossip.play();
        console.log("Playing human mating call")
    } else {
        console.error("Can not play the human sounds");
    }
}
//stop function
function stopGossipSounds() {
    if (humanGossip) {
        humanGossip.stop();
    } else {
        console.error("Can not stop playing the human sounds");
    }
}

//////////////GUI 

// GUI source: lab14
const gui = new GUI();

function controlPanel() {
    // Panel to different audio options
    const audioPanel = gui.addFolder("Animal Positional Audio");
    const animalNoisePlay = {
        play: playPositionalAnimalSound,
    };
    audioPanel.add(animalNoisePlay, "play");
    const animalNoiseStop = {
        stop: stopPositionalAnimalSound,
    };
    audioPanel.add(animalNoiseStop, "stop");
    audioPanel.open();

    //second panel 
    const audioPanel2 = gui.addFolder("Human Mating Call");
    const humanMatingCall = {
        play: playHumanMatingCall,
    };
    audioPanel2.add(humanMatingCall, "play");
    const stopMatingCall = {
        stop: stopHumanMatingCall,
    };
    audioPanel2.add(stopMatingCall, "stop");
    audioPanel2.open();

    //third audio panel 
    const audioPanel3 = gui.addFolder("Human Bonding");
    const playHumanGossip = {
        play: playGossipSounds,
    };
    audioPanel3.add(playHumanGossip, "play");
    const stopHumanGossip = {
        stop: stopGossipSounds,
    };
    audioPanel3.add(stopHumanGossip, "stop");
    audioPanel3.open();


    //VIDEO CONTROL IN PANEL
    const videoPanel = gui.addFolder("Video Control: Anatomy Lecture");

    const playVideo = {
        play: function () {
            video.play();
        },
    };
    videoPanel.add(playVideo, "play");

    const pauseVideo = {
        pause: function () {
            video.pause();
        },
    };
    videoPanel.add(pauseVideo, "pause");
    videoPanel.open();

}

////////////STATS source: https://github.com/mrdoob/stats.js
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

//animate function for stats
function animate() {
    stats.begin();
    stats.end();
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//////INITIALISE AND RENDER 

//init function 
function init() {

    scene = new THREE.Scene();

    createRenderer();
    createCamera();
    createScene();
    createLight();
    createHumanMatingCall();
    gossipSounds();
    controlPanel();
    loadClassroom();
    body1();
    body2();
    body3();
    loadSmallDog();
    loadBirds();
    ball1();
    ball2();
    ball3();
    animate();
    screen(video);
    image1();
    image2();
    image3();
    image4();
    image5();

    document.body.appendChild(renderer.domElement);

    render();
}

//infinite render loop
function render() {
    //for animated figures source: https://discourse.threejs.org/t/animating-multiple-objects-simultaneously/52778/3
    mixers.forEach((mixer, index) => {
        const delta = clocks[index].getDelta();
        mixer.update(delta);
    });
    //for video
    renderer.render(scene, camera);
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (videoTexture) videoTexture.needsUpdate = true;
    }
    cameraControl.update();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

//starting the experience
init();