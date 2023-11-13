// creates a array with the colors
var buttonsColors = ["red", "blue", "green", "yellow"];

// creates a game pattern
var gamePatterns = [];

//creates a array that saves the pattern that the user clicked
var userClickedPattern = [];

//Event listener to start the game
var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Identify which color did the user play and insert in the array
$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//check answer

function checkAnswer(currentLevel){

  if(gamePatterns[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePatterns.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    // wrong answer trigger
    playSound("wrong");

    $("body").addClass("game-over");
    $("h1").text("Game Over. Press any key to start over.")

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}
// Creates a random number 0-3. Links the randon number with the colors. insert pattern in the game pattern
function nextSequence() {

  userClickedPattern=[];
  level ++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonsColors[randomNumber];
  gamePatterns.push(randomChosenColor);

  //On click select the element's ID and execute ne following function.

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //play
  playSound(randomChosenColor);
}
// Triggers again the function after a click
//$(".btn").click(nextSequence);

function playSound(name) {
  //Plays a audio for each clicked color
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animate when the buttons are pressed
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");

  },50);
}
//starting over
function startOver(){
  level = 0;
  gamePatterns = [];
  started = false;
}