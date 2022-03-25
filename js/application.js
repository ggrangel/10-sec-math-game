let Game = function() {
  this.newOperation = function() {
    let n1 = _.random(1, 10);
    let n2 = _.random(1, 10);

    this.res = n1 + n2;

    $("#n1").html(n1);
    $("#n2").html(n2);
  };
  this.evaluateResult = function(answer) {
    if (answer === this.res) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
  };
};

$(document).on("keypress", function(e) {
  if (e.which === 13) {
    resultInput = $("#result");
    game.evaluateResult(parseInt(resultInput.val()));
    resultInput.val("");
  }
});

$(document).ready(function() {
  HIGHEST = 0;

  res = game.newOperation();

  $("#result").focus();
});

game = new Game();
