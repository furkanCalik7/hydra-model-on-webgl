var canvas;
var gl;
var vPosition;

var near = -4;
var far = 4;
var radius = 1.0;
var theta = (Math.PI / 180.0) * 120;
var phi = 20.0;
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

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

// Tranformation Matrix variables
var modelViewMatrix, projectionMatrix;
var modelViewLoc, projectionLoc;
var matrixStack = [];

var sliderValue1 = 0;
var sliderValue2 = 0;
var sliderValue3 = 0;
var sliderValue4 = 0;
var sliderValue5 = 0;
var sliderValue6 = 0;
var sliderValue7 = 0;
var sliderValue8 = 0;

// The angles of joints
var jointAngles = {
  TAIL1_ID: 60,
};

// Mesh IDs
var BODY_ID = 0;
var TAIL1_ID = 1;
var TAIL2_ID = 2;
var TAIL3_ID = 3;
var TAIL4_ID = 4;

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
      m = mult(m, scale4(2, 2, 2));
      hydraFigure[BODY_ID] = createNode(m, bodyRender, null, TAIL1_ID);
      var m = mat4();
      break;
    case TAIL1_ID:
      m = translate(0.6, -0.15, 0);

      hydraFigure[TAIL1_ID] = createNode(m, tail1Render, null, TAIL2_ID);
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
      m = translate(0.26, 0.14, 0);
      m = hydraFigure[TAIL3_ID] = createNode(m, tail4Render, null, null);
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
    preorder(figure[id].sibling);
  }
}

var instanceMatrix;

function bodyRender() {
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
  instanceMatrix = mult(
    instanceMatrix,
    rotate((sliderValue8 + 2) * 25, 0, 0, 1)
  );
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
  instanceMatrix = translate(-0.13, -0.07, 0);
  instanceMatrix = mult(instanceMatrix, rotate(60, 0, 0, 1));
  instanceMatrix = mult(instanceMatrix, translate(0.13, 0.07, 0));
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

function meshInitilization() {
  BODY_MESH = new OBJ.Mesh($("#body_data").html());
  TAIL1_MESH = new OBJ.Mesh($("#tail1_data").html());
  TAIL2_MESH = new OBJ.Mesh($("#tail2_data").html());
  TAIL3_MESH = new OBJ.Mesh($("#tail3_data").html());
  TAIL4_MESH = new OBJ.Mesh($("#tail4_data").html());

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
}

window.onload = function init() {
  const canvas = document.createElement("canvas");
  canvas.height = 800;
  canvas.width = 800;
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
  sliderInitilization();
  mvMatrix = lookAt(eye, at, up);
  pMatrix = ortho(left, right, bottom, ytop, near, far);

  modelViewMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, mvMatrix);

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));

  preorder(BODY_ID);

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));

  requestAnimFrame(render);
};

function sliderInitilization() {
  var slider1 = document.getElementById("slider1");
  var output1 = document.getElementById("output1");
  sliderValue1 = setValue(slider1, output1);
  var slider2 = document.getElementById("slider2");
  var output2 = document.getElementById("output2");
  sliderValue2 = setValue(slider2, output2);
  var slider3 = document.getElementById("slider3");
  var output3 = document.getElementById("output3");
  sliderValue3 = setValue(slider3, output3);
  var slider4 = document.getElementById("slider4");
  var output4 = document.getElementById("output4");
  sliderValue4 = setValue(slider4, output4);
  var slider5 = document.getElementById("slider5");
  var output5 = document.getElementById("output5");
  sliderValue5 = setValue(slider5, output5);
  var slider6 = document.getElementById("slider6");
  var output6 = document.getElementById("output6");
  sliderValue6 = setValue(slider6, output6);
  var slider7 = document.getElementById("slider7");
  var output7 = document.getElementById("output7");
  sliderValue7 = setValue(slider7, output7);
  var slider8 = document.getElementById("slider8");
  var output8 = document.getElementById("output8");
  sliderValue8 = setValue(slider8, output8);
}

function setValue(slider, output) {
  output.innerHTML = slider.value / 25 - 2;
  console.log(output);
  slider.oninput = function () {
    output.innerHTML = this.value / 25 - 2;
    return output.innerHTML;
  };
  return output.innerHTML;
}
