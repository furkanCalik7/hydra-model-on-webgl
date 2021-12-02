var canvas;
var gl;

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

var mesh;
var tailmesh;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

// Tranformation Matrix variables
var modelViewMatrix, projectionMatrix;
var modelViewLoc, projectionLoc;
var matrixStack = [];

// The angles of joints
var jointAngles = {
  TAIL1_ID: 60,
};

// Mesh IDs
var BODY_ID = 0;
var TAIL1_ID = 1;
var TAIL2_ID = 2;

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
      m = rotate(60, 0, 1, 0);
      m = mult(m, scale4(1, 1, 1));

      hydraFigure[BODY_ID] = createNode(m, bodyRender, null, TAIL1_ID);
      var m = mat4();
      break;
    case TAIL1_ID:
      m = translate(5.04511, 0.738529, -0.19105);
      m = mult(m, scale4(0.5, 0.5, 0.5));
      m = mult(m, rotate(90, 1, 0, 0));
      hydraFigure[TAIL1_ID] = createNode(m, tail1Render, null, TAIL2_ID);
      var m = mat4();
      break;
    case TAIL2_ID:
      m = translate(2.2, -0.6, -0.118111);

      m = mult(m, scale4(0.805881, 0.805881, 0.805881));
      m = hydraFigure[TAIL2_ID] = createNode(m, tail2Render, null, null);
      var m = mat4();
      break;
  }
}

var program;

// function initHydraNodes(id) {
//   var m = mat4();
//   switch (id) {
//     case BODY_ID:
//       m = rotate(60, 0, 1, 0);
//       m = mult(m, scale4(1, 1, 1));

//       hydraFigure[BODY_ID] = createNode(m, bodyRender, null, TAIL1_ID);
//       var m = mat4();
//       break;
//     case TAIL1_ID:
//       m = translate(0.436284, 0.008484, -0.078257);
//       m = mult(m, scale4(0.5, 0.5, 0.5));
//       m = mult(m, rotate(90, 1, 0, 0));
//       hydraFigure[TAIL1_ID] = createNode(m, tail1Render, null, TAIL2_ID);
//       var m = mat4();
//       break;
//     case TAIL2_ID:
//       m = translate(2.2, -0.6, -0.118111);

//       m = mult(m, scale4(0.805881, 0.805881, 0.805881));
//       m = hydraFigure[TAIL2_ID] = createNode(m, tail2Render, null, null);
//       var m = mat4();
//       break;
//   }
// }

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
  // instanceMatrix = mult(modelViewMatrix, scale4(1, 1, 1));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  // console.log("reached");
  gl.drawArrays(gl.TRIANGLES, BODY_STARTING_VERTEX, BODY_QUAD_LENGTH * 6);
}

function tail1Render() {
  // instanceMatrix = mult(modelViewMatrix, scale4(0.1, 0.1, 0.1));
  // instanceMatrix = mult(instanceMatrix, rotate(90, 1, 0, 0));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.drawArrays(gl.TRIANGLES, BODY_VERTEX_FINISH + 1, TAIL1_QUAD_lENGTH * 6);
}

function tail2Render() {
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));
  gl.drawArrays(gl.TRIANGLES, TAIL1_VERTEX_LAST + 1, TAIL2_QUAD_LENGTH * 6);
}

//

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

  mesh = new OBJ.Mesh($("#body_data").html());
  tailmesh = new OBJ.Mesh($("#tail1_data").html());
  console.log(tailmesh);

  OBJ.initMeshBuffers(gl, mesh);
  OBJ.initMeshBuffers(gl, tailmesh);

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

  mvMatrix = lookAt(eye, at, up);
  pMatrix = ortho(left, right, bottom, ytop, near, far);

  modelViewMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, mvMatrix);

  //gl.drawArrays(gl.TRIANGLES, 0, 180);

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));

  // gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
  // var vPosition = gl.getAttribLocation(program, "vPosition");
  // gl.vertexAttribPointer(
  //   vPosition,
  //   mesh.vertexBuffer.itemSize,
  //   gl.FLOAT,
  //   false,
  //   0,
  //   0
  // );

  // gl.enableVertexAttribArray(vPosition);
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

  // gl.drawElements(
  //   gl.TRIANGLES,
  //   mesh.indexBuffer.numItems,
  //   gl.UNSIGNED_SHORT,
  //   0
  // );

  modelViewMatrix = mult(modelViewMatrix, translate(0.6, -0.1, 0));
  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));

  gl.bindBuffer(gl.ARRAY_BUFFER, tailmesh.vertexBuffer);
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(
    vPosition,
    tailmesh.vertexBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.enableVertexAttribArray(vPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tailmesh.indexBuffer);

  gl.drawElements(
    gl.TRIANGLES,
    tailmesh.indexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );

  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelViewMatrix));

  requestAnimFrame(render);
};
