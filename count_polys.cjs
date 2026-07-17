const { NodeIO } = require('@gltf-transform/core');
const fs = require('fs');

async function test() {
  const io = new NodeIO();
  const document = await io.read('public/movable_laser_station_uncompressed.glb');
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
}
test();
