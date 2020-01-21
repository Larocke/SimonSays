const buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(".btn").click((event) => {
  let userChosenColor = event.target.id;

  userClickedPattern.push(userChosenColor);
  animateButton(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length)
})

function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);
  animateButton(randomChosenColor);
  playSound(randomChosenColor);
}

function animateButton(color){
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 500)
}

function playSound(color){
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]){
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(() => {
        userClickedPattern = [];
        nextSequence();
      }, 1000)
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

$(document).on("keypress",() => {
  if(!started){
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }

})

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
