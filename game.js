var arr = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];

var started = false;

var level = 0;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    // if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        console.log("success");

        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                // previousSequence(gamePattern);
                nextSequence();
            }, 1000);
        }
    } else {
        audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            gamePattern = [];
            userClickPattern = [];
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

function startOver() {
    userClickPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
}
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1)
})

function nextSequence() {
    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
    userClickPattern = [];
    $("#level-title").text("Level " + level);
    // creates a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    // randomChosenColor contains position of randomvariable in array 
    var randomChosenColor = arr[randomNumber];

    gamePattern.push(randomChosenColor); //pushed the randomChosenColor into gamePattern

    // var selectedButton=$("btn")[randomChosenColor];
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //flash effect for a button
    playSound(randomChosenColor);
    // audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    animatePress(randomChosenColor);
}

function playSound(name) { //function to play sounds related to any button 
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}