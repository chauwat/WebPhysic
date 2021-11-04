var world, bodies = [];
var scene, camera, meshes = [];

// ===========================
// > 1.a Create physics world
// ===========================

world = new CANNON.World();
/*
world.broadphase = new CANNON.NaiveBroadphase();
world.gravity.set(0,0,-10);
*/


// ===========================
// > 1.b Create Scene
// ===========================

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(24, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR);
camera.up.set(0, 0, 1);
scene.add(camera);

// ===========================
// > 2.a Create Physic Ground
// ===========================

var groundMaterial = new CANNON.Material();
var groundShape = new CANNON.Plane();
var groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
groundBody.addShape(groundShape);
world.addBody(groundBody);
bodies.push(groundBody);


// ===========================
// > 2.b Create Visual Ground
// ===========================

var material = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: false });
var ground_geometry = new THREE.PlaneGeometry(1, 1, 4, 4);
var ground_mesh = new THREE.Mesh(ground_geometry, material);
scene.add(ground_mesh);
meshes.push(ground_mesh);

// ===========================
// > 3.a Create Physic Mesh
// ===========================

var mat = new CANNON.Material();
var sphereShape = new CANNON.Sphere(4); // 4 is radius
var shapeBody = new CANNON.Body({
    mass: 10,
    material: mat,
    position: new CANNON.Vec3(0, 0, 4) // x, y, z
});
shapeBody.addShape(sphereShape);
world.addBody(shapeBody);
bodies.push(shapeBody);


// ===========================
// > 3.b Create Visual Mesh
// ===========================

var sphere_geometry = new THREE.SphereGeometry(shapeBody.shapes[0].radius, 32, 32);
// OR                 new THREE.SphereGeometry(sphereShape.radius, 32, 32);
var mesh = new THREE.Mesh(sphere_geometry, material);
var o = shapeBody.shapeOffsets[0];
var q = shapeBody.shapeOrientations[0];
mesh.position.set(o.x, o.y, o.z);
mesh.quaternion.set(q.x, q.y, q.z, q.w);
scene.add(mesh);
meshes.push(mesh);

/*
// MORE AT cannon.demo.js:977 - .shape2mesh
var obj = new THREE.Object3D();
for (; ;) {
    var mesh = new THREE.<>
    mesh.position.set(...);
    mesh.quaternion.set(...);
    obj.add(mesh);
}
*/


// ===========================
// > 3.a Add Physics Info
// ===========================
// groundMaterial is another mat, restitution is bounce
var mat_ground = new CANNON.ContactMaterial(groundMaterial, mat, { friction: 0.1, restitution: 0.1 });
world.addContactMaterial(mat_ground);

// ==================================================================================================================

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updateVisuals();
    renderer.render(scene, camera);
}

function updateVisuals() {
    for (var i = 0; i !== meshes.length; i++) {
        meshes[i].position.copy(bodies[i].position);
        meshes[i].quaternion.copy(bodies[i].quaternion);
    }
}