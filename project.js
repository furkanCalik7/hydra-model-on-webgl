var canvas;
var gl;

var near = -2;
var far = 2;
var radius = 1.0;
var theta = (Math.PI / 180.0) * 120;
var phi = 20.0;
var dr = (5.0 * Math.PI) / 180.0;

var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;

var eye;

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
      m = mult(m, scale4(2, 2, 2));

      hydraFigure[BODY_ID] = createNode(m, bodyRender, null, TAIL1_ID);
      var m = mat4();
      break;
    case TAIL1_ID:
      m = translate(0.436284, 0.008484, -0.078257);
      m = mult(m, scale4(0.1, 0.1, 0.1));
      m = mult(m, rotate(90, 1, 0, 0));
      hydraFigure[TAIL1_ID] = createNode(m, tail1Render, null, null);
      var m = mat4();
      break;
  }
}

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

//

window.onload = function init() {
  // Construct canvas
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

  //
  //  Load shaders and initialize attribute buffers
  //
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Hydra Initilazition programs
  constructCoordinateSystem();
  modelViewMatrix = mat4();
  initHydraNodes(BODY_ID);
  initHydraNodes(TAIL1_ID);
  body();
  tail1();

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(indeces), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

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
  gl.drawArrays(gl.LINES, 0, 180);
  preorder(BODY_ID);
  gl.uniformMatrix4fv(projectionLoc, false, flatten(pMatrix));

  requestAnimFrame(render);
};
