// JS Betting game

var BettingGame = BettingGame || {};

// BettingGame.init = function() {};
BettingGame.model = function() {
  var bankroll = 100;
  return {
    setBankroll: function(value) {
      bankroll = value;
    },
    getBankroll: function() {
      return bankroll;
    },
    addToBankroll: function(value) {
      bankroll += value;
    },
    subFromBankroll: function(value) {
      bankroll -= value;
    }
  };
};


BettingGame.run = function() {
  var model = BettingGame.model();

  var bet;
  var betSlider = document.getElementById('slider-bet');
  var betValue = document.getElementById('slider-bet-value');
  var slider = document.getElementById('slider-guess');
  var sliderValue = document.getElementById('slider-guess-value');
  var guess;

  function setup() {
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
      model.setBankroll(100);
      updateScreen(model.getBankroll());
      $("#reset").hide();
    });

    $("#cashOut").click(function() {
      output("Cha ching!");
      model.setBankroll(0);
      updateScreen(model.getBankroll());
    });

    betSlider.noUiSlider.on("update", function(values)
    {
      betValue.innerHTML = values[0];
      bet = parseInt(values[0], 10);
      if(bet > model.getBankroll()) {
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
  }

  function round(bet, guess)
  {
    var random = Math.floor((Math.random() * 10) + 1);
    model.subFromBankroll(bet);

    if(guess === random)
    {
      output("You won!");
      model.addToBankroll(bet * 2);
    }
    else if(Math.abs(guess-random) === 1)
    {
      output("You are one off! Number was: " + random);
      model.addToBankroll(bet);
    } else {
      output("Try again! Number was: " + random);
    }

    updateScreen(model.getBankroll());
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
  };

  function displayIcons(bankroll) {
    $("div i").remove();
    for(var i=0;i<bankroll;i++) {
      $("#money").append('<i class="fa fa-money"></i>');
    }
  };

  function output(message) {
    $('li').text(message);
  };

  setup();
  updateScreen(model.getBankroll());

}