var helicopterSprite, helicopterIMG;
var packageSprite,packageIMG;
var packageBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;

	packageSprite=createSprite(395, 105, 5, 5);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

  packageBody = Bodies.circle(395, 105, 5, {isStatic : true})
  World.add(world, packageBody)
	

  helicopterBody = (400, 100, 5, {isStatic : true})
	World.add(world, helicopterBody)
  
	helicopterSprite = createSprite(400, 100, 5, 5)
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6;

	zone1 = new Zone(400, 640, 200, 30);
  zone2 = new Zone(285, 600, 30, 110);
  zone3 = new Zone(515, 600, 30, 110);

  ground1 = new Ground(400, 665, 800, 20);


  Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  Engine.update(engine)
  background("black");

  zone1.display();
  zone2.display();
  zone3.display();
  ground1.display();


  packageSprite.x = packageBody.position.x;
  packageSprite.y = packageBody.position.y;

  keyPressed();

  
  drawSprites();
 
}

function keyPressed() {
 if (keyDown("down")) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
    packageBody = Bodies.circle(helicopterSprite.x, 105, 5, {restitution : 0.3, density : 0.2, friction : 0.2})
    World.add(world, packageBody)
	
  }

  if(keyDown("right"))
  {
    helicopterSprite.x = helicopterSprite.x + 20;
    translation={x:+20,y:0}
    Matter.Body.translate(packageBody, translation)

  }

  if(keyDown("left"))
  {
    helicopterSprite.x = helicopterSprite.x - 20;
    translation={x:-20,y:0}
    Matter.Body.translate(packageBody, translation)

  }
}



