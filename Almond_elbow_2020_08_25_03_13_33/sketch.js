var monkey, monkey_running;
var ground, invisibleGround, groundImage;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 


//creating the variables
var banana_image, bananasGroup, banana;
var stone_image, stonesGroup, stone;


function preload(){
 monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png",        "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png",  "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  stone_image = loadImage("stone.png");
  groundImage = loadImage("jungle.png");
  banana_image = loadImage("banana.png");
}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(50,380,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  bananasGroup = new Group();
  stonesGroup = new Group();
  
  ground = createSprite(200,200);
  ground.scale = 2;
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,405,400,10);
  invisibleGround.visible = false;
}

function draw() {  
  
  if (gameState === PLAY){
  
  score = score + Math.round(getFrameRate() / 60);

  
  if(keyDown("space") && (monkey.y > 298)) {
    monkey.velocityY =-12;
  }
    

  if (stonesGroup.isTouching(monkey) && monkey.scale>0.02){
      monkey.scale = monkey.scale -0.05
      stonesGroup.destroyEach();
      }
    
  
  if (bananasGroup.isTouching(monkey) && monkey.scale<0.5   ){
      monkey.scale = monkey.scale +0.01     
      bananasGroup.destroyEach();
      }  
    
  
    
    
  monkey.velocityY = monkey.velocityY + 0.8;
       
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    
  }
              
  
  
  monkey.depth = monkey.depth +1;

  
 
  monkey.collide(invisibleGround);
  
  
  spawnStones();
  spawnBananas();
  
  drawSprites();
  
  text("Score: " + score, 300, 50);
}




function spawnStones(){
 if(frameCount % 60 === 0){
   stone = createSprite(400,400,5,5);
   stone.setCollider("rectangle", 0,0,250,250)
   stone.addImage(stone_image); 
   stone.velocityX = -6;
   stonesGroup.add(stone);
   stone.scale = 0.35;
   stone.lifetime = 160;
   stone.depth = monkey.depth
 } 
}


function spawnBananas(){
 if(frameCount % 60 === 0){
   banana = createSprite(400,350);
   banana.addImage(banana_image);
   banana.velocityX = -6;
   banana.x = stone.x ;
   bananasGroup.add(banana);
   banana.scale = 0.1;
   banana.lifetime = 160;   
   banana.y = Math.round(random(100,300));

 } 
}

  
