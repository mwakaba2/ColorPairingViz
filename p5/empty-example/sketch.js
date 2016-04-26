
// radius
var r;

// rotates thing
var rotate;

// Angle and angular velocity, accleration
var theta;

// hsl [0 to 359 (though you can go higher because function hueMod()), 0 to 100, 0 to 100]
// score 0 to 100

var dots = [
  {
    "hsl": [0, 50, 50],
    "score": 36
  },
  {
    "hsl": [60, 50, 50],
    "score": 65
  },
  {
    "hsl": [120, 50, 50],
    "score": 46
  },
  {
    "hsl": [180, 50, 50],
    "score": 26
  },
  {
    "hsl": [240, 50, 50],
    "score": 69
  },
  {
    "hsl": [300, 50, 50],
    "score": 25
  },
  {
    "hsl": [238, 100, 50],
    "score": 0
  },
  {
    "hsl": [14, 100, 50],
    "score": 100
  }
]

function hueMod(h) {
  return h % 360;
}

function setup() {
  createCanvas(1000, 1000);

  rotate = 0;
  frameRate(24);

  // Initialize all values
  // r = height * 0.45;
  // theta = 0;
}

function draw() {
  background(0);

  colorMode(HSL);
  // Translate the origin point to the center of the screen
  translate(width/2, height/2);

  fill(0, 0, 0, 0);
  stroke(0, 0, 70);
  r = min(height, width) * .45;
  ellipse(0, 0, r, r);
  ellipse(0, 0, r * 2, r * 2);
  ellipse(0, 0, r * 1.5, r * 1.5);
  ellipse(0, 0, r * 1, r * 1);
  ellipse(0, 0, r * .5, r * .5);

  rotate = rotate + 0.001;

  for (dot of dots) {

    // Convert polar to cartesian
    theta = hueMod(dot.hsl[0]) / 360 * TAU;
    r = min(height, width) * .0045 * (100 - dot.score) + min(height, width) * 0.1;
    var x = r * cos(theta - rotate);
    var y = r * sin(theta - rotate);

    // Draw the ellipse at the cartesian coordinate
    ellipseMode(CENTER);
    noStroke();
    fill(hueMod(dot.hsl[0]), hueMod(dot.hsl[1]), hueMod(dot.hsl[2]));
    ellipse(x, y, dot.score + 5, dot.score + 5);
    // fill(0, 0, 0, 0);
    // stroke(hueMod(dot.hsl[0]), hueMod(dot.hsl[1]), hueMod(dot.hsl[2]), 0.5);
    // ellipse(0, 0, r * 2, r * 2);
  }

}
