//Create variables here
var database;
var dog;
var sadDog
var happyDog;
var foods, foodStock;

// the preload function
function preload()
{
  sadDog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

// the setup function
function setup() {
  // creating a canvas of size 500, 500
	createCanvas(500, 500);
  
  // assigning firebase database to the variable database
  database = firebase.database();

  // creating the dog sprite
  dog=createSprite(250,250,150,150);
  // adding the dog image to the sprite
  dog.addImage(sadDog);
  dog.scale=0.15;

  // fetching the foos stock from the database that I have created
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}

// the draw function
function draw() {  
  // setting the background colour
  background(46, 139, 87);

  // writing the note text
  fill("white");
  textSize(15);
  text("Note: Press UP_ARROW key to feed Jimmy the Milk", 100, 20);

  // displaying the number of food
  fill("blue");
  textSize(20);
  text("Number of Food available:-"+foods, 150, 50);

  // feeding the dog using the up arrow
  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(happyDog);
  }

  // displaying the sprites
  drawSprites();
  //add styles here
}

// function to read the values from the database
function readStock(data){
  foods = data.val();
}

// function to write values in database
function writeStock(x){  
  // the if condition so that the stock never becomes negative
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food : x
  })
}