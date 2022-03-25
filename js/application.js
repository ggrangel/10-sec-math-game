let Game = function() {
  this.score = 0;
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
    }
  }
});

$(document).ready(function() {
  HIGHEST = 0;

  res = game.newOperation();

  $("#result").focus();
});

game = new Game();
