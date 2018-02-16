let cols, rows;
let scale = 20;
let w = window.innerWidth + 300;
let h = 1000;

let r;
let g;
let b;
let a = 50;

let flying = 0;

let terrain = [];

function setup() {
  r = random(200);
  g = random(200);
  b = random(200);

  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  cols = w / scale;
  rows = h/ scale;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);

    w = window.innerWidth + 300;

}

function draw() {

  flying -= 0.04;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  translate(0, 100);
  rotateX(PI/2.6);
  fill(r, g ,b, a);
  translate(-w/2, -h/2);
  for (let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scale, y*scale, terrain[x][y]);
      vertex(x*scale, (y+1)*scale, terrain[x][y+1]);
    }
    endShape();
  }

}
