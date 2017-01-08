var WIDTH = 900;
var HEIGHT = 600;

var MAX_ITERATIONS = 200;

var color = function (r0, g0, b0, r1, g1, b1, t) {
  if (t == false) {
    return "rgb(0, 0, 0)";
  }
  var r = r0 + (r1 - r0) * t;
  var g = g0 + (g1 - g0) * t;
  var b = b0 + (b1 - b0) * t;
  return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
};

var pixel = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
};

var convergence = function (x0, y0) {
  var x = 0;
  var y = 0;
  for (var j = 0; j < MAX_ITERATIONS; j++) {
    if (x * x + y * y >= 4) {
      return j / MAX_ITERATIONS;
    }
    var x_T = x * x - y * y + x0;
    y = 2 * x * y + y0;
    x = x_T;
  }
  return false;
};

var draw = function (evt) {
  console.log('starting');
  var canvas = document.getElementById('mandelbro');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    for (var i = 0; i < WIDTH; i++) {
      for (var j = 0; j < HEIGHT; j++) {
        var x = i / 300 - 2;
        var y = 1 - j/300;
        var t = convergence(x, y);
        pixel(ctx, i, j, color(
          0, 0, 20,
          200, 100, 0,
          t));
      }
    }
  }
  console.log('done!');
};

window.addEventListener("load", draw);
