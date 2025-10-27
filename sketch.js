let imgs = [];
let lyrics = [
  "빛나는 무대 위에서",
  "널 사랑해",
  "우리는 계속 이어져",
  "춤과 노래가 하나가 되어. 우리는 영원히 빛날꺼야",
];

let zoomDirection = 1;
let zoom = 1;
let stars = [];
let currentLyric = 0;
let stopped = false;

function preload() {
  imgs[0] = loadImage("Idol-Image-1.JPG");
  imgs[1] = loadImage("Idol-Image-2.JPG");
  imgs[2] = loadImage("Idol-Image-3.JPG");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  textFont("Georgia");
  textAlign(CENTER);
  textSize(24);
  for (let i = 0; i < 100; i++) {
    stars.push(newStar());
  }
}

function draw() {
  background(20, 40, 90, 50);

  for (let s of stars) {
    noStroke();
    fill(255);
    ellipse(s.x, s.y, s.size);
  }

  let time = millis();
  let rIndex = floor(time / 3000);
  let index = min(rIndex, imgs.length - 1);
  let nextIndex = (index + 1) % imgs.length;

  zoom += 0.002 * zoomDirection;
  if (zoom > 1.55 || zoom < 0.75) zoomDirection *= -1;

  let fade = map(time % 3000, 0, 2999, 255, 0);

  push();
  translate(width / 2, height / 2);
  scale(zoom);

  tint(255, fade);
  image(imgs[index], 0, 0, width, height);

  tint(255, 255 - fade);
  image(imgs[nextIndex], 0, 0, width, height);
  pop();

  
  if (index < imgs.length - 1 && time % 3000 < 50) {
    currentLyric = (currentLyric + 1) % lyrics.length;
  }

 
  if (currentLyric === lyrics.length - 1 && time % 1000 < 50) {
    stars.push(newStar());
  }

 
  if (index === imgs.length - 1 && !stopped) {
    zoom = 0.5;
    noLoop();
    stopped = true;

    
    setTimeout(() => {
      loop();
      stopped = false;
    }, 5000);
  }

  
  fill(255); 
  noStroke(0);          
  text(lyrics[currentLyric], width / 2, height - 60); 
  noStroke();        
}

function newStar() {
  return {
    x: random(width),
    y: random(height),
    size: random(1, 7),
  };
}
 

