var canvas;
var gl;
var vPosition;
var vTextCoord;

// Animation variables
var frameArray = []; // Holds the thetas at each frames
var lastIndexFrame = 0;
var lastFrameJSON;
var frameJSON;
var intervalID;

var near = -19.487171000000007;
var far = 19.487171000000007;
var radius = 1.0;



var theta = -0.872664625997;
var phi = 1.570796326794896;
var dr = (5.0 * Math.PI) / 180.0;

var thetaFloor = 0.174570886003;
var phiFloor = 2.617993877994;
var eyeFloor;
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
var LEG11_MESH;
var LEG12_MESH;
var LEG13_MESH;
var LEG21_MESH;
var LEG22_MESH;
var LEG23_MESH;
var LEG31_MESH;
var LEG32_MESH;
var LEG33_MESH;
var LEG34_MESH;
var LEG41_MESH;
var LEG42_MESH;
var LEG43_MESH;
var LEG44_MESH;

var FLOOR_MESH;
var GROUND_MESH;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

// Tranformation Matrix variables
var modelViewMatrix, projectionMatrix;
var modelViewLoc, projectionLoc;
var matrixStack = [];

var slider_bodyX = 0;
var slider_bodyY = 0;
var slider_bodyZ = 0;
var slider_bodyRY = 0;

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
var LEG11_ID = 29;
var LEG12_ID = 30;
var LEG13_ID = 31;
var LEG21_ID = 32;
var LEG22_ID = 33;
var LEG23_ID = 34;
var LEG31_ID = 35;
var LEG32_ID = 36;
var LEG33_ID = 37;
var LEG34_ID = 38;
var LEG41_ID = 39;
var LEG42_ID = 40;
var LEG43_ID = 41;
var LEG44_ID = 42;


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
      m = mult(m, translate(-0.5, 1.2, 0));
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
      m = hydraFigure[NECK31_ID] = createNode(
        m,
        neck31Render,
        LEG11_ID,
        NECK32_ID
      );
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
    case LEG11_ID:
      m = mult(m, translate(-0.2, -0.23, -0.08));
      m = hydraFigure[LEG11_ID] = createNode(
        m,
        leg11Render,
        LEG21_ID,
        LEG12_ID
      );
      var m = mat4();
      console.log(LEG11_ID);
      break;
    case LEG21_ID:
      m = mult(m, translate(-0.2, -0.33, 0.08));
      m = hydraFigure[LEG21_ID] = createNode(
        m,
        leg21Render,
        LEG31_ID,
        LEG22_ID
      );
      var m = mat4();
      console.log(LEG21_ID);
      break;
    case LEG31_ID:
      m = mult(m, translate(0.32, -0.27, 0.105));
      m = hydraFigure[LEG31_ID] = createNode(
        m,
        leg31Render,
        LEG41_ID,
        LEG32_ID
      );
      var m = mat4();
      console.log(LEG31_ID);
      break;

    case LEG41_ID:
      m = mult(m, translate(0.32, -0.27, -0.11));
      m = hydraFigure[LEG41_ID] = createNode(m, leg41Render, null, LEG42_ID);
      var m = mat4();
      console.log(LEG41_ID);
      break;
    case LEG12_ID:
      m = mult(m, translate(-0.11, -0.14, -0.04));
      m = hydraFigure[LEG12_ID] = createNode(m, leg12Render, null, LEG13_ID);
      var m = mat4();
      console.log(LEG12_ID);
      break;
    case LEG22_ID:
      m = mult(m, translate(-0.11, -0.14, 0.04));
      m = hydraFigure[LEG22_ID] = createNode(m, leg22Render, null, LEG23_ID);
      var m = mat4();
      console.log(LEG22_ID);
      break;
    case LEG32_ID:
      m = mult(m, translate(0.1, -0.124, -0.043));
      m = hydraFigure[LEG32_ID] = createNode(m, leg32Render, null, LEG33_ID);
      var m = mat4();
      console.log(LEG32_ID);
      break;
    case LEG42_ID:
      m = mult(m, translate(0.1, -0.124, 0.01));
      m = hydraFigure[LEG42_ID] = createNode(m, leg42Render, null, LEG43_ID);
      var m = mat4();
      break;
    case LEG13_ID:
      m = mult(m, translate(-0.12, -0.04, -0.04));
      m = hydraFigure[LEG13_ID] = createNode(m, leg13Render, null, null);
      var m = mat4();
      break;
    case LEG23_ID:
      m = mult(m, translate(-0.12, -0.04, 0.04));
      m = hydraFigure[LEG23_ID] = createNode(m, leg23Render, null, null);
      var m = mat4();
      break;
    case LEG33_ID:
      m = mult(m, translate(0.05, -0.084, -0.02));
      m = hydraFigure[LEG33_ID] = createNode(m, leg33Render, null, LEG34_ID);
      var m = mat4();
      break;
    case LEG43_ID:
      m = mult(m, translate(0.05, -0.084, 0.0));
      m = hydraFigure[LEG43_ID] = createNode(m, leg43Render, null, LEG44_ID);
      var m = mat4();
      break;
    case LEG34_ID:
      m = mult(m, translate(-0.2, -0.084, 0.075));
      m = hydraFigure[LEG34_ID] = createNode(m, leg34Render, null, null);
      var m = mat4();
      break;
    case LEG44_ID:
      m = mult(m, translate(-0.2, -0.094, -0.015));
      m = hydraFigure[LEG44_ID] = createNode(m, leg44Render, null, null);
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

function groundRender() {
  console.log( "girdi" );
  instanceMatrix = translate(-0.12, -0.02, 0);
  instanceMatrix = mult(instanceMatrix, rotate(0, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(0.12, 0.02, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, GROUND_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    GROUND_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ARRAY_BUFFER, GROUND_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("ground-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, GROUND_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    GROUND_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function floorRender() {
  //console.log( "girdi" );
  instanceMatrix = translate(-0.12, -0.02, 0);
  instanceMatrix = mult(instanceMatrix, rotate(30, 0, 1, 0));
  instanceMatrix = mult(instanceMatrix, translate(0.12, 0.02, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, FLOOR_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    FLOOR_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ARRAY_BUFFER, FLOOR_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("floor-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, FLOOR_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    FLOOR_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
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
  //console.log("reached3");
  gl.bindBuffer(gl.ARRAY_BUFFER, BODY_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );
  //console.log("reached1");

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("body-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, TAIL1_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("neck-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, NECK11_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("neck-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, NECK21_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("neck-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, NECK31_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("neck-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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
  gl.bindBuffer(gl.ARRAY_BUFFER, NECK12_MESH.vertexBuffer);
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

  gl.bindBuffer(gl.ARRAY_BUFFER, TAIL1_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("body-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, HEAD2_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("body-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, HEAD3_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("body-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, EYE1_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("eye-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, EYE2_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("eye-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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

  gl.bindBuffer(gl.ARRAY_BUFFER, EYE3_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("eye-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

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
function leg11Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, 0.175, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[LEG11_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, -0.175, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG11_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG11_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);

  gl.bindBuffer(gl.ARRAY_BUFFER, LEG11_MESH.textureBuffer);
  gl.vertexAttribPointer(vTextCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vTextCoord);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("neck-img")
  );
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG11_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG11_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg21Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, 0.175, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[LEG21_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, -0.175, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG21_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG21_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG21_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG21_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function leg31Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, 0.175, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[LEG31_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, -0.175, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG31_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG31_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG31_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG31_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function leg41Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, 0.175, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[LEG41_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, -0.175, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG41_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG41_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG41_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG41_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg12Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, 0.065, 0);
  instanceMatrix = mult(instanceMatrix, rotate(-thetaAngle[LEG12_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, -0.065, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG12_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG12_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG12_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG12_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg22Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, 0.065, 0);
  instanceMatrix = mult(instanceMatrix, rotate(-thetaAngle[LEG22_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, -0.065, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG22_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG22_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG22_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG22_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function leg32Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(-0.23, 0.035, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[LEG32_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(0.23, -0.035, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG32_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG32_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG32_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG32_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg42Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(-0.23, 0.035, 0);
  instanceMatrix = mult(instanceMatrix, rotate(thetaAngle[LEG42_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(0.23, -0.035, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG42_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG42_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG42_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG42_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg13Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(0, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG13_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG13_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG13_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG13_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg23Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(0, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG23_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG23_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG23_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG23_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg33Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(-thetaAngle[LEG33_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG33_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG33_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG33_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG33_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg43Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(-thetaAngle[LEG43_ID], 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG43_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG43_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG43_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG43_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg34Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(0, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG34_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG34_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG34_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG34_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}
function leg44Render() {
  instanceMatrix = mat4();
  instanceMatrix = translate(0.03, -0.005, 0);
  instanceMatrix = mult(instanceMatrix, rotate(0, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(-0.03, 0.005, 0));
  modelViewMatrix = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, LEG44_MESH.vertexBuffer);
  gl.vertexAttribPointer(
    vPosition,
    LEG44_MESH.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, LEG44_MESH.indexBuffer);
  gl.drawElements(
    gl.TRIANGLES,
    LEG44_MESH.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
}

function meshInitilization() {
  FLOOR_MESH = new OBJ.Mesh($("#floor_data").html());
  BODY_MESH = new OBJ.Mesh($("#body_data").html());
  TAIL1_MESH = new OBJ.Mesh($("#tail1_data").html());
  console.log(TAIL1_MESH);
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

  LEG11_MESH = new OBJ.Mesh($("#leg1_1_data").html());
  LEG12_MESH = new OBJ.Mesh($("#leg1_2_data").html());
  LEG13_MESH = new OBJ.Mesh($("#leg1_3_data").html());
  LEG21_MESH = new OBJ.Mesh($("#leg2_1_data").html());
  LEG22_MESH = new OBJ.Mesh($("#leg2_2_data").html());
  LEG23_MESH = new OBJ.Mesh($("#leg2_3_data").html());
  LEG31_MESH = new OBJ.Mesh($("#leg3_1_data").html());
  LEG32_MESH = new OBJ.Mesh($("#leg3_2_data").html());
  LEG33_MESH = new OBJ.Mesh($("#leg3_3_data").html());
  LEG34_MESH = new OBJ.Mesh($("#leg3_4_data").html());
  LEG41_MESH = new OBJ.Mesh($("#leg4_1_data").html());
  LEG42_MESH = new OBJ.Mesh($("#leg4_2_data").html());
  LEG43_MESH = new OBJ.Mesh($("#leg4_3_data").html());
  LEG44_MESH = new OBJ.Mesh($("#leg4_4_data").html());

  FLOOR_MESH = new OBJ.Mesh($("#floor_data").html());
  GROUND_MESH = new OBJ.Mesh($("#ground_data").html());

  OBJ.initMeshBuffers(gl, FLOOR_MESH);
  OBJ.initMeshBuffers(gl, GROUND_MESH);

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

  OBJ.initMeshBuffers(gl, LEG11_MESH);
  initHydraNodes(LEG11_ID);
  OBJ.initMeshBuffers(gl, LEG12_MESH);
  initHydraNodes(LEG12_ID);
  OBJ.initMeshBuffers(gl, LEG13_MESH);
  initHydraNodes(LEG13_ID);
  OBJ.initMeshBuffers(gl, LEG21_MESH);
  initHydraNodes(LEG21_ID);
  OBJ.initMeshBuffers(gl, LEG22_MESH);
  initHydraNodes(LEG22_ID);
  OBJ.initMeshBuffers(gl, LEG23_MESH);
  initHydraNodes(LEG23_ID);
  OBJ.initMeshBuffers(gl, LEG31_MESH);
  initHydraNodes(LEG31_ID);
  OBJ.initMeshBuffers(gl, LEG32_MESH);
  initHydraNodes(LEG32_ID);
  OBJ.initMeshBuffers(gl, LEG33_MESH);
  initHydraNodes(LEG33_ID);
  OBJ.initMeshBuffers(gl, LEG34_MESH);
  initHydraNodes(LEG34_ID);
  OBJ.initMeshBuffers(gl, LEG41_MESH);
  initHydraNodes(LEG41_ID);
  OBJ.initMeshBuffers(gl, LEG42_MESH);
  initHydraNodes(LEG42_ID);
  OBJ.initMeshBuffers(gl, LEG43_MESH);
  initHydraNodes(LEG43_ID);
  OBJ.initMeshBuffers(gl, LEG44_MESH);
  initHydraNodes(LEG44_ID);
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

  frameJSON = {
    slider_bodyX: slider_bodyX,
    slider_bodyY: slider_bodyY,
    slider_bodyZ: slider_bodyZ,
    slider_bodyRY: slider_bodyRY,
    thetaAngle: thetaAngle,
  };

  $("#run_anim").click(() => {
    intervalID = setInterval(playAnimation, 100);
  });

  $("#save-button").click(() => {
    var data = {
      array: frameArray,
    };

    var json = JSON.stringify(data);

    json = [json];
    var blob1 = new Blob(json, { type: ".json" });

    var isIE = false || !!document.documentMode;
    if (isIE) {
      window.navigator.msSaveBlob(blob1, "data.json");
    } else {
      var url = window.URL || window.webkitURL;
      link = url.createObjectURL(blob1);
      var a = document.createElement("a");
      a.download = "data.json";
      a.href = link;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });

  var frameCounterButton = $("#frame_counter_btn");
  var initialFrameButton = $("#initial_frame_btn");
  frameCounterButton.click(() => {
    AddFrame();
  });
  initialFrameButton.click(() => {
    addInitialFrame();
  });

  $("#load_anim_btn").click(() => {
    loadAnim();
  });

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.53, 0.81, 0.92, 1.0);
  gl.enable(gl.DEPTH_TEST);

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Hydra Initilazition programs
  constructCoordinateSystem();
  modelViewMatrix = mat4();

  var textBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);

  vTextCoord = gl.getAttribLocation(program, "vTextCoord");

  meshInitilization();

  vPosition = gl.getAttribLocation(program, "vPosition");
  modelViewLoc = gl.getUniformLocation(program, "modelViewMatrix");
  projectionLoc = gl.getUniformLocation(program, "projectionMatrix");

  document.getElementById("Button1").onclick = function () {
    near *= 1.1;
    far *= 1.1;
    console.log("near: " + near);
    console.log("far: " + far);
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
    console.log(theta);
  };
  document.getElementById("Button6").onclick = function () {
    theta -= dr * 2;
    console.log(theta);
  };
  document.getElementById("Button7").onclick = function () {
    phi += dr;
    console.log("phi: " + phi);
  };
  document.getElementById("Button8").onclick = function () {
    phi -= dr;
    console.log("phi: " + phi);
  };
  eyeFloor = vec3(radius*Math.sin(thetaFloor)*Math.cos(phiFloor), 
  radius*Math.sin(thetaFloor)*Math.sin(phiFloor), radius*Math.cos(thetaFloor));
  console.log("eye: " + eyeFloor);

  render();
};

var render = function () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

  //console.log("theta: " + theta);
  //console.log("phi: " + phi);
  //console.log("eye: " + eye);

  var floorMatrix = lookAt(eyeFloor, at, up);
  
  mvMatrix = lookAt(eye, at, up);
  pMatrix = ortho(left, right, bottom, ytop, near, far);

  var floorOrtho = mult(pMatrix, floorMatrix);
  floorOrtho = mult(floorOrtho, scale4(10, 10, 10));
  floorOrtho = mult(floorOrtho, translate(0, -5, 0));
  floorOrtho = mult(floorOrtho, rotate(-13 ,1, 0, 0));
  
  
  //console.log("sliderbody: " + slider_bodyRY);
  modelViewMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, floorOrtho);
  
  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));

  floorRender();

  modelViewMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, mvMatrix);

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  sliderInitilization();
  
  

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));

 // groundRender();

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix)); 

  preorder(BODY_ID);

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  frameJSON = {
    slider_bodyX: slider_bodyX,
    slider_bodyY: slider_bodyY,
    slider_bodyZ: slider_bodyZ,
    slider_bodyRY: slider_bodyRY,
    thetaAngle: thetaAngle,
  };

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
  var slider10 = document.getElementById("leg11_theta");
  thetaAngle[LEG11_ID] = slider10.value;
  var slider10 = document.getElementById("leg12_theta");
  thetaAngle[LEG12_ID] = slider10.value;
  var slider10 = document.getElementById("leg21_theta");
  thetaAngle[LEG21_ID] = slider10.value;
  var slider10 = document.getElementById("leg22_theta");
  thetaAngle[LEG22_ID] = slider10.value;
  var slider10 = document.getElementById("leg31_theta");
  thetaAngle[LEG31_ID] = slider10.value;
  var slider10 = document.getElementById("leg32_theta");
  thetaAngle[LEG32_ID] = slider10.value;
  var slider10 = document.getElementById("leg33_theta");
  thetaAngle[LEG33_ID] = slider10.value;
  var slider10 = document.getElementById("leg41_theta");
  thetaAngle[LEG41_ID] = slider10.value;
  var slider10 = document.getElementById("leg42_theta");
  thetaAngle[LEG42_ID] = slider10.value;
  var slider10 = document.getElementById("leg43_theta");
  thetaAngle[LEG43_ID] = slider10.value;

  slider10 = document.getElementById("theta");
  theta = slider10.value;
  slider10 = document.getElementById("phi");
  phi = slider10.value;

  // slider10 = document.getElementById("z");
  // near = slider10.value;
  // far = slider10.value;
  // slider10 = document.getElementById("r");
  // radius = slider10.value;
}

// Animation functions
var frameCounter = 0;
function playAnimation() {
  if (frameArray.length != 0) {
    if (frameCounter == frameArray.length) {
      frameCounter = 0;
      clearInterval(intervalID);
    } else {
      var slider1 = document.getElementById("slider_bodyX");
      slider1.value = frameArray[frameCounter][0];
      var slider2 = document.getElementById("slider_bodyY");
      slider2.value = frameArray[frameCounter][1];
      var slider3 = document.getElementById("slider_bodyZ");
      slider3.value = frameArray[frameCounter][2];
      var slider4 = document.getElementById("slider_bodyRY");
      slider4.value = frameArray[frameCounter][3];

      var slider5 = document.getElementById("tail1_theta");
      slider5.value = frameArray[frameCounter][TAIL1_ID + 4];
      var slider6 = document.getElementById("tail2_theta");
      slider6.value = frameArray[frameCounter][TAIL2_ID + 4];

      var slider7 = document.getElementById("tail3_theta");
      slider7.value = frameArray[frameCounter][TAIL3_ID + 4];

      var slider8 = document.getElementById("tail4_theta");
      slider8.value = frameArray[frameCounter][TAIL4_ID + 4];

      var slider9 = document.getElementById("neck1_theta");

      slider9.value = frameArray[frameCounter][NECK11_ID + 4];

      var slider10 = document.getElementById("neck12_theta");
      slider10.value = frameArray[frameCounter][NECK12_ID + 4];

      var slider10 = document.getElementById("neck13_theta");
      slider10.value = frameArray[frameCounter][NECK13_ID + 4];

      var slider10 = document.getElementById("neck14_theta");
      slider10.value = frameArray[frameCounter][NECK14_ID + 4];

      var slider10 = document.getElementById("neck15_theta");
      slider10.value = frameArray[frameCounter][NECK15_ID + 4];

      var slider10 = document.getElementById("mount1_theta");
      slider10.value = frameArray[frameCounter][MOUTH1_ID + 4];

      var slider10 = document.getElementById("neck2_theta");
      slider10.value = frameArray[frameCounter][NECK21_ID + 4];

      var slider10 = document.getElementById("neck22_theta");
      slider10.value = frameArray[frameCounter][NECK22_ID + 4];

      var slider10 = document.getElementById("neck23_theta");
      slider10.value = frameArray[frameCounter][NECK23_ID + 4];

      var slider10 = document.getElementById("neck24_theta");
      slider10.value = frameArray[frameCounter][NECK24_ID + 4];

      var slider10 = document.getElementById("neck25_theta");

      slider10.value = frameArray[frameCounter][NECK25_ID + 4];

      var slider10 = document.getElementById("mount2_theta");
      slider10.value = frameArray[frameCounter][MOUTH2_ID + 4];

      var slider10 = document.getElementById("neck3_theta");
      slider10.value = frameArray[frameCounter][NECK31_ID + 4];

      var slider10 = document.getElementById("neck32_theta");
      slider10.value = frameArray[frameCounter][NECK32_ID + 4];

      var slider10 = document.getElementById("neck33_theta");
      slider10.value = frameArray[frameCounter][NECK33_ID + 4];

      var slider10 = document.getElementById("neck34_theta");
      slider10.value = frameArray[frameCounter][NECK35_ID + 4];

      var slider10 = document.getElementById("neck35_theta");
      slider10.value = frameArray[frameCounter][NECK35_ID + 4];

      var slider10 = document.getElementById("mount3_theta");
      slider10.value = frameArray[frameCounter][MOUTH3_ID + 4];

      var slider10 = document.getElementById("leg11_theta");
      slider10.value = frameArray[frameCounter][LEG11_ID + 4];

      var slider10 = document.getElementById("leg12_theta");
      slider10.value = frameArray[frameCounter][LEG12_ID + 4];
      var slider10 = document.getElementById("leg21_theta");
      slider10.value = frameArray[frameCounter][LEG21_ID + 4];
      var slider10 = document.getElementById("leg22_theta");
      slider10.value = frameArray[frameCounter][LEG22_ID + 4];
      var slider10 = document.getElementById("leg31_theta");
      slider10.value = frameArray[frameCounter][LEG31_ID + 4];

      var slider10 = document.getElementById("leg32_theta");
      slider10.value = frameArray[frameCounter][LEG32_ID + 4];
      var slider10 = document.getElementById("leg33_theta");
      slider10.value = frameArray[frameCounter][LEG33_ID + 4];
      var slider10 = document.getElementById("leg41_theta");
      slider10.value = frameArray[frameCounter][LEG41_ID + 4];
      var slider10 = document.getElementById("leg42_theta");
      slider10.value = frameArray[frameCounter][LEG42_ID + 4];
      var slider10 = document.getElementById("leg43_theta");
      slider10.value = frameArray[frameCounter][LEG43_ID + 4];

      

      console.log(frameCounter);
      frameCounter++;
    }
  }
}

function AddFrame() {
  var frame_counter = $("#frame_counter");
  if (frame_counter.val() > 0) {
    var lastFrameJSONCLONE = copyJson(lastFrameJSON);
    lastFrameJSON = copyJson(frameJSON);

    var frameJSONCLONE = copyJson(frameJSON);

    var farray = FrameJSONToArray(frameJSONCLONE);
    var flarray = FrameJSONToArray(lastFrameJSONCLONE);

    for (var i = 0; i < frame_counter.val(); i++) {
      var tempArray = [];
      for (var m = 0; m < flarray.length; m++) {
        if (!(farray[m] == null)) {
          tempArray[m] =
            ((parseFloat(farray[m]) - parseFloat(flarray[m])) /
              frame_counter.val()) *
              (i + 1) +
            parseFloat(flarray[m]);
        }
      }
      frameArray.push(tempArray.slice());
    }
    console.log(frameArray);
  }
}
function addMiddleFrames(frame_count, frame_json) {}

function addInitialFrame() {
  lastFrameJSON = JSON.parse(JSON.stringify(frameJSON));
}

function copyJson(json) {
  return JSON.parse(JSON.stringify(json));
}

function FrameJSONToArray(json) {
  var array = [];
  array.push(json.slider_bodyX);
  array.push(json.slider_bodyY);
  array.push(json.slider_bodyZ);
  array.push(json.slider_bodyRY);
  array.push(...json.thetaAngle);
  return array;
}

document.getElementById("saveLoader").onchange = function () {
  console.log("reached");
  let file_reader = new FileReader();

  file_reader.addEventListener(
    "load",
    (e) => {
      var json = JSON.parse(file_reader.result);
      //console.log(json);
      frameArray = json.array;
    },
    false
  );
  file_reader.readAsText(this.files[0]);
};
