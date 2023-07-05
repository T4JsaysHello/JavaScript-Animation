class Background {
  constructor(name, position, width, height) {
    this.image = document.createElement('img');
    this.image.src = name;
    this.position = new Vector(position[0], position[1]);
    this.width = width;
    this.height = height;
  }
  
  drawStatic() {
    context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  scrollBackground(velocity) {
    // Draw the background image
    context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    // Increment the background position by the velocity
    this.position.add(velocity);
  }

  }

  class Character {
    constructor(spriteSheet, spriteWidth, spriteHeight, maxFrames, position) {
      this.frameX = 0;
      this.frameY = 0;
      this.image = document.createElement('img');
      this.image.src = spriteSheet;
      this.maxFrames = maxFrames;
      this.spriteWidth = spriteWidth;
      this.spriteHeight = spriteHeight;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.position = new Vector(position[0], position[1]);
      this.scale = 2;
      

    }

    
    draw(context, scale) {
      // Draw the current frame of the sprite sheet at the character's position
      context.drawImage(
        this.image, 
        this.frameX * this.spriteWidth, 
        this.frameY * this.spriteHeight, 
        this.spriteWidth, 
        this.spriteHeight, 
        this.position.x, 
        this.position.y, 
        this.width * scale, 
        this.height * scale);
    }
  
    moveForward(velocity) {
      
      this.position.x += velocity;
    }

    moveDiagonal(velocityX, velocityY) {
      this.position.x += velocityX;
      this.position.y += velocityY;
    }

    animateFrameX() {
      if (frameCount % 10 == 0) {
        this.frameX++;
        if (this.frameX >= this.maxFrames) {
          this.frameX = 0;
        }
      }
    }

    animateFrameY() {
      if (frameCount % 10 == 0) {
        this.frameY++;
        if (this.frameY >= this.maxFrames) {
          this.frameY = 0;
        }
      }
    }

    update(offsetY) {
      this.position.x = 0;
      this.position.y = canvasHeight - offsetY;
    }

    

    getPositionX() {
      return this.position.x;
    }
    getPositionY() {
      return this.position.y;
    }
  }


  class SnowFlake  {
    constructor() {
      this.startPos = new Vector(0, 0);
      this.pos = new Vector(0, 0);
      this.startPos.x = this.pos.x = Math.random() * context.canvas.width
      this.startPos.y = this.pos.y = (Math.random() * context.canvas.height) - context.canvas.height;
      this.randNum03 = Math.floor(Math.random() * 3);
      this.image = document.createElement("img");
      this.image.src = snowFlakeArray[this.randNum03];
      this.width = 16;
      this.height = 16;
      this.rotate = 0.0;
      this.velocity = new Vector(0, (Math.random() * 15) + 2);
      this.scale = (Math.random())+.7;
      this.rotationInc=(Math.random()*0.05);
      if(Math.random()<.5)this.rotationInc=-this.rotationInc;
    }
    update() {
      this.pos.add(this.velocity);
      if (this.pos.y > context.canvas.height) {
        this.pos.y = this.startPos.y;
      }
      this.rotate+=this.rotationInc;
    }
    draw() {
      context.save();
      context.translate(this.pos.x, this.pos.y);
      context.scale(this.scale,this.scale)
      context.rotate(this.rotate);
      context.translate(-this.width / 2, -this.height / 2);
      context.drawImage(this.image, 0, 0, this.width, this.height)
      context.restore();
      this.rotate += this.rotationInc;
    }
  }

  class Snow {
    constructor(size) {
      this.size = size;
      this.array = [];
      this.scale;
    }
    init() {
      for (let i = 0; i < this.size; i++) {
        this.array.push(new SnowFlake())
      }
    }
    update() {
      for (let i = 0; i < this.size; i++) {
        this.array[i].update();
      }  
    }
    draw() {
      for (let i = 0; i < this.size; i++) {
        this.array[i].draw();
      }
    }
  }



  


// Dispaying text
function displayText(text, colour, font, x , y) {
  context.fillStyle = colour;
  context.font = font;
  context.textAlign = 'center';
  context.fillText(text, x, y);
}



// Animating Scene 1
// frameCount > 1 && frameCount <= 1900
function animateScene1() {
  if(frameCount > 1 && frameCount <= 700){
    // Draw Background rolling
    backgroundScene1.scrollBackground(backgroundScene1Velocity);
    characterWalk.update(100);
    characterWalk.draw(context, 2);
    characterWalk.animateFrameX();
    

    // Draw the sprite walking to the right in the same spot on the screen

  }else if(frameCount > 700 && frameCount <= 1900){
    // Draw Background Static
    backgroundScene1.drawStatic();
    characterWalk.draw(context, 2);
    characterWalk.animateFrameX();
    characterWalk.moveForward(0.7);
    
    
    
    // Draw the sprite idle in place on the screen

    // At a certain point, the sprite should start walking to the right, off screen

  }
}
// scene 2
function animateScene2() {
  // Draw Background rolling
  if (frameCount > 1900 && frameCount <= 3400){
  backgroundScene2.scrollBackground(backgroundScene1Velocity);
  characterWalk.update(100);
  characterWalk.draw(context, 2);
  characterWalk.animateFrameX();
  snow.update();
    snow.draw();

  } else if (frameCount > 3400 && frameCount <= 4000){
    backgroundScene2.drawStatic();
    characterWalk.draw(context, 2);
    characterWalk.animateFrameX();
    characterWalk.moveForward(1.5);
    snow.update();
    snow.draw();
  }


}
// scene 3
function animatescene3() {
  // Draw Background rolling
  if (frameCount > 4000 && frameCount <= 5400){
  backgroundScene3.scrollBackground(backgroundScene1Velocity);
  characterWalk.update(100);
  characterWalk.draw(context, 2);
  characterWalk.animateFrameX();
  
  } else if (frameCount > 5400 && frameCount <= 5550){
    backgroundScene3.drawStatic();
    characterWalk.draw(context, 2);
    characterWalk.animateFrameX();
    characterWalk.moveForward(1.5);
  } else if (frameCount > 5550 && frameCount <= 5560){
    backgroundScene3.drawStatic();
    characterWalk.draw(context, 2);
    characterWalk.animateFrameX();
    characterWalk.moveDiagonal(1.5, -0.8);
  } else if (frameCount > 5560 && frameCount <= 6000){
    backgroundScene3.drawStatic();
    characterWalk.draw(context, 2);
    characterWalk.animateFrameX();
    characterWalk.moveForward(0.8);
  
  }
}
// scene 4
function animatescene4() {
  
  if (frameCount > 6000 && frameCount <= 6001){
  characterWalk.update(250);
  backgroundScene4.drawStatic();
  characterWalk.draw(context, 5);
  characterWalk.animateFrameX();
  
  } if (frameCount > 6001 && frameCount <= 6100){
    backgroundScene4.drawStatic();
    characterWalk.draw(context, 5);
    characterWalk.animateFrameX();
    characterWalk.moveForward(1.5);
    characterIdle2.draw(context, 4);
    characterIdle2.animateFrameY();
  } if (frameCount > 6100 && frameCount <= 6300){
    backgroundScene4.drawStatic();
    characterIdle.draw(context, 5);
    characterIdle.animateFrameX();
    characterIdle2.draw(context, 4);
    characterIdle2.animateFrameY();
    displayText("Coffee?", 'black', 'bold 20px Arial', 148.5, canvasHeight/2);

  } if (frameCount > 6200 && frameCount <= 6400){
    backgroundScene4.drawStatic();
    characterIdle.draw(context, 5);
    characterIdle.animateFrameX();
    characterIdle2.draw(context, 4);
    characterIdle2.animateFrameY();
    displayText("sorry this is a pizza place", 'red', 'bold 20px Arial', 600, canvasHeight/2);
  } if (frameCount > 6400 && frameCount <= 8000){
    backgroundScene4.drawStatic();
    displayText("Pizza bungalow", 'black', 'bold 50px Arial', canvasWidth/2, canvasHeight/2);
    displayText("Not affilated with PizzaHut", 'black', 'bold 50px Arial', canvasWidth/2, canvasHeight/2 + 100);
  }
}

// Main Loop 
function animate() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  frameCount++;
  
  
  //Scene 1
  if (frameCount > 1 && frameCount <= 1900) {
    animateScene1();
  }

  //Scene 2
  if (frameCount > 1900 && frameCount <= 4000) {
    animateScene2();
  }

  //Scene 3
  if (frameCount > 4000 && frameCount <= 6000) {
    animatescene3();
  }
  
  if (frameCount > 6000 && frameCount <= 8000) {
    animatescene4();
  }


  // Reset the variables
  if(frameCount == maxFrameCount - 1){
    // Reset Scene 1 Background Position
    backgroundScene1.position.x = 0;
    backgroundScene2.position.x = 0;
    backgroundScene3.position.x = 0;
  }
  
  //Reset the loop
  if (frameCount > maxFrameCount) {
    frameCount = 0;
  }

  
  window.requestAnimationFrame(animate);
}


// Variables
let context = document.querySelector('canvas').getContext('2d');
let frameCount = 0;
let canvasWidth = context.canvas.width;   // 800
let canvasHeight = context.canvas.height; // 600
let maxFrameCount = 8000;

// Backgrounds
// Forest_6000x3000.jpg
// /5 = 1200x600
let backgroundScene1 = new Background("./images/background/Forest_6000x3000.jpg", [0, 0], 1200, 600);
let backgroundScene2 = new Background("./images/background/snow_forest_6325x2846.jpg", [0, 0], 6325/Math.floor(4.7), 2846/Math.floor(4.7));
let backgroundScene3 = new Background("./images/background/snow_house_6264x2828.jpg", [0, 0], 6264/Math.floor(2828/600), 2828/Math.floor(2828/600));
let backgroundScene4 = new Background("./images/background/kitchen_5834x2626.jpg", [0, 0], 5834/Math.floor(2626/600), 2626/Math.floor(2626/600));
let characterWalk = new Character("./images/sprite/walk_320x64.png", 64, 64, 5, [0, 0]);
let characterIdle = new Character("./images/sprite/idle_256x64.png", 64, 64, 4, [148.5, 350]);
let characterIdle2 = new Character("./images/sprite/B_witch_idle_32x288.png", 32, 48, 6, [400, 430]);
let backgroundScene1Velocity = new Vector(-0.5, 0);

let snowFlakeArray = [];
snowFlakeArray.push("./images/snowflakes.png");
snowFlakeArray.push("./images/snowflakes_PNG7525.png");
snowFlakeArray.push("./images/snowflakes_PNG7533.png");
let snow = new Snow(100);
snow.init();


// Calling the loop
window.requestAnimationFrame(animate);


