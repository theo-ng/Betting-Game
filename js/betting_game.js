// JS Betting game

var BettingGame = BettingGame || {};

// BettingGame.init = function() {};

BettingGame.run = function() {
  var bankroll = 100;
  var bet;
  var betSlider = document.getElementById('slider-bet');
  var betValue = document.getElementById('slider-bet-value');
  var slider = document.getElementById('slider-guess');
  var sliderValue = document.getElementById('slider-guess-value');
  var guess;

  noUiSlider.create(betSlider, {
    start: [5],
    step: 1,
    range: {
      'min': [5],
      'max': [10]
    }
  });

  noUiSlider.create(slider, {
    start: [1],
    step: 1,
    range: {
      'min': [1],
      'max': [10]
    }
  });
  
  $("#bet").click(function() {
    round(bet, guess);
  });

  $("#reset").click(function() {
    bankroll = 100;
    updateScreen(bankroll);
  });

  betSlider.noUiSlider.on("update", function(values)
  {
    betValue.innerHTML = values[0];
    bet = parseInt(values[0], 10);
    if(bet > bankroll) {
      $("#bet").hide();
    } else {
      $("#bet").show();
    }
  });

  slider.noUiSlider.on("update", function(values)
  {
    sliderValue.innerHTML = values[0];
    guess = parseInt(values[0], 10);
  });

  function round(bet, guess)
  {
    var random = Math.floor((Math.random() * 10) + 1);
    bankroll -= bet;

    var li = $('li');

    if(guess === random)
    {
      li.text("You won!");
      bankroll += bet * 2;
    }
    else if(Math.abs(guess-random) === 1)
    {
      li.text("You are one off! Number was: " + random);
      bankroll += bet;
    } else {
      li.text("Try again! Number was: " + random);
    }

    updateScreen(bankroll);
  }

  var $bankroll = $('#bankroll');
  function updateScreen(bankroll)
  {
    $bankroll.text("Bankroll: " + bankroll);
    if(bet > bankroll) {
      $("#bet").hide();
    }
    if(bankroll < 5) {
      $("#reset").show();
    }
    displayIcons(bankroll);
  }

  function displayIcons(bankroll)
  {
    for(var i=0;i<bankroll;i++) {
      $('#money').append('<i class="fa fa-money"></i>');
    }
  }

  updateScreen(bankroll);

}