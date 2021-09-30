const colours = ["red", "blue", "green", "yellow"];
var userPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePres(userChosenColor);
    //check
    checkProgress(userPattern.length-1);
});

function checkProgress(lastValueIndex) {
    if (gamePattern[lastValueIndex] === userPattern[lastValueIndex]) {
        console.log("correct");
        if (gamePattern.length === userPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart")
        startOver();
    }
}

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colours[randomNumber];
    gamePattern.push(randomColor);

    $("." + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePres(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 200);
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}