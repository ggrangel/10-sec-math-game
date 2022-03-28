let Game = function (maxN) {
  this.score = 0;
  this.gameStart = false;
  this.maxN = maxN;

  this.newOperation = function () {
    let op = _.sample(["+", "-", "*", "/"]);
    $("#operation").html(op);
    var n1 = _.random(1, this.maxN);

    switch (op) {
      case "+":
        var n2 = _.random(1, this.maxN);
        this.res = n1 + n2;
        break;
      case "-":
        var n2 = _.random(0, n1 - 1);
        this.res = n1 - n2;
        break;
      case "*":
        var n2 = _.random(1, this.maxN);
        this.res = n1 * n2;
        break;
      case "/":
        var n2 = _.random(1, 10);
        var n1 = _.random(1, 10) * n2;
        this.res = parseInt(n1 / n2);
        break;
    }

    $("#n1").html(n1);
    $("#n2").html(n2);
  };
  this.evaluateResult = function (answer) {
    return answer === this.res;
  };
  this.increaseScore = function () {
    this.score++;
  };
};

$(document).on("keypress", function (e) {
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

$(document).ready(function () {
  HIGHEST = 0;

  res = game.newOperation();

  $("#result").focus();
  $("#result").on("keyup", function () {
    startGame();
  });
});

var initGame = function (maxN) {
  game = new Game(maxN);
};

var timeLeft = 10;
var interval;
var startGame = function () {
  if (!interval) {
    $("#maxNumber").prop("disabled", true);
    interval = setInterval(function () {
      timeLeft--;
      display = $("#sec-left");
      display.text(timeLeft);

      if (timeLeft === 0) {
        display.text("0");
        $("#result").prop("disabled", true);
        $("#maxNumber").prop("disabled", false);
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

initGame(10);

var playAgain = function () {
  $("#result").focus();
  $("#result").val("");
  $("#result").prop("disabled", false);
  // $("#maxNumber").prop("disabled", true);
  initGame($("#maxNumber").val());
  game.newOperation();
  $("#current-score").text(0);
  timeLeft = 10;
  display = $("#sec-left");

  display.text(timeLeft);
};

var rangeUpdate = function () {
  maxN = $("#maxNumber").val();
  game.maxN = maxN;
  $("#lblMaxN").html(maxN);
};
