var vertexColors = [
  vec4(0.0, 0.0, 0.0, 1.0), // black
  vec4(1.0, 0.0, 0.0, 1.0), // red
  vec4(1.0, 1.0, 0.0, 1.0), // yellow
  vec4(0.0, 1.0, 0.0, 1.0), // green
  vec4(0.0, 0.0, 1.0, 1.0), // blue
  vec4(1.0, 0.0, 1.0, 1.0), // magenta
  vec4(0.0, 1.0, 1.0, 1.0), // cyan
  vec4(1.0, 1.0, 1.0, 1.0), // white
];
// Quad method is sufficient in this form
function quad(a, b, c, d, colorIndex) {
  indeces.push(meshVertexes[a]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(meshVertexes[b]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(meshVertexes[d]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(meshVertexes[b]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(meshVertexes[c]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(meshVertexes[d]);
  colorsArray.push(vertexColors[colorIndex]);
}

// Each face determines two triangles

function colorCube() {
  // Quad to render body of hydra
  quad(18, 21, 10, 3, 1);
  quad(0, 26, 28, 12, 2);
  quad(8, 5, 7, 10, 3);
  quad(25, 13, 1, 19, 4);
  quad(17, 23, 14, 2, 5);
  quad(0, 12, 22, 16, 6);
  quad(16, 22, 23, 17, 7);
  quad(24, 18, 3, 15, 1);
  quad(24, 18, 19, 25, 2);
  quad(12, 28, 30, 22, 3);
  quad(22, 30, 32, 23, 4);
  quad(4, 6, 9, 11, 5);
  quad(1, 8, 20, 19, 6);
  quad(18, 19, 20, 21, 7);
  quad(24, 25, 31, 33, 1);
  quad(30, 31, 33, 32, 2);
  quad(29, 13, 25, 31, 3);
  quad(28, 29, 31, 30, 4);
  quad(6, 7, 10, 9, 4);
  quad(4, 5, 8, 11, 6);
  quad(27, 1, 13, 29, 7);
  quad(26, 27, 29, 28, 1);
  quad(5, 4, 6, 7, 2);
  quad(2, 14, 15, 3, 3);
  quad(2, 3, 10, 9, 5);
  quad(14, 15, 24, 23, 6);
  quad(9, 34, 17, 2, 7);
  quad(34, 35, 16, 17, 1);
  quad(35, 11, 0, 16, 2);
  quad(11, 0, 1, 8, 3);
}
