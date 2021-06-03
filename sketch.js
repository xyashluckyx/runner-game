var nobita,nobitaImg,nobitaImg2;
var gian,gianImg;
var Background, backgroundImg;
var ground;
var obstacle1Img,obstacle2Img,obstacle3Img
var obstacleGroup1,obstacleGroup2,obstacleGroup3;
var START=1;
var PLAY=2;
var FLY=3;
var CRY=4;
var END=5;
var gameState=PLAY;
var score=0;

function preload(){
backgroundImg=loadImage("images/Nobihouse.png");

nobitaImg=loadAnimation("images/nobita1.png","images/nobita2.png","images/nobita3.png","images/nobita4.png");

nobitaImg2=loadAnimation("images/nobita cry.png");

gianImg=loadAnimation("images/gian 1.jpg","images/gian 2.png","images/gian 3.png")

obstacle1Img=loadImage("images/obstacle1.jpg");

obstacle2Img=loadImage("images/obstacle2.png");

obstacle3Img=loadImage("images/suneo.png");
}

function setup() {
  createCanvas(1300,600);
  Background=createSprite(1500,-300,100,10);
  Background.addImage(backgroundImg);
  Background.velocityX=-15;
  Background.scale=5;

  nobita=createSprite(300,500,10,10);
  nobita.addAnimation("running", nobitaImg);
  nobita.scale=0.7;

  gian=createSprite(100,500,10,10);
  gian.addAnimation("running", gianImg);
  gian.scale=0.5;

  ground=createSprite(650,580,1300,10);
  ground.visible=false;
 
  obstacleGroup1=new Group();

  obstacleGroup2=new Group();

  obstacleGroup3=new Group();
 }

function draw() {
  background(0);
  
  if(gameState===PLAY){ 
    score = score + Math.round(getFrameRate()/60);

    camera.position.x=nobita.x+260;
  if(Background.x<0){
  Background.x = Background.width;
  }

  if(keyDown("space") && nobita.y>=450){
    nobita.velocityY=-42;
  }

  var select_balloon=Math.round(random(1,5));
  console.log(select_balloon)

  if(frameCount % 100 == 0)
  {
      if(select_balloon == 1)
      {
        obstacle1();
      } else if(select_balloon == 2)
      {
        obstacle2();
      } else if(select_balloon == 3)
      {
        obstacle3();
      }
}

  if(obstacleGroup1.isTouching(nobita)){
    obstacleGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    obstacleGroup3.destroyEach();
    Background.velocityX=0;
    gameState= CRY;
  }

  if(obstacleGroup2.isTouching(nobita)){
    obstacleGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    obstacleGroup3.destroyEach();
    Background.velocityX=0;
    gameState= CRY;
  }

  if(obstacleGroup3.isTouching(nobita)){
    obstacleGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    obstacleGroup3.destroyEach();
    Background.velocityX=0;
    gameState= CRY;
  }

  if(obstacleGroup1.isTouching(gian)){
    gian.velocityY=-42;
  }

  if(obstacleGroup2.isTouching(gian)){
    gian.velocityY=-42;
  }

  if(obstacleGroup3.isTouching(gian)){
    gian.velocityY=-42;  
  }
}
  gian.velocityY=gian.velocityY+2.4;

  nobita.velocityY=nobita.velocityY+2.4;

  nobita.collide(ground);

  gian.collide(ground);

if(gameState===CRY){
  gian.destroy();
  nobita.y=480;
  nobita.addAnimation("running",nobitaImg2);
  nobita.scale=0.2;
}



  drawSprites();

  textSize(50);
  fill("red");
  text("Score: "+ score, 100,50);
  
  if(gameState===CRY){
    text("GAMEOVER",550,300);
    textSize(30);
    fill("red");
    text("gian beat nobita and ran away. you can't save the nobita.....",350,100);

  }
}

function obstacle1(){
  if(frameCount%100===0){
  var pipe=createSprite(1300,550,10,10);
  pipe.addImage(obstacle1Img);
  pipe.scale=0.6;
  pipe.velocityX=-(15+3*score/100);
  pipe.lifetime=260;
  obstacleGroup1.add(pipe);
}
}

function obstacle2(){
  if(frameCount%100===0){
  var car=createSprite(1300,520,10,10);
  car.addImage(obstacle2Img);
  car.scale=0.3;
  car.velocityX=-(15+3*score/100);
  car.lifetime=260;
  obstacleGroup2.add(car);
}
}

function obstacle3(){
  if(frameCount%100===0){
  var suneo=createSprite(1300,480,10,10);
  suneo.addImage(obstacle3Img);
  suneo.scale=0.15;
  suneo.velocityX=-(15+3*score/100);
  suneo.lifetime=260;
  obstacleGroup3.add(suneo);
}
}
