var r;

// Angle and angular velocity, accleration
var theta;

// hsl [0 to 359 (though you can go higher because function hueMod()), 0 to 100, 0 to 100]
// distance 0 to 100

var dots = [
  {
    "hsl": [0, 50, 50],
    "distance": 36
  },
  {
    "hsl": [60, 50, 50],
    "distance": 65
  },
  {
    "hsl": [120, 50, 50],
    "distance": 46
  },
  {
    "hsl": [180, 50, 50],
    "distance": 26
  },
  {
    "hsl": [240, 50, 50],
    "distance": 69
  },
  {
    "hsl": [300, 50, 50],
    "distance": 25
  }
]

function hueMod(h) {
  return h % 360;
}

function setup() {
  createCanvas(1000, 1000);

  // Initialize all values
  // r = height * 0.45;
  // theta = 0;
}

function draw() {
  background(0);
  colorMode(HSB);
  // Translate the origin point to the center of the screen
  translate(width/2, height/2);

  for (dot of dots) {
    // Convert polar to cartesian
    theta = hueMod(dot.hsl[0]) / 360 * TAU;
    r = min(height, width) * .0045 * (100 - dot.distance);
    var x = r * cos(theta);
    var y = r * sin(theta);

    // Draw the ellipse at the cartesian coordinate
    ellipseMode(CENTER);
    noStroke();
    fill(hueMod(dot.hsl[0]), hueMod(dot.hsl[1]), hueMod(dot.hsl[2]));
    ellipse(x, y, dot.distance, dot.distance);
  }

}
