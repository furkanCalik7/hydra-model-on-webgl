var canvas;
var gl;
var vPosition;

var near = -4;
var far = 4;
var radius = 1.0;

var X_DIRECTION = {
  theta: -901.6597,
  phi: 93701.16192,
};

var theta = X_DIRECTION.theta;
var phi = X_DIRECTION.phi;
var dr = (5.0 * Math.PI) / 180.0;

var left = -4.0;
var right = 4.0;
var ytop = 4.0;
var bottom = -4.0;

var eye;

var BODY_MESH;
var TAIL1_MESH;
var TAIL2_MESH;
var TAIL3_MESH;
var TAIL4_MESH;
var NECK11_MESH;
var NECK21_MESH;
var NECK31_MESH;
var NECK12_MESH;
var NECK22_MESH;
var NECK32_MESH;
var NECK13_MESH;
var NECK23_MESH;
var NECK33_MESH;
var NECK14_MESH;
var NECK24_MESH;
var NECK34_MESH;
var NECK15_MESH;
var NECK25_MESH;
var NECK35_MESH;
var HEAD1_MESH;
var HEAD2_MESH;
var HEAD3_MESH;
var EYE1_MESH;
var EYE2_MESH;
var EYE3_MESH;
var MOUTH1_MESH;
var MOUTH2_MESH;
var MOUTH3_MESH;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(1.0, 1.0, 0.0);

// Tranformation Matrix variables
var modelViewMatrix, projectionMatrix;
var modelViewLoc, projectionLoc;
var matrixStack = [];

var slider_bodyX = 0;
var slider_bodyY = 0;
var slider_bodyZ = 0;
var slider_bodyRY = 0;
var sliderValue5 = 0;
var sliderValue6 = 0;
var sliderValue7 = 0;
var sliderValue8 = 0;

// The angles of joints
var thetaAngle = [];

// Mesh IDs
var BODY_ID = 0;
var TAIL1_ID = 1;
var TAIL2_ID = 2;
var TAIL3_ID = 3;
var TAIL4_ID = 4;
var NECK11_ID = 5;
var NECK21_ID = 6;
var NECK31_ID = 7;
var NECK12_ID = 8;
var NECK22_ID = 9;
var NECK32_ID = 10;
var NECK13_ID = 11;
var NECK23_ID = 12;
var NECK33_ID = 13;
var NECK14_ID = 14;
var NECK24_ID = 15;
var NECK34_ID = 16;
var NECK15_ID = 17;
var NECK25_ID = 18;
var NECK35_ID = 19;
var HEAD1_ID = 20;
var HEAD2_ID = 21;
var HEAD3_ID = 22;
var EYE1_ID = 23;
var EYE2_ID = 24;
var EYE3_ID = 25;
var MOUTH1_ID = 26;
var MOUTH2_ID = 27;
var MOUTH3_ID = 28;

// Hydra nodes array
var numOfNodes = 2;
var hydraFigure = [];
for (var i = 0; i < numOfNodes; i++) {
  hydraFigure[i] = createNode(null, null, null, null);
}
//-------------------------------------------

function scale4(a, b, c) {
  var result = mat4();
  result[0][0] = a;
  result[1][1] = b;
  result[2][2] = c;
  return result;
}

//-------------------------------------------
function createNode(transform, render, sibling, child) {
  var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
  };
  return node;
}

function initHydraNodes(id) {
  var m = mat4();
  switch (id) {
    case BODY_ID:
      m = mult(m, scale4(1.5, 3, 3));
      m = mult(m, translate(-0.5, 0.35, 0));
      hydraFigure[BODY_ID] = createNode(m, bodyRender, null, TAIL1_ID);
      var m = mat4();
      break;
    case TAIL1_ID:
      m = translate(0.6, -0.15, 0);
      hydraFigure[TAIL1_ID] = createNode(m, tail1Render, NECK11_ID, TAIL2_ID);
      var m = mat4();
      break;
    case TAIL2_ID:
      m = translate(0.33, -0.06, 0);
      m = hydraFigure[TAIL2_ID] = createNode(m, tail2Render, null, TAIL3_ID);
      var m = mat4();
      break;
    case TAIL3_ID:
      m = translate(0.29, 0.13, 0);
      m = hydraFigure[TAIL3_ID] = createNode(m, tail3Render, null, TAIL4_ID);
      var m = mat4();
      break;
    case TAIL4_ID:
      m = scale4(0.7, 0.7, 0.7);
      m = mult(m, translate(0.23, 0.2, 0));
      m = hydraFigure[TAIL4_ID] = createNode(m, tail4Render, null, null);
      var m = mat4();
      break;
    case NECK11_ID:
      m = translate(-0.38, 0.35, 0.095);
      m = hydraFigure[NECK11_ID] = createNode(
        m,
        neck11Render,
        NECK21_ID,
        NECK12_ID
      );
      var m = mat4();
      break;
    case NECK21_ID:
      m = translate(-0.38, 0.35, 0);
      m = hydraFigure[NECK21_ID] = createNode(
        m,
        neck21Render,
        NECK31_ID,
        NECK22_ID
      );
      var m = mat4();
      break;
    case NECK31_ID:
      m = translate(-0.38, 0.35, -0.095);
      m = hydraFigure[NECK31_ID] = createNode(m, neck31Render, null, NECK32_ID);
      var m = mat4();
      break;
    case NECK12_ID:
      m = translate(-0.05, 0.16, 0.002);
      m = hydraFigure[NECK12_ID] = createNode(m, neck12Render, null, NECK13_ID);
      var m = mat4();
      break;
    case NECK22_ID:
      m = translate(-0.05, 0.16, 0.002);
      m = hydraFigure[NECK22_ID] = createNode(m, neck22Render, null, NECK23_ID);
      var m = mat4();
      break;
    case NECK32_ID:
      m = translate(-0.05, 0.16, 0.002);
      m = hydraFigure[NECK32_ID] = createNode(m, neck32Render, null, NECK33_ID);
      var m = mat4();
      break;
    case NECK13_ID:
      m = mult(m, translate(-0.075, 0.17, 0.002));
      m = hydraFigure[NECK13_ID] = createNode(m, neck13Render, null, NECK14_ID);
      var m = mat4();
      break;
    case NECK23_ID:
      m = mult(m, translate(-0.056, 0.12, 0.002));
      m = hydraFigure[NECK23_ID] = createNode(m, neck23Render, null, NECK24_ID);
      var m = mat4();
      break;
    case NECK33_ID:
      m = mult(m, translate(-0.056, 0.12, 0.002));
      m = hydraFigure[NECK33_ID] = createNode(m, neck33Render, null, NECK34_ID);
      var m = mat4();
      break;
    case NECK14_ID:
      m = mult(m, translate(-0.065, 0.07, 0.002));
      m = hydraFigure[NECK14_ID] = createNode(m, neck14Render, null, NECK15_ID);
      var m = mat4();
      break;
    case NECK24_ID:
      m = mult(m, translate(-0.065, 0.07, 0.002));
      m = hydraFigure[NECK24_ID] = createNode(m, neck24Render, null, NECK25_ID);
      var m = mat4();
      break;
    case NECK34_ID:
      m = mult(m, translate(-0.065, 0.07, 0.002));
      m = hydraFigure[NECK34_ID] = createNode(m, neck34Render, null, NECK35_ID);
      var m = mat4();
      break;
    case NECK15_ID:
      m = mult(m, translate(-0.09, 0.027, 0.004));
      m = hydraFigure[NECK15_ID] = createNode(m, neck15Render, null, HEAD1_ID);
      var m = mat4();
      break;
    case NECK25_ID:
      m = mult(m, translate(-0.09, 0.027, 0.004));
      m = hydraFigure[NECK25_ID] = createNode(m, neck25Render, null, HEAD2_ID);
      var m = mat4();
      break;
    case NECK35_ID:
      m = mult(m, translate(-0.09, 0.027, 0.004));
      m = hydraFigure[NECK35_ID] = createNode(m, neck35Render, null, HEAD3_ID);
      var m = mat4();
      break;
    case HEAD1_ID:
      m = mult(m, translate(-0.09, 0.027, 0.004));
      m = hydraFigure[HEAD1_ID] = createNode(m, head1Render, null, EYE1_ID);
      var m = mat4();
      break;
    case HEAD2_ID:
      m = mult(m, translate(-0.09, 0.027, 0.004));
      m = hydraFigure[HEAD2_ID] = createNode(m, head2Render, null, EYE2_ID);
      var m = mat4();
      break;
    case HEAD3_ID:
      m = mult(m, translate(-0.09, 0.027, 0.004));
      m = hydraFigure[HEAD3_ID] = createNode(m, head3Render, null, EYE3_ID);
      var m = mat4();
      break;
    case EYE1_ID:
      m = mult(m, translate(-0.02, 0.055, 0));
      m = hydraFigure[EYE1_ID] = createNode(m, eye1Render, MOUTH1_ID, null);
      var m = mat4();
      break;
    case EYE2_ID:
      m = mult(m, translate(-0.02, 0.055, 0));
      m = hydraFigure[EYE2_ID] = createNode(m, eye2Render, MOUTH2_ID, null);
      var m = mat4();
      break;
    case EYE3_ID:
      m = mult(m, translate(-0.02, 0.055, 0));
      m = hydraFigure[EYE3_ID] = createNode(m, eye3Render, MOUTH3_ID, null);
      var m = mat4();
      break;
    case MOUTH1_ID:
      m = mult(m, translate(-0.08, -0.03, 0.004));
      m = hydraFigure[MOUTH1_ID] = createNode(m, mouth1Render, null, null);
      var m = mat4();
      break;
    case MOUTH2_ID:
      m = mult(m, translate(-0.08, -0.03, 0.004));
      m = hydraFigure[MOUTH2_ID] = createNode(m, mouth2Render, null, null);
      var m = mat4();
      break;
    case MOUTH3_ID:
      m = mult(m, translate(-0.08, -0.03, 0.004));
      m = hydraFigure[MOUTH3_ID] = createNode(m, mouth3Render, null, null);
      var m = mat4();
      break;
  }
}

var program;

function preorder(id) {
  if (id == null) return;
  matrixStack.push(modelViewMatrix);
  modelViewMatrix = mult(modelViewMatrix, hydraFigure[id].transform);
  hydraFigure[id].render();
  if (hydraFigure[id].child != null) {
    preorder(hydraFigure[id].child);
  }
  modelViewMatrix = matrixStack.pop();
  if (hydraFigure[id].sibling != null) {
    preorder(hydraFigure[id].sibling);
  }
}

var instanceMatrix;

function bodyRender() {
  instanceMatrix = rotate(60, 1, 0, 0);
  instanceMatrix = mult(
    instanceMatrix,
    translate(slider_bodyX, slider_bodyY - 0.5, slider_bodyZ)
  );
  instanceMatrix = mult(instanceMatrix, rotate(slider_bodyRY, 0, 1, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, BODY_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    BODY_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, BODY_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    BODY_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function tail1Render() {
  instanceMatrix = translate(-0.3, 0.075, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[TAIL1_ID], 0, 0, 1));

  instanceMatrix = mult(instanceMatrix, translate(0.3, -0.075, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, TAIL1_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    TAIL1_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TAIL1_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    TAIL1_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function tail2Render() {
  instanceMatrix = translate(-0.12, -0.02, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[TAIL2_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(0.12, 0.02, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, TAIL2_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    TAIL2_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TAIL2_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    TAIL2_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function tail3Render() {
  instanceMatrix = translate(-0.1, -0.07, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[TAIL3_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(0.1, 0.07, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, TAIL3_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    TAIL3_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TAIL3_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    TAIL3_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function tail4Render() {
  instanceMatrix = translate(-0.07, -0.04, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[TAIL4_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(0.07, 0.04, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, TAIL4_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    TAIL4_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TAIL4_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    TAIL4_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck11Render() {
  instanceMatrix = translate(0.03, -0.08, 2);
  // Angle value
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK11_ID], 0, 0, 1));

  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.08, -2));

  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK11_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK11_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK11_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK11_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck21Render() {
  instanceMatrix = translate(0.03, -0.08, 2);
  // Angle value
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK21_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.08, -2));

  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK21_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK21_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK21_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK21_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck31Render() {
  instanceMatrix = translate(0.03, -0.08, 2);
  // Angle value
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK31_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.08, -2));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK31_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK31_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK31_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK31_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck12Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.05, -0.1, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK12_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.05, 0.1, 0));
  instanceMatrix = mult(instanceMatrix, scale4(0.7, 0.7, 0.7));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK21_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK21_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK21_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK21_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck22Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.05, -0.1, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK22_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.05, 0.1, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK22_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK22_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK22_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK22_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck32Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.05, -0.1, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK32_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.05, 0.1, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK32_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK32_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK32_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK32_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck13Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.05, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK13_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.05, 0));
  instanceMatrix = mult(instanceMatrix, scale4(1.4, 1.4, 1.4));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK13_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK13_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK13_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK13_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck23Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.05, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK23_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.05, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK23_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK23_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK23_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK23_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck33Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.05, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK33_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.05, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK33_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK33_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK33_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK33_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck14Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.027, -0.02, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK14_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.027, 0.02, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK14_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK14_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK14_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK14_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck24Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.027, -0.02, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK24_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.027, 0.02, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK24_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK24_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK24_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK24_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function neck34Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.027, -0.02, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK34_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.027, 0.02, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK34_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK34_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK34_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK34_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck15Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.05, -0.01, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK15_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.05, 0.01, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK15_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK15_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK15_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK15_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function neck25Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.05, -0.01, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK25_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.05, 0.01, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK25_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK25_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK25_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK25_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function neck35Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.05, -0.01, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[NECK35_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.05, 0.01, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK35_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    NECK35_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NECK35_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    NECK35_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function head1Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.01, 0);
  instanceMatrix = mult(instanceMatrix, rotate(0, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.01, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, HEAD1_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    HEAD1_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, HEAD1_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    HEAD1_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function head2Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.01, 0);
  instanceMatrix = mult(instanceMatrix, rotate(0, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.01, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, HEAD2_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    HEAD2_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, HEAD2_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    HEAD2_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function head3Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.01, 0);
  instanceMatrix = mult(instanceMatrix, rotate(0, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.01, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, HEAD3_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    HEAD3_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, HEAD3_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    HEAD3_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function eye1Render() {
  instanceMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, EYE1_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    EYE1_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EYE1_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    EYE1_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function eye2Render() {
  instanceMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, EYE2_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    EYE2_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EYE2_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    EYE2_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function eye3Render() {
  instanceMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, EYE3_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    EYE3_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EYE3_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    EYE3_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function mouth1Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[MOUTH1_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, MOUTH1_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    MOUTH1_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, MOUTH1_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    MOUTH1_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function mouth2Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[MOUTH2_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, MOUTH2_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    MOUTH2_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, MOUTH2_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    MOUTH2_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function mouth3Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[MOUTH3_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, MOUTH3_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    MOUTH3_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, MOUTH3_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    MOUTH3_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function meshInitilization() {
  BODY_MESH = new OBJ.Mesh($("#body_data").html());
  TAIL1_MESH = new OBJ.Mesh($("#tail1_data").html());
  TAIL2_MESH = new OBJ.Mesh($("#tail2_data").html());
  TAIL3_MESH = new OBJ.Mesh($("#tail3_data").html());
  TAIL4_MESH = new OBJ.Mesh($("#tail4_data").html());
  NECK11_MESH = new OBJ.Mesh($("#neck1_data").html());
  NECK21_MESH = new OBJ.Mesh($("#neck1_data").html());
  NECK31_MESH = new OBJ.Mesh($("#neck1_data").html());
  NECK12_MESH = new OBJ.Mesh($("#neck2_data").html());
  NECK22_MESH = new OBJ.Mesh($("#neck2_data").html());
  NECK32_MESH = new OBJ.Mesh($("#neck2_data").html());
  NECK13_MESH = new OBJ.Mesh($("#neck3_data").html());
  NECK23_MESH = new OBJ.Mesh($("#neck3_data").html());
  NECK33_MESH = new OBJ.Mesh($("#neck3_data").html());
  NECK14_MESH = new OBJ.Mesh($("#neck4_data").html());
  NECK24_MESH = new OBJ.Mesh($("#neck4_data").html());
  NECK34_MESH = new OBJ.Mesh($("#neck4_data").html());
  NECK15_MESH = new OBJ.Mesh($("#neck5_data").html());
  NECK25_MESH = new OBJ.Mesh($("#neck5_data").html());
  NECK35_MESH = new OBJ.Mesh($("#neck5_data").html());
  HEAD1_MESH = new OBJ.Mesh($("#head1_data").html());
  HEAD2_MESH = new OBJ.Mesh($("#head1_data").html());
  HEAD3_MESH = new OBJ.Mesh($("#head1_data").html());
  EYE1_MESH = new OBJ.Mesh($("#eye_data").html());
  EYE2_MESH = new OBJ.Mesh($("#eye_data").html());
  EYE3_MESH = new OBJ.Mesh($("#eye_data").html());
  MOUTH1_MESH = new OBJ.Mesh($("#mouth_data").html());
  MOUTH2_MESH = new OBJ.Mesh($("#mouth_data").html());
  MOUTH3_MESH = new OBJ.Mesh($("#mouth_data").html());

  OBJ.initMeshBuffers(gl, BODY_MESH);
  initHydraNodes(BODY_ID);
  OBJ.initMeshBuffers(gl, TAIL1_MESH);
  initHydraNodes(TAIL1_ID);
  OBJ.initMeshBuffers(gl, TAIL2_MESH);
  initHydraNodes(TAIL2_ID);
  OBJ.initMeshBuffers(gl, TAIL3_MESH);
  initHydraNodes(TAIL3_ID);
  OBJ.initMeshBuffers(gl, TAIL4_MESH);
  initHydraNodes(TAIL4_ID);
  OBJ.initMeshBuffers(gl, NECK11_MESH);
  initHydraNodes(NECK11_ID);
  OBJ.initMeshBuffers(gl, NECK21_MESH);
  initHydraNodes(NECK21_ID);
  OBJ.initMeshBuffers(gl, NECK31_MESH);
  initHydraNodes(NECK31_ID);
  OBJ.initMeshBuffers(gl, NECK12_MESH);
  initHydraNodes(NECK12_ID);
  OBJ.initMeshBuffers(gl, NECK22_MESH);
  initHydraNodes(NECK22_ID);
  OBJ.initMeshBuffers(gl, NECK32_MESH);
  initHydraNodes(NECK32_ID);
  OBJ.initMeshBuffers(gl, NECK13_MESH);
  initHydraNodes(NECK13_ID);
  OBJ.initMeshBuffers(gl, NECK23_MESH);
  initHydraNodes(NECK23_ID);
  OBJ.initMeshBuffers(gl, NECK33_MESH);
  initHydraNodes(NECK33_ID);
  OBJ.initMeshBuffers(gl, NECK14_MESH);
  initHydraNodes(NECK14_ID);
  OBJ.initMeshBuffers(gl, NECK24_MESH);
  initHydraNodes(NECK24_ID);
  OBJ.initMeshBuffers(gl, NECK34_MESH);
  initHydraNodes(NECK34_ID);
  OBJ.initMeshBuffers(gl, NECK15_MESH);
  initHydraNodes(NECK15_ID);
  OBJ.initMeshBuffers(gl, NECK25_MESH);
  initHydraNodes(NECK25_ID);
  OBJ.initMeshBuffers(gl, NECK35_MESH);
  initHydraNodes(NECK35_ID);
  OBJ.initMeshBuffers(gl, HEAD1_MESH);
  initHydraNodes(HEAD1_ID);
  OBJ.initMeshBuffers(gl, HEAD2_MESH);
  initHydraNodes(HEAD2_ID);
  OBJ.initMeshBuffers(gl, HEAD3_MESH);
  initHydraNodes(HEAD3_ID);
  OBJ.initMeshBuffers(gl, EYE1_MESH);
  initHydraNodes(EYE1_ID);
  OBJ.initMeshBuffers(gl, EYE2_MESH);
  initHydraNodes(EYE2_ID);
  OBJ.initMeshBuffers(gl, EYE3_MESH);
  initHydraNodes(EYE3_ID);
  OBJ.initMeshBuffers(gl, MOUTH1_MESH);
  initHydraNodes(MOUTH1_ID);
  OBJ.initMeshBuffers(gl, MOUTH2_MESH);
  initHydraNodes(MOUTH2_ID);
  OBJ.initMeshBuffers(gl, MOUTH3_MESH);
  initHydraNodes(MOUTH3_ID);
}

window.onload = function init() {
  const canvas = document.createElement("canvas");
  canvas.height = 1000;
  canvas.width = 1000;
  $("#canvas-holder").append(canvas);
  $("#canvas-holder").css("cursor", "none");
  gl = canvas.getContext("webgl");
  if (!gl) {
    alert("WebGL isn't available");
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Hydra Initilazition programs
  constructCoordinateSystem();
  modelViewMatrix = mat4();

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  meshInitilization();

  vPosition = gl.getAttribLocation(program, "vPosition");
  modelViewLoc = gl.getUniformLocation(program, "modelViewMatrix");
  projectionLoc = gl.getUniformLocation(program, "projectionMatrix");

  document.getElementById("Button1").onclick = function () {
    near *= 1.1;
    far *= 1.1;
  };
  document.getElementById("Button2").onclick = function () {
    near *= 0.9;
    far *= 0.9;
  };
  document.getElementById("Button3").onclick = function () {
    radius *= 1.1;
  };
  document.getElementById("Button4").onclick = function () {
    radius *= 0.9;
  };
  document.getElementById("Button5").onclick = function () {
    theta += dr * 2;
  };
  document.getElementById("Button6").onclick = function () {
    theta -= dr * 2;
  };
  document.getElementById("Button7").onclick = function () {
    phi += dr;
  };
  document.getElementById("Button8").onclick = function () {
    phi -= dr;
  };

  render();
};

var render = function () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  eye = vec3(
    radius * Math.sin(phi),
    radius * Math.sin(theta),
    radius * Math.cos(phi)
  );

  mvMatrix = lookAt(eye, vec3(0, 0, 0), vec3(0, 1, 0));
  pMatrix = ortho(left, right, bottom, ytop, near, far);

  modelViewMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, mvMatrix);

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  sliderInitilization();
  preorder(BODY_ID);

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));

  requestAnimFrame(render);
};

function sliderInitilization() {
  var slider1 = document.getElementById("slider_bodyX");
  slider_bodyX = slider1.value;
  var slider2 = document.getElementById("slider_bodyY");
  slider_bodyY = slider2.value;
  var slider3 = document.getElementById("slider_bodyZ");
  slider_bodyZ = slider3.value;
  var slider4 = document.getElementById("slider_bodyRY");
  slider_bodyRY = slider4.value;
  var slider5 = document.getElementById("tail1_theta");
  thetaAngle[TAIL1_ID] = slider5.value;
  var slider6 = document.getElementById("tail2_theta");
  thetaAngle[TAIL2_ID] = slider6.value;
  var slider7 = document.getElementById("tail3_theta");
  thetaAngle[TAIL3_ID] = slider7.value;
  var slider8 = document.getElementById("tail4_theta");
  thetaAngle[TAIL4_ID] = slider8.value;
  var slider9 = document.getElementById("neck1_theta");
  thetaAngle[NECK11_ID] = slider9.value;
  var slider10 = document.getElementById("neck12_theta");
  thetaAngle[NECK12_ID] = slider10.value;
  var slider10 = document.getElementById("neck13_theta");
  thetaAngle[NECK13_ID] = slider10.value;
  var slider10 = document.getElementById("neck14_theta");
  thetaAngle[NECK14_ID] = slider10.value;
  var slider10 = document.getElementById("neck15_theta");
  thetaAngle[NECK15_ID] = slider10.value;
  var slider10 = document.getElementById("mount1_theta");
  thetaAngle[MOUTH1_ID] = slider10.value;
  var slider10 = document.getElementById("neck2_theta");
  thetaAngle[NECK21_ID] = slider10.value;
  var slider10 = document.getElementById("neck22_theta");
  thetaAngle[NECK22_ID] = slider10.value;
  var slider10 = document.getElementById("neck23_theta");
  thetaAngle[NECK23_ID] = slider10.value;
  var slider10 = document.getElementById("neck24_theta");
  thetaAngle[NECK24_ID] = slider10.value;
  var slider10 = document.getElementById("neck25_theta");
  thetaAngle[NECK25_ID] = slider10.value;
  var slider10 = document.getElementById("mount2_theta");
  thetaAngle[MOUTH2_ID] = slider10.value;
  var slider10 = document.getElementById("neck3_theta");
  thetaAngle[NECK31_ID] = slider10.value;
  var slider10 = document.getElementById("neck32_theta");
  thetaAngle[NECK32_ID] = slider10.value;
  var slider10 = document.getElementById("neck33_theta");
  thetaAngle[NECK33_ID] = slider10.value;
  var slider10 = document.getElementById("neck34_theta");
  thetaAngle[NECK34_ID] = slider10.value;
  var slider10 = document.getElementById("neck35_theta");
  thetaAngle[NECK35_ID] = slider10.value;
  var slider10 = document.getElementById("mount3_theta");
  thetaAngle[MOUTH3_ID] = slider10.value;
}
