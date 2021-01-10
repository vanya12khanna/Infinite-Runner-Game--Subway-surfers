var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jake, jakeImage;
var score;
var background_Image, subwayBackground;

var obstacle1, obstacle2;
var obstaclesGroup;
var gameOverImg,restartImg;

function preload(){
  jakeImage = loadImage("jake.png")
  background_Image = loadImage("subwayBackground.png")
  obstacle1 = loadImage("obstacle.png")
  obstacle2 = loadImage("obstacle1.png")
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")  
}

function setup() {
    createCanvas(800,400)
  
  jake = createSprite(80,315,20,20);
  jake.addImage(jakeImage);
  jake.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.scale = 1.4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  background = createSprite(0,0,800,040);
  background.scale = 1;
  background.velocityX = -4;
  background.addImage(background_Image);
  background.x = background.width/2;
  
  obstaclesGroup = createGroup();
  
  gameOver = createSprite(365,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;
  
  restart = createSprite(365,270);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  
  score=0;
 
}

function draw() {
  
    score = score + Math.round(getFrameRate()/60);
  
  if(gameState === PLAY){
      gameOver.visible = false;
      restart.visible = false;
      background.velocityX=-4;
   
  background.velocityX = -(4 + 3* score/100) 
  score = score + Math.round(getFrameRate()/60);
    
       if (ground.x < 0){
          ground.x = ground.width/2;
       }

       if (background.x < 0){
          background.x = background.width/2;
       }

       if (keyDown("space")&&jake.y>=200){
        jake.velocityY=-18
       }

       if(obstaclesGroup.isTouching(jake)){
       gameState = END;
       } 

  } else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      score=0;
      ground.velocityX = 0;
      background.velocityX = 0;
    
      obstaclesGroup.destroyEach();
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
  }
  
  jake.velocityY = jake.velocityY + 0.9
  jake.collide(ground)
  
  jake.depth = background.depth
  jake.depth = jake.depth+1
  
//   jake.depth = background.depth
//   jake.depth = score.depth+1
  
   
     if(mousePressedOver(restart)) {
      reset();
     }
  
  spawnObstacles()
  drawSprites();
  fill("black");
  text("Score:"+ score,500,50);
}

function reset(){
  score=0;
  gameOver.visible = false;
  restart.visible = false
  gameState = PLAY;
  obstaclesGroup.destroyEach();
}

function  spawnObstacles(){
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,315,10,10);
     
      obstacle.velocityX = -9
      obstacle.scale = 0.9;
      //obstacle1.scale =0.9;
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
    
      default: break;
    }
   
              
    obstacle.scale = 0.2 ;
    obstacle.lifetime = 300;
   
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  
}
}