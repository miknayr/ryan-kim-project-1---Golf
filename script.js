document.addEventListener('DOMContentLoaded',domloaded,true);
function domloaded(){
    // your code here.

    

const swingButton = document.querySelector('input[type="reset"]')
const reset = document.querySelector('reset[class="button"]')

function randomInteger(min, max) {
    return Math.trunc(Math.random() * (max - min + 1)) + min;
  }

    
  function tiger() {
    document.getElementById("z").src="./images/tiger.gif"
}

function ballWin() { // celebration;
        setTimeout(function() {
            hype.volume = 0.4
            hype.play();
            tiger();
        }, 4200);
        setTimeout(function() {
            document.getElementById("z").src=" "  
         }, 4000);
         clearInterval(ballMovement)
        }



// ~~~~~~ most variables~~~~~~~~~~~
var shouldStartTimer = true;
var intervalId = null; 
var swingPower = 0;

var teeToGreen = document.getElementById("layerOne");
var holeDistance = teeToGreen.getContext('2d');
var shapes = teeToGreen.getContext('2d');


// coordinates for the hole
var xStart = randomInteger(100, 400)
var yStart = randomInteger(800, 950)
var xHole = randomInteger(50, 400)
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
// var gameStatus = null; <-- will need later??
var hype = document.getElementById("hype"); 
var lowstinger = document.getElementById("lowstinger"); 
var swing = document.getElementById("swing"); 

var rightPressed = false;
var leftPressed = false;
var bagelBall = document.getElementById('bagel')




document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        maxmovement.degrees += 10
        console.log("right key pressed and  " + maxmovement.degrees)
        
 
        bagelBall.style.transform = `rotate(${maxmovement.degrees}deg)`;
        if (maxmovement.degrees == 350) {
            maxmovement.degrees = -10;
        } else if (maxmovement.degrees == 360) {
            maxmovement.degrees = 0;
        } else if (maxmovement.degrees == 370) {
            maxmovement.degrees = 10
        }
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        maxmovement.degrees -= 10
        console.log("left key pressed and  " + maxmovement.degrees)
        
   
        bagelBall.style.transform = `rotate(${maxmovement.degrees}deg)`;

        if (maxmovement.degrees == 0) {
            maxmovement.degrees = 360;
        } else if (maxmovement.degrees == -10) {
            maxmovement.degrees = 350;
        } else if (maxmovement.degrees == -20) {
            maxmovement.degrees = 340
        }
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

// math functions   //



var numberOfStrokes = 0

let clubs = [
    { name: "Driver", value: 300},
    { name: "Fairway", value: 225},
    { name: "Iron", value: 150},
    { name: "Wedge", value: 75},
    { name: "Putter", value: 30}
]

var clubSelection = 0

var clubDistance = clubs[clubSelection].value

var playerSwingDistance = swingPower * clubs[clubSelection].value * 0.01

var xDistance = xStart - xHole;
var yDistance = yStart - yHole;




const slopeIndex = (x, y) => {
    return (y / x);
}



const theBrendan = (x, y, x2, y2) => {
    return Math.round(Math.sqrt((x - x2) ** 2 + (y - y2) ** 2));
}

var distanceToHole = theBrendan(xStart, yStart, xHole, yHole); //<--- pythagorean theorem // this is the hypotenuse

var playerAngle = Math.tan(angle);

// math functions end // 



// const slopeIndex = (x, y) => {
//     return (y / x);
// }

var slopeAngle = slopeIndex(xDistance, yDistance); // <--- this is the winning slope 

var winningDistance = .9 * distanceToHole;

var swingDistance = swingPower * distanceToHole * .01;

var ySumBtH = Math.abs(xBall - xHole)
var xSumBtH = Math.abs(yBall - yHole)

// var sumBtH = xSumBtH + ySumBtH

// let xIncrement = xHole / xBall

// let yIncrement = yHole / yBall


var hitDistance = null
var numberOfStrokes = 0


var playerSwingDistance = swingPower * clubs[clubSelection].value * 0.01



document.getElementById('choice1').addEventListener('click', clubplus); 
document.getElementById('choice2').addEventListener('click', clubminus); 


function clubplus() {


    clubSelection++
    if (clubSelection == 5){
        clubSelection = 0;
    }
    document.querySelector('#clubSelection').innerText = "Club: " + clubs[clubSelection].name;
    console.log("the current club selection is : " + clubs[clubSelection].name)
    console.log("the current club distance is : " + clubs[clubSelection].value)
}

function clubminus() {
var clubDistance = clubs[clubSelection].value
      clubSelection--
    
    if (clubSelection == -1){
        clubSelection = 4;
    }

    document.querySelector('#clubSelection').innerText = "Club: " + clubs[clubSelection].name;
    console.log("the current club selection is : " + clubs[clubSelection].name)
    console.log("the current club distance is : " + clubs[clubSelection].value)
}

var ship = {  // reset ship position for demo
    xBall,
    yBall
  }
var maxHit = {
    xCurrentMax,
    yCurrentMax
}
  var xCurrentMax = Math.cos(angle) * playerSwingDistance + xBall // <--- coordinates!
  var yCurrentMax = Math.sin(angle) * playerSwingDistance + yBall // <--- coordinates!
  


var maxmovement = {
    degrees: 90,
    amount: clubs[clubSelection].value
  }
  var actualmovement = {
    degrees: 90,
    amount: playerSwingDistance
  }


  var shapes = document.querySelector("canvas").getContext("2d");
  
  (function loop() {
    shapes.clearRect(0, 0, 300, 150);
     drawStatic();
      drawBall();
      drawCup();
    var ship = {  // reset ship position for demo
      xBall,
      yBall
    }
  
    shapes.strokeRect(ship.xBall - 2, ship.yBall - 2, 4, 4);
    shapes.fillText("From", ship.xBall + 5, ship.yBall);
  
    var angle = (maxmovement.degrees - 90) / 180 * Math.PI; // compensate angle -90°, conv. to rad
    ship.xBall += maxmovement.amount * Math.cos(angle); // end ball x coordinate
    ship.yBall += maxmovement.amount * Math.sin(angle); // end ball y coordinate
  
    shapes.strokeRect(ship.x - 2, ship.y - 2, 4, 4);
    shapes.fillText(maxmovement.degrees + "°", ship.xBall + 5, ship.yBall);
    
    
    maxmovement.degrees = maxmovement.degrees % 360;
    requestAnimationFrame(loop);
    
  }) ();



// // ~~~~~~~~ end of variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





var xCurrentMax = Math.cos(angle) * playerSwingDistance + xBall // <--- coordinates!
var yCurrentMax = Math.sin(angle) * playerSwingDistance + yBall // <--- coordinates!


var xSlope = xBall - xCurrentMax;
var ySlope = yBall - yCurrentMax;


console.log('x start y start: ' + xStart + " | "+ yStart)
console.log('x hole y hole: ' + xHole + " | "+ yHole)
// console.log("Your Swing Distance inside power is : " + swingDistance)
// console.log("this is the numeric value of xDistance: " + Math.abs(xDistance))
// console.log("this is the numeric value of yDistance: " + Math.abs(yDistance))
// console.log("this is the distance to hole: " + distanceToHole);
// console.log("this is the current Max for distance" + xCurrentMax + " & " + yCurrentMax)
// console.log("x Slope index " + xSlope)
// console.log("y Slope index " + ySlope)
// console.log("math sin : " + Math.sin(angle))
// console.log("math cos : " + Math.cos(angle))
// console.log("this is winning distance: " + winningDistance)
// console.log("line 91 slope index / win angle : " + slopeAngle)



holeDistance.beginPath(0,0); // <--- not sure what this does.
holeDistance.moveTo(xStart, yStart); // xStart,yStart <---- plug in the above
// holeDistance.lineTo(xHole, yHole); // xHole, yHole <--- plug in the above

// this is the green hole location
   
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

shapes.beginPath(); // <--- ball canvas  current max
shapes.arc(xCurrentMax, yCurrentMax, 5, 0, Math.PI*2); // <- fill xGraph, yGraph
shapes.lineTo(ship.xBall, ship.yBall);
shapes.fillStyle = "yellow";
shapes.fill();
shapes.lineWidth = 1;
shapes.strokeStyle = 'black';
shapes.stroke();
shapes.closePath();

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
}


document.getElementById("menuDist").innerText=`Distance to Hole: ${distanceToHole}`;
document.getElementById("stroke").innerText=`Stroke: ${numberOfStrokes}`;
// document.getElementById("clubChoice").innerText= "Club: " + clubs[clubSelection].name;

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



function drawfakeBall() {
    shapes.beginPath(); // <--- ball canvas 2
    shapes.arc(xCurrentMax, yCurrentMax, 5, 0, Math.PI*2); // <- fill xGraph, yGraph
    shapes.fillStyle = "yellow";
    shapes.fill();
    shapes.lineWidth = 1;
    shapes.strokeStyle = 'black';
    shapes.stroke();
    shapes.closePath();
     }
  
// ~~~~~~~~ second canvas~~~~~~~~~~~~~

function animeBall() {
    shapes.clearRect(0, 0, layerOne.width, layerOne.height);

    drawStatic();
    drawBall(); 
    drawCup();
    drawfakeBall()
}


// function ballMovement() {
// setTimeout(function(){
//             var ballMovement = setInterval(playerBall, 25);
//         }, 0); // <--- adjust this number for ball movement delay
//     }


// function playerBall() {
   
//     var playerSwingDistance = swingPower * clubs[clubSelection].value * .01
//     var playerAngle = Math.tan(angle);

//     drawStatic()
//     console.log("line 442 " + swingPower);

//         shapes.clearRect(0, 0, layerOne.width, layerOne.height);
//         animeBall(); // <-- check line 386 to implement delay
//         if (xBall < xHole) {
//             xBall--
//             console.log("updated xBall location" + xBall)
//         } else if (xBall > xBall) {
//             xBall++
//             console.log("updated xBall location" + xBall)
//         }
//         if (yBall < yBall) {
//             yBall--
//             console.log("updated yBall location" + yBall)
//         } else if (yBall > yHole) {
//             yBall++
//             console.log("updated yBall location" + yBall)
//         }if ((xBall + 10) > (xHole) && (xBall - 10) < (xHole + 5) && (yBall + 10) > (yHole) && (yBall - 10) < (yHole + 5)) {
//             xBall = xHole;
//             yBall = yHole
//             clearInterval(ballMovement)
//             console.log("ball is cleared");
//             playerSwingDistance = i
//     }
//     drawStatic()
//     drawBall(); 
//     drawCup ();

    
// }

// function ballLoop() {

//     // var sumBtH = xSumBtH + ySumBtH
//     var wholeSwingDistance = Math.round(swingPower * distanceToHole * .01);
//     console.log("this is the ball loop")
//     for (let i = 0; i <= wholeSwingDistance; i++) {
    
//         drawStatic()
//     shapes.clearRect(0, 0, layerOne.width, layerOne.height);
//     if(yBall < yHole) {
//         yBall++
     
//     } else if (yBall > yHole) {
//       yBall--
      
//     }
//     if(xBall < xHole) {
//       xBall++
      
//     } else if (xBall > xHole) {
//       xBall--
     
//     } if ((xBall + 10) > (xHole) && (xBall - 10) < (xHole + 5) && (yBall + 10) > (yHole) && (yBall - 10) < (yHole + 5)) {
//         // this magnetizes the ball to go into the hole if youre close ? not sure how close"
//         xBall = xHole;
//         yBall = yHole
//         console.log("ball is cleared");
//         wholeSwingDistance = i
       
//     }
    
//     drawStatic();
//     drawCup();
//     drawBall();  
// }
// }




function ballMovement() {
    numberOfStrokes++
    setTimeout(function(){
        var ballMovement = setInterval(draw, 6);
    }, 0); // <--- adjust this number for ball movement delay
}

function draw() {
    
    drawStatic()
    shapes.clearRect(0, 0, layerOne.width, layerOne.height);
    if(yBall < yHole) {
      yBall++
    } else if (yBall > yHole) {
      yBall--
    }
    if(xBall < xHole) {
      xBall++
    } else if (xBall > xHole) {
      xBall--
    } if ((xBall + 20) > (xHole) && (xBall - 5) < (xHole + 15) && (yBall - 10) > (yHole) && (yBall - 5) < (yHole + 15)) {
        clearInterval(ballMovement);
        console.log("ball is cleared");
    }
    
    drawStatic();
    drawCup();
    drawBall();  

    console.log("line  Your Swing Distance power is : " + playerSwingDistance) 
    console.log("line  " + swingPower);
}



const playerHit = () => {
    var playerSwingDistance = swingPower * clubs[clubSelection].value * .01
    swing.play();
    swing.volume = 0.2
    numberOfStrokes++
    document.getElementById("stroke").innerText=`Stroke: ${numberOfStrokes}`;
    playerBall()
    console.log("you hit! line 515")
    gameStatus = false


    
    if ((xBall == xHole) && (yBall == yHole)) {
        console.log("Nice Shot!");
        ballWin();
    }
}


//     // function ballMovement() {
//     //     numberOfStrokes++
//     //     setTimeout(function(){
//     //         var ballMovement = setInterval(playerBall, 6);
//     //     }, 0); // <--- adjust this number for ball movement delay
//     // }
// function playerBall() {
   
//     var playerSwingDistance = swingPower * clubs[clubSelection].value * .01
//     var playerAngle = Math.tan(angle);
//     // for (let i = 0; i <= wholeSwingDistance; i++) {
//     // if xBall == 
//     drawStatic()
   

//         shapes.clearRect(0, 0, layerOne.width, layerOne.height);
//         animeBall(); // <-- check line 386 to implement delay
//         if (xBall < xHole) {
//             xBall--
           
//         } else if (xBall > xBall) {
//             xBall++
            
//         }
//         if (yBall < yBall) {
//             yBall++
           
//         } else if (yBall > yHole) {
//             yBall--
            
//         }if ((xBall + 10) > (xHole) && (xBall - 10) < (xHole + 5) && (yBall + 10) > (yHole) && (yBall - 10) < (yHole + 5)) {
//             xBall = xHole;
//             yBall = yHole
//             clearInterval(ballMovement)
//             console.log("ball is cleared");
//             playerSwingDistance = i
//     }
//     drawStatic()
//     drawBall(); 
//     drawCup ();

    
// }


/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~depreciated ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const holeInOne = () => {
    
//     var swingDistance = swingPower * distanceToHole * .01;
//     var playerSwingDistance = swingPower * clubs[clubSelection].value * .01

//     if (playerSwingDistance < clubs[clubSelection].value { // if you change this to swingDistance < winning distance, it doesnt work
//         swing.play();
//         swing.volume = 0.4
//         gameStatus = true;
//         numberOfStrokes++
//         console.log("this is player swing distance" + playerSwingDistance)
//         // playerBall();
//         document.getElementById("stroke").innerText=`Stroke: ${numberOfStrokes}`;
//         // console.log("this is where number of strokes, swing button: " + numberOfStrokes)
//         // console.log("line459 this is angle being logged: " + angle)
        
//         // console.log('you lose')
//         // console.log("Your swing Distance less than 50 is: " + swingDistance)
//         // console.log("Your swing swingPower more than 50 is: " + swingPower)
//         // console.log("this is winning distance: " + winningDistance)
//     } else {
//         gameStatus = true;
//         console.log("this is player swing distance" + playerSwingDistance)
//         // lowstinger.volume = .6
//         // lowstinger.play();
//         // playerBall();
//         // ballWin();
//         numberOfStrokes++
//         document.getElementById("stroke").innerText=`Stroke: ${numberOfStrokes}`;
//         // console.log("this is where number of strokes, swing button: " + numberOfStrokes)
//         // console.log("line474 this is angle being logged: " + angle)
//         // console.log('you win')
//         // console.log("Your swing Distance more than 50 is: " + swingDistance)
//         // console.log("Your swing swingPower more than 50 is: " + swingPower)
//      }
    
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
            intervalId = setInterval(power, 10);
            shouldStartTimer = false;
        } else {
            clearInterval(intervalId);
            shoudStartTimer = true;
            ballMovement()
            // playerHit();
         
           

        }
       ;
    })
    
    

    console.log("the current club distance is : " + clubs[clubSelection].value)
    console.log("the ship x ball is : " + ship.xBall)
    console.log("the ship x ball is : " + ship.yBall)
   

    //  console.log('x start y start: ' + xStart + " | "+ yStart)
    //  console.log('x hole y hole: ' + xHole + " | "+ yHole)
    //  console.log("Your Swing Distance inside power is : " + swingDistance)
    //  console.log("this is the numeric value of xDistance: " + Math.abs(xDistance))
    //  console.log("this is the numeric value of yDistance: " + Math.abs(yDistance))
    //  console.log("this is the distance to hole: " + distanceToHole);
    //  console.log("this is winning distance: " + winningDistance)


 

}

// ~~~~~~~~~~~~~ this is the end of the dom content loader ~~~~~~~~~~~~~~~ //


// swingButton.addEventListener('click', () => {
//       console.log(target)
// })