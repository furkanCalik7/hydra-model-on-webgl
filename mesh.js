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

// Red => x
// Yellow => y
// Green => z
function constructCoordinateSystem() {
  for (var i = 0; i < 60; i++) {
    indeces.push(vec3(i * 0.1, 0, 0));
    colorsArray.push(vertexColors[1]);
    indeces.push(vec3(-i * 0.1, 0, 0));
    colorsArray.push(vertexColors[2]);
    indeces.push(vec3(0, i * 0.1, 0));
    colorsArray.push(vertexColors[3]);
    indeces.push(vec3(0, -i * 0.1, 0));
    colorsArray.push(vertexColors[4]);
    indeces.push(vec3(0, 0, i * 0.1));
    colorsArray.push(vertexColors[5]);
    indeces.push(vec3(0, 0, -i * 0.1));
    colorsArray.push(vertexColors[6]);
  }
}

// Quad method is sufficient in this form
function quadBody(a, b, c, d, colorIndex) {
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

function quadTail1(a, b, c, d, colorIndex) {
  indeces.push(tail1Vertexes[a]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail1Vertexes[b]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail1Vertexes[d]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail1Vertexes[b]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail1Vertexes[c]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail1Vertexes[d]);
  colorsArray.push(vertexColors[colorIndex]);
}

function quadTail2(a, b, c, d, colorIndex) {
  indeces.push(tail2Vertexes[a]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail2Vertexes[b]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail2Vertexes[d]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail2Vertexes[b]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail2Vertexes[c]);
  colorsArray.push(vertexColors[colorIndex]);
  indeces.push(tail2Vertexes[d]);
  colorsArray.push(vertexColors[colorIndex]);
}

// Each face determines two triangles
var BODY_STARTING_VERTEX = 360;
var BODY_QUAD_LENGTH = 30;
var BODY_VERTEX_FINISH = BODY_STARTING_VERTEX + BODY_QUAD_LENGTH * 6 - 1;
function body() {
  // Quad to render body of hydra
  quadBody(18, 21, 10, 3, 1);
  quadBody(0, 26, 28, 12, 2);
  quadBody(8, 5, 7, 10, 3);
  quadBody(25, 13, 1, 19, 4);
  quadBody(17, 23, 14, 2, 5);
  quadBody(0, 12, 22, 16, 6);
  quadBody(16, 22, 23, 17, 7);
  quadBody(24, 18, 3, 15, 1);
  quadBody(24, 18, 19, 25, 2);
  quadBody(12, 28, 30, 22, 3);
  quadBody(22, 30, 32, 23, 4);
  quadBody(4, 6, 9, 11, 5);
  quadBody(1, 8, 20, 19, 6);
  quadBody(18, 19, 20, 21, 7);
  quadBody(24, 25, 31, 33, 1);
  quadBody(30, 31, 33, 32, 2);
  quadBody(29, 13, 25, 31, 3);
  quadBody(28, 29, 31, 30, 4);
  quadBody(6, 7, 10, 9, 4);
  quadBody(4, 5, 8, 11, 6);
  quadBody(27, 1, 13, 29, 7);
  quadBody(26, 27, 29, 28, 1);
  quadBody(5, 4, 6, 7, 2);
  quadBody(2, 14, 15, 3, 3);
  quadBody(2, 3, 10, 9, 5);
  quadBody(14, 15, 24, 23, 6);
  quadBody(9, 34, 17, 2, 7);
  quadBody(34, 35, 16, 17, 1);
  quadBody(35, 11, 0, 16, 2);
  quadBody(11, 0, 1, 8, 3);
}
var TAIL1_QUAD_lENGTH = 6;
var TAIL1_VERTEX_LAST = BODY_VERTEX_FINISH + TAIL1_QUAD_lENGTH * 6;
function tail1() {
  quadTail1(0, 1, 3, 2, 1);
  quadTail1(2, 3, 7, 6, 1);
  quadTail1(0, 1, 5, 4, 1);
  quadTail1(6, 4, 0, 2, 1);
  quadTail1(5, 7, 3, 1, 5);
  quadTail1(4, 5, 7, 6, 6);
}

var TAIL2_QUAD_LENGTH = 6;
var TAIL2_VERTEX_LAST = TAIL1_VERTEX_LAST + TAIL2_QUAD_LENGTH * 6;
function tail2() {
  quadTail2(1, 7, 4, 3, 1);
  quadTail2(5, 4, 3, 2, 4);
  quadTail2(0, 6, 7, 1, 2);
  quadTail2(0, 2, 5, 6, 3);
  quadTail2(2, 3, 1, 0, 5);
  quadTail2(7, 4, 5, 6, 5);
}
