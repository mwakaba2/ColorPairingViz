
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

// border width of dots
var border;
var borderHover;

// minimum size for dots
var dotMinSize;

// size multiplier of dot
var dotSize;

// alpha for dots
var dotAlpha;

// how fast dots move
var rotateVel;



// array of objects
// {
// "hsl": [0 to 359 (though you can go higher because function hueMod()), 0 to 100, 0 to 100]
// "score": 0 to 100
// }
var dots = [];

// generates a lot of dots
for (var i = 0; i < 117; i++) {
  dots.push({
    "hsl": [Math.random() * 360, Math.random() * 100, Math.random() * 100], "score": Math.random() * 10 * Math.random() * 10
  });
}

// returns number 0 to 359 for hue
function hueMod(h) {
  return h % 360;
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(24);

  rotate = 0;
  r = 0;
  core = dots[0].hsl; // @TODO: INITIALIZE THIS TO THE APPROPRIATE COLOR
  nextcore = [0, 0, 0];
  clickable = false;
  border = 1;
  borderHover = 5;
  dotMinSize = 10;
  dotAlpha = 0.8;
  rotateVel = 0.001;
  dotSize = 0.0045;

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

  rotate = rotate + rotateVel;


  for (dot of dots) {

    // Convert polar to cartesian
    theta = hueMod(dot.hsl[0]) / 360 * TAU;
    r = min(height, width) * dotSize * (100 - dot.score) + min(height, width) * 0.1;
    var x = r * cos(theta - rotate);
    var y = r * sin(theta - rotate);

    var dotRadius = dot.score + dotMinSize;

    // Draw the ellipse at the cartesian coordinate
    ellipseMode(CENTER);
    strokeWeight(1)
    stroke(255);
    if (dist(mouseX - (width / 2), mouseY - (width / 2), x, y) < dotRadius / 2 ) {
      nextcore = dot.hsl;
      strokeWeight(5);
      stroke(0);
      clickable = true;
    }
    fill(hueMod(dot.hsl[0]), hueMod(dot.hsl[1]), hueMod(dot.hsl[2]), dotAlpha);
    ellipse(x, y, dotRadius, dotRadius);


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

    // @TODO: SET NEW COLOR IN MARIKO'S CODE

  }
}
