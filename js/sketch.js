
// radius
var r;

// rotates thing
var rotate;

// Angle and angular velocity, accleration
var theta;

// current color
var core;

// possible next color
var nextcore;

// for clicking
var clickable;

// hsl [0 to 359 (though you can go higher because function hueMod()), 0 to 100, 0 to 100]
// score 0 to 100

/*
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
];
*/
var dots = [];

/*
for (var i = 0; i < 110; i++) {
  dots.push({
    "hsl": [Math.random() * 360, Math.random() * 100, Math.random() * 100], "score": Math.random() * 10 * Math.random() * 10
  });
}
*/


function hueMod(h) {
  return h % 360;
}

function setup() {
  createCanvas(1000, 1000);

  rotate = 0;
  frameRate(24);
  core = [0, 0, 0];
  notcore = [0, 0, 0];
  clickable = false;

  // Initialize all values
  // r = height * 0.45;
  // theta = 0;
}

function draw() {
  clickable = false;
  background(240);

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
  fill(core[0], core[1], core[2], 1);
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
    strokeWeight(1)
    stroke(255);
    if (dist(mouseX - (width / 2), mouseY - (width / 2), x, y) < (dot.score + 5) / 2 ) {
      nextcore = dot.hsl;
      strokeWeight(5);
      stroke(0);
      clickable = true;
    }
    fill(hueMod(dot.hsl[0]), hueMod(dot.hsl[1]), hueMod(dot.hsl[2]), 0.8);
    ellipse(x, y, dot.score + 5, dot.score + 5);


    // if we want to draw each orbit
    // fill(0, 0, 0, 0);
    // stroke(hueMod(dot.hsl[0]), hueMod(dot.hsl[1]), hueMod(dot.hsl[2]), 0.5);
    // ellipse(0, 0, r * 2, r * 2);

    // make mouseevent if mouse is in the dot

  }

}

function mousePressed() {
  if (clickable) {
    core = nextcore;
  }
}