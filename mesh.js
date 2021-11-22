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

function quad(a, b, c, d) {
  pointsArray.push(vertices[a]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[b]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[c]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[a]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[c]);
  colorsArray.push(vertexColors[a]);
  pointsArray.push(vertices[d]);
  colorsArray.push(vertexColors[a]);
}

// Each face determines two triangles

function colorCube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}
