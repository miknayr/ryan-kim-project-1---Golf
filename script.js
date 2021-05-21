document.addEventListener('DOMContentLoaded',domloaded,true);

function domloaded() {
    // your code here.
    

const swingButton = document.querySelector('input[type="reset"]')
const reset = document.querySelector('reset[class="button"]')

function randomInteger(min, max) {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}

function tiger() {
  document.getElementById("z").src="./images/tiger.gif"
}

// function ballWin() { // celebration;
//    setTimeout(function() {
//     document.getElementById("z").src=""
//   }, 8000);
//   clearInterval(ballWin)
 
// }

const holeInOne = () => {
  console.log("this is swing power" + swingPower)
  if (swingPower == 100 ) { // <--- change to get HiOs or not
        cmontiger.volume = .1
      cmontiger.play();
      hype.volume = 0.05
      hype.play();
      tiger();
      hio()
        //  gamestatus = false
      ballWin();
      // cleanUp();
     
   } else {
    swing.volume = 0.1
    swing.play();
    ballMovement()
     
   }

}

// ~~~~~~ most variables~~~~~~~~~~~
var shouldStartTimer = true;
var intervalId = null;
var swingPower = 0;

var teeToGreen = document.getElementById("layerOne");
var holeDistance = teeToGreen.getContext('2d');
var shapes = teeToGreen.getContext('2d');



// coordinates for the hole

var xStart = randomInteger(50, 500)
var yStart = randomInteger(600, 875)
var xHole = randomInteger(50, 500)
var yHole = randomInteger(50, 250)

var xBall = xStart
var yBall = yStart

var xGreen = xHole - (randomInteger(15, 60));
var yGreen = yHole - (randomInteger(15, 60));
var wGreen = randomInteger(75, 120);
var hGreen = randomInteger(75, 120);
var xTee = xStart - 40
var yTee = yStart - 15
var leftPos = xStart - 20
var rightPos = xStart + 20
var angle = 90
var gameStatus = false;
var hype = document.getElementById("hype");
var lowstinger = document.getElementById("lowstinger");
var swing = document.getElementById("swing");

var rightPressed = false;
var leftPressed = false;
var bagelBall = document.getElementById('bagel')
var preview = true;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {

    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        // console.log("right key pressed and  " + maxmovement.degrees)
        
        
        bagelBall.style.transform = `rotate(${maxmovement.degrees}deg)`;
        maxmovement.degrees += 10
        if (maxmovement.degrees == 350) {
          maxmovement.degrees = -10;
        } 

    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        // console.log("left key pressed and  " + maxmovement.degrees)
        
        
        maxmovement.degrees -= 10
        bagelBall.style.transform = `rotate(${maxmovement.degrees}deg)`;
        if (maxmovement.degrees == 0) {
          maxmovement.degrees = 360;
        } 
        
      }
      else if(e.key == "Up" || e.key == "ArrowUp") {
        clubPlus();
      }
      else if(e.key == "Down" || e.key == "ArrowDown") {
        clubMinus();
      }

}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;

    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// math functions //

var numberOfStrokes = 0

let clubs = [
    { name: "Driver", value: 300},
    { name: "Fairway", value: 225},
    { name: "Iron", value: 150},
    { name: "Wedge", value: 75},
    { name: "Putter", value: 30}
]

var clubSelection = 0

// var clubDistance = clubs[clubSelection].value

// var xDistance = xStart - xHole;
// var yDistance = yStart - yHole;

const slopeIndex = (x, y) => {
    return (y / x);
}

const theBrendan = (x, y, x2, y2) => {
    return Math.round(Math.sqrt((x - x2) ** 2 + (y - y2) ** 2));
}

var distanceToHole = theBrendan(xBall, yBall, xHole, yHole) //<--- pythagorean theorem // this is the hypotenuse


// var slopeAngle = slopeIndex(xDistance, yDistance); // <--- this is the winning slope

// var winningDistance = .9 * distanceToHole;

var swingDistance = swingPower * distanceToHole * .01;

var ySumBtH = Math.abs(xBall - xHole)
var xSumBtH = Math.abs(yBall - yHole)



var hitDistance = null
var numberOfStrokes = 0


var playerSwingDistance = swingPower * clubs[clubSelection].value * 0.01

var ship = {  // reset ship position for demo
  xBall,
  yBall
}

document.getElementById('choice1').addEventListener('click', clubPlus);
document.getElementById('choice2').addEventListener('click', clubMinus);

function clubPlus() {
  clubSelection--

  if (clubSelection == -1){
      clubSelection = 4;
  }

  document.querySelector('#clubSelection').innerText = "Club: " + clubs[clubSelection].name + " ~" + clubs[clubSelection].value
  maxmovement.amount = clubs[clubSelection].value
}

function clubMinus() {

  clubSelection++

  if (clubSelection == 5){
      clubSelection = 0;
  }
  document.querySelector('#clubSelection').innerText = "Club: " + clubs[clubSelection].name + " ~" + clubs[clubSelection].value;
  maxmovement.amount = clubs[clubSelection].value
}

var maxmovement = {
  degrees: 0,   // <--- this is angle too
  amount: clubs[clubSelection].value
}

var xNewBall
var yNewBall

var shapes = document.querySelector("canvas").getContext("2d");

(function loop() {
  if (gameStatus = true) {
  if (preview == true) {
    shapes.clearRect(0, 0, 300, 150);
    drawStatic();
    drawCup();
    drawBall();
    var ship = {  // reset ship position for demo
      xBall,
      yBall
    }
    
    // shapes.strokeRect(ship.x, ship.y, 4, 4);
    // shapes.fillText("From", ship.xBall + 5, ship.yBall); <--- this is part of the preview
    
    angle = (maxmovement.degrees - 90) / 180 * Math.PI; // compensate angle -90°, conv. to rad
    ship.xBall += maxmovement.amount * Math.cos(angle); // end ball x coordinate
    ship.yBall += maxmovement.amount * Math.sin(angle); // end ball y coordinate
    // console.log("this is new x coord: " + ship.xBall + "    " + "this is new y coord: " + ship.yBall )
    
    
    // shapes.strokeRect(50, 50, 50, 50);
    // shapes.fillText(maxmovement.degrees + "°", ship.xBall, ship.yBall); // <--- this is the preview
    
    xNewBall = ship.xBall;
    yNewBall = ship.yBall;
    maxmovement.degrees = maxmovement.degrees % 360;
  }
  requestAnimationFrame(loop, 1000); // <-- keep this out
  };
})();





var xShip = maxmovement.amount * Math.cos(angle) + xBall
var yShip = maxmovement.amount * Math.sin(angle) + yBall


console.log('x start y start: ' + xStart + " | "+ yStart)
console.log('x hole y hole: ' + xHole + " | "+ yHole)
// console.log("Your Swing Distance inside power is : " + swingDistance)
// console.log("this is the numeric value of xDistance: " + Math.abs(xDistance))
// console.log("this is the numeric value of yDistance: " + Math.abs(yDistance))
// console.log("this is the distance to hole: " + distanceToHole);
// console.log("this is the current Max for distance" + xPlayerMax + " & " + yPlayerMax)
// console.log("x Slope index " + xSlope)
// console.log("y Slope index " + ySlope)
// console.log("math sin : " + Math.sin(angle))
// console.log("math cos : " + Math.cos(angle))
// console.log("this is winning distance: " + winningDistance)
// console.log("line 91 slope index / win angle : " + slopeAngle)



holeDistance.beginPath(0,0); // <--- not sure what this does.
holeDistance.moveTo(xStart, yStart); // xStart,yStart <---- plug in the above


shapes.rect(xGreen, yGreen, wGreen, hGreen); //can add border for rough edge, 15px maybe  <-- this is aesthetics
shapes.fillStyle = "#7cfc00"; // this is the green box
shapes.fill();

// for some reason this has to be here??? or else the boxes wont fill properly
shapes.beginPath();
shapes.fillStyle = "white"; // this is the hole cup
shapes.arc(xHole, yHole, 10, 0, 5 * Math.PI);
shapes.fill();

shapes.rect(xTee, yTee, 75, 30 );
shapes.fillStyle = "#4ea12b"; // this is the tee box
shapes.fill();


shapes.beginPath();
shapes.fillStyle = "white"; // this is the hole cup
shapes.arc(xHole, yHole, 10, 0, 5 * Math.PI);
shapes.lineWidth = 1;
shapes.strokeStyle = 'black';
shapes.stroke();
shapes.fill();


shapes.beginPath(); // <--- ball
shapes.arc(xBall, yBall, 5, 0, Math.PI*2); // <- fill xGraph, yGraph
shapes.fillStyle = "red";
shapes.fill();
shapes.lineWidth = 1;
shapes.strokeStyle = 'black';
shapes.stroke();
shapes.closePath();

shapes.beginPath();
shapes.arc(leftPos, yStart, 2, 0, 2 * Math.PI);
shapes.fillStyle = "blue"; // this is the left pin
shapes.fill();

shapes.beginPath();
shapes.arc(rightPos, yStart, 2, 0, 2 * Math.PI);
shapes.fillStyle = "blue"; // this is the right pin
shapes.fill();

function drawStatic() {
    shapes.beginPath();
    shapes.arc(leftPos, yStart, 2, 0, 2 * Math.PI);
    shapes.fillStyle = "blue"; // this is the left pin
    shapes.fill();

    shapes.beginPath();
    shapes.arc(rightPos, yStart, 2, 0, 2 * Math.PI);
    shapes.fillStyle = "blue"; // this is the right pin
    shapes.fill();

    shapes.rect(xGreen, yGreen, wGreen, hGreen); //can add border for rough edge, 15px maybe  <-- this is aesthetics
    shapes.fillStyle = "#7cfc00"; // this is the green box
    shapes.fill();

    // for some reason this has to be here??? or else the boxes wont fill properly

   
    shapes.beginPath();
    shapes.fillStyle = "white"; // this is the hole cup 2
    shapes.arc(xHole, yHole, 10, 0, 5 * Math.PI);
    shapes.fill();

    shapes.rect(xTee, yTee, 75, 30 );
    shapes.fillStyle = "#4ea12b"; // this is the tee box
    shapes.fill();


    shapes.beginPath();
    shapes.fillStyle = "white"; // this is the hole cup
    shapes.arc(xHole, yHole, 10, 0, 5 * Math.PI);
    shapes.lineWidth = 1;
    shapes.strokeStyle = 'black';
    shapes.stroke();
    shapes.fill();


    shapes.beginPath(); // <--- ball canvas 2
    shapes.arc(xBall, yBall, 5, 0, Math.PI*2); // <- fill xGraph, yGraph
    shapes.fillStyle = "red";
    shapes.fill();
    shapes.lineWidth = 1;
    shapes.strokeStyle = 'black';
    shapes.stroke();
    shapes.closePath();

    shapes.beginPath();
    shapes.arc(leftPos, yStart, 2, 0, 2 * Math.PI);
    shapes.fillStyle = "blue"; // this is the left pin
    shapes.fill();

    shapes.beginPath();
    shapes.arc(rightPos, yStart, 2, 0, 2 * Math.PI);
    shapes.fillStyle = "blue"; // this is the right pin
    shapes.fill();

    // shapes.strokeRect(ship.xBall - 2, ship.yBall - 2, 4, 4);
    // shapes.fillText("From", ship.xBall + 5, ship.yBall);

    // shapes.strokeRect(ship.x, ship.y, 4, 4);
    // shapes.fillText(maxmovement.degrees + "°", ship.xBall, ship.yBall); // <--- this is the preview
    
}


document.getElementById("menuDist").innerText=`Distance to Hole: ${distanceToHole}`;
document.getElementById("stroke").innerText=`Stroke: ${numberOfStrokes}`;


// ~~~~~second canvas~~~~~~~~


function drawBall() {
  shapes.beginPath(); // <--- ball canvas 2
  shapes.arc(xBall, yBall, 5, 0, Math.PI*2); // <- fill xGraph, yGraph
  shapes.fillStyle = "red";
  shapes.fill();
  shapes.lineWidth = 1;
  shapes.strokeStyle = 'black';
  shapes.stroke();
  shapes.closePath();
}

function drawCup() {
  shapes.beginPath();
  shapes.fillStyle = "white"; // this is the hole cup
  shapes.arc(xHole, yHole, 10, 0, 5 * Math.PI);
  shapes.lineWidth = 1;
  shapes.strokeStyle = 'black';
  shapes.stroke();
  shapes.fill();
}

function animeBall() {
    shapes.clearRect(0, 0, layerOne.width, layerOne.height);
    drawStatic();
    drawCup();
    drawBall();
}

var ballIntervalId;
function ballMovement() {

  setTimeout(function(){
    ballIntervalId = setInterval(playerBall, 5);
  }, 0); // <--- adjust this number for ball movement delay
}

function playerBall() {
  drawStatic()
  shapes.clearRect(0, 0, layerOne.width, layerOne.height);
  animeBall(); // <-- check line 386 to implement delay
  if (yBall < yNewBall) {
    yBall++
  } else if (yBall > yNewBall) {
    yBall--
  } if (xBall < xNewBall) {
    xBall++
  } else if (xBall > xNewBall) {
    xBall--
  }

  if ((xBall + 1) > (xNewBall) && (xBall - 1) < (xNewBall + 1) && (yBall + 1) > (yNewBall) && (yBall - 1) < (yNewBall + 1)) {
    preview = true
    xBall = xNewBall;
    yBall = yNewBall;
    
    document.getElementById("menuDist").innerText=`Distance to Hole: ${theBrendan(xBall, yBall, xHole, yHole)}`;
    // `Distance to Hole: ${distanceToHole}`
   
    console.log("ball is equaled");
    clearInterval(ballIntervalId)  
  }

  if ((xBall + 5) > (xHole) && (xBall - 5) < (xHole + 5) && (yBall + 5) > (yHole) && (yBall - 5) < (yHole + 5)) {
                xBall = xHole;
                yBall = yHole
                swing.volume = 0
                console.log("ball is cleared");
                clearInterval(ballIntervalId)
                preview = false
                animeBall()
                
        }
    
  clearInterval(ballMovement)
  shapes.clearRect(0, 0, layerOne.width, layerOne.height);
  drawStatic()
  drawCup ();
  drawBall ();
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


var hioIntervalId;
function hio() {

  setTimeout(function(){
    hioIntervalId = setInterval(hioBall, 5);
  }, 700); // <--- adjust this number for ball movement delay
}

function hioBall() {
  drawStatic()
  shapes.clearRect(0, 0, layerOne.width, layerOne.height);
  animeBall(); // <-- check line 386 to implement delay
  if (yBall < yHole) {
    yBall++
  } else if (yBall > yHole) {
    yBall--
  } if (xBall < xHole) {
    xBall++
  } else if (xBall > xHole) {
    xBall--
  }
    // document.getElementById("menuDist").innerText=`Distance to Hole: ${theBrendan(xBall, yBall, xHole, yHole)}`;
    document.getElementById("menuDist").innerText= "Distance to Hole: 🚀";
    // `Distance to Hole: ${distanceToHole}`
   
    console.log("ball is equaled");

  if ((xBall + 5) > (xHole) && (xBall - 5) < (xHole + 5) && (yBall + 5) > (yHole) && (yBall - 5) < (yHole + 5)) {
                xBall = xHole;
                yBall = yHole
               

                console.log("ball is cleared");
                clearInterval(hioIntervalId)
                preview = false
                animeBall()
                
        }
    
  clearInterval(hio)
  shapes.clearRect(0, 0, layerOne.width, layerOne.height);
  drawStatic()
  drawCup ();
  drawBall ();
}

// function cleanUp() {
 
//   setTimeout(function() {
//     document.getElementById("z").src=""
//    }, 3000);
    
// }

swingButton.addEventListener('click', (e) => {
  
  var elem = document.getElementById("myBar");
  var reverse = false;

  let power = () => {
    if (reverse == true) {
      swingPower--;

      elem.style.width = swingPower + '%'
      if (swingPower < 1) {
        reverse = false
      }
    } else {
      swingPower++;

      elem.style.width = swingPower + '%';
      if (swingPower > 99) {
        reverse = true
      }
    }
  }

  if (shouldStartTimer) {
    // swing bar start
    swingPower = 0;
    intervalId = setInterval(power, 10);
    shouldStartTimer = false;
    
  } else {
    // swing bar end
    numberOfStrokes++
    document.getElementById("stroke").innerText=`Stroke: ${numberOfStrokes}`;
    // console.log("Distance to Hole: " + distanceToHole)
    // console.log("Distance to Hole: " + xBall + "   |  " + xNewBall)
    preview = false
    clearInterval(intervalId);
    shouldStartTimer = true;
    holeInOne();
    cleanUp();
  }
})




} // ~~~~~~~~~~~~~ this is the end of the dom content loader ~~~~~~~~~~~~~~~ //



    // console.log("the current club distance is : " + clubs[clubSelection].value)
    // console.log("the ship x ball is : " + ship.xBall)
    // console.log("the ship x ball is : " + ship.yBall)
    //  console.log('x start y start: ' + xStart + " | "+ yStart)
    //  console.log('x hole y hole: ' + xHole + " | "+ yHole)
    //  console.log("Your Swing Distance inside power is : " + swingDistance)
    //  console.log("this is the numeric value of xDistance: " + Math.abs(xDistance))
    //  console.log("this is the numeric value of yDistance: " + Math.abs(yDistance))
    //  console.log("this is the distance to hole: " + distanceToHole);
    //  console.log("this is winning distance: " + winningDistance)



// swingButton.addEventListener('click', () => {
//       console.log(target)
// })


// / ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~depreciated ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
