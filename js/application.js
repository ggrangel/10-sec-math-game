let Game = function() {
  this.score = 0;
  this.gameStart = false;

  this.newOperation = function() {
    let n1 = _.random(1, 10);
    let n2 = _.random(1, 10);

    this.res = n1 + n2;

    $("#n1").html(n1);
    $("#n2").html(n2);
  };
  this.evaluateResult = function(answer) {
    return answer === this.res;
  };
  this.increaseScore = function() {
    this.score++;
  };
};

$(document).on("keypress", function(e) {
  if (e.which === 13) {
    resultInput = $("#result");
    correct = game.evaluateResult(parseInt(resultInput.val()));
    resultInput.val("");
    if (correct) {
      game.increaseScore();
      $("#current-score").html(game.score);
      game.newOperation();
      timeLeft++;
      display = $("#sec-left");

      display.text(timeLeft);
    }
  }
});

$(document).ready(function() {
  HIGHEST = 0;

  res = game.newOperation();

  $("#result").focus();
  $("#result").on("keyup", function() {
    startGame();
  });
});

var initGame = function() {
  game = new Game();
};

var timeLeft = 10;
var interval;
var startGame = function() {
  if (!interval) {
    interval = setInterval(function() {
      timeLeft--;
      display = $("#sec-left");
      display.text(timeLeft);

      if (timeLeft === 0) {
        display.text("0");
        $("#result").prop("disabled", true);
        clearInterval(interval);
        interval = undefined;
        if (game.score > HIGHEST) {
          HIGHEST = game.score;
          $("#high-score").text(HIGHEST);
        }
      }
    }, 1000);
  }
};

initGame();

var playAgain = function() {
  $("#result").focus();
  $("#result").val("");
  $("#result").prop("disabled", false);
  initGame();
  game.newOperation();
  $("#current-score").text(0);
  timeLeft = 10;
  display = $("#sec-left");

  display.text(timeLeft);
};
