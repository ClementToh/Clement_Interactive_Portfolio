const { NodeIO } = require('@gltf-transform/core');
const { KHRDracoMeshCompression, KHRLightsPunctual } = require('@gltf-transform/extensions');
const draco3d = require('draco3d');
const fs = require('fs');

async function test() {
  const io = new NodeIO()
    .registerExtensions([KHRDracoMeshCompression, KHRLightsPunctual])
    .registerDependencies({
      'draco3d.decoder': await draco3d.createDecoderModule(),
      'draco3d.encoder': await draco3d.createEncoderModule(),
    });

  try {
    const document = await io.read('public/movable_laser_station.glb');
    
    let vertexCount = 0;
    let triangleCount = 0;
    
    for (const mesh of document.getRoot().listMeshes()) {
      for (const prim of mesh.listPrimitives()) {
        const position = prim.getAttribute('POSITION');
        if (position) {
          vertexCount += position.getCount();
        }
        const indices = prim.getIndices();
        if (indices) {
          triangleCount += indices.getCount() / 3;
        } else if (position) {
          triangleCount += position.getCount() / 3;
        }
      }
    }
    console.log("Vertices:", vertexCount);
    console.log("Triangles:", triangleCount);

    // Remove draco compression
    const dracoExtension = document.createExtension(KHRDracoMeshCompression);
    dracoExtension.dispose();

    await io.write('public/movable_laser_station_uncompressed.glb', document);
    console.log("Saved uncompressed version without Draco.");
  } catch (e) {
    console.error("FAILED TO LOAD:", e.message);
  }
}
test();
