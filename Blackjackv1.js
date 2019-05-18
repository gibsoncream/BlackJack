// Deck of Cards variables
const cardSuits = ["&clubs;", "&hearts;", "&diams;", "&spades;"];
const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = [];
let playerWeights = [];
let dealerWeights = [];
let hitmeButtonClicker = 0;

$(() => {

// Creation of the deck
const deckCreate = () => {
  for (let i = 0; i < cardSuits.length; i++) {
    for (let j = 0; j < cardValues.length; j++) {
      let cardWeight = parseInt(cardValues[j]);
      if (cardValues[j] === "J" || cardValues[j] === "Q" || cardValues[j] === "K") {
        cardWeight = 10;
      } if (cardValues[j] === "A") {
        cardWeight = 11;
      }
      let card = {
        Suit: cardSuits[i],
        Value: cardValues[j],
        Weight: cardWeight
      }; 
      deck.push(card);
    }
  } return deck;
};

// Shuffling the deck
const shuffle = () => {
  for (let i = 0; i < 1000; i++) {
    let loc1 = Math.floor((Math.random() * deck.length));
    let loc2 = Math.floor((Math.random() * deck.length));
    let loc3 = deck[loc1];
    deck[loc1] = deck[loc2];
    deck[loc2] = loc3;
  }
};

// Dealing the player's cards
const dealPlayerCards = pos => {
  let card = deck.shift();
  $('.playerDisplayCards').eq(pos).html(`${card.Suit} <br /> ${card.Value}`);
  playerWeights[pos] = card.Weight;
  playerPointsChecker();
  playerAceChanger();
  divPlayerScore();
  scoreChecker();
  return playerWeights;
};

// Dealing the dealer's cards
const dealDealerCards = pos => {
  let card = deck.shift();
  $('.dealerDisplayCards').eq(pos).html(`${card.Suit} <br /> ${card.Value}`);
  dealerWeights[pos] = card.Weight;
  dealerPointsChecker();
  dealerAceChanger();
  divDealerScore();
  scoreChecker();
  return dealerWeights;
};

// Checking the player's points
const playerPointsChecker = () => {
  let playerTotalPoints = playerWeights.reduce((a, b) => a + b, 0);
  return playerTotalPoints;
};

// Checking the dealer's points
const dealerPointsChecker = () => {
  let dealerTotalPoints = dealerWeights.reduce((a, b) => a + b, 0);
  return dealerTotalPoints;
};

// Displaying the player's score
const divPlayerScore = () => {
  $('#playerText').html("Player's Score: " + playerPointsChecker());
};

// Displaying the dealer's score
const divDealerScore = () => {
  $('#dealerText').html("Dealer's Score: " + dealerPointsChecker());
};

// Starting the game
const startGame = () => {
  $('#hitButton').prop('disabled', false);
  $('#standButton').prop('disabled', false);
  deckCreate();
  shuffle();
  dealPlayerCards(0);
  dealPlayerCards(1);
  dealDealerCards(0);
  scoreChecker();
  return deck;
};

// A's > 21 Player Logic
const playerAceChanger = () => {
  for (let i = 0; i < playerWeights.length; i++) {
    if (playerPointsChecker() > 21 && playerWeights[i] === 11) {
      playerWeights[i] = 1;
    }
  }
};

// A's > 21 Dealer Logic
const dealerAceChanger = () => {
  for (let i = 0; i < dealerWeights.length; i++) {
    if (dealerPointsChecker() > 21 && dealerWeights[i] === 11) {
      dealerWeights[i] = 1;
    }
  }
};

// Game logic
const scoreChecker = () => {
      if ((playerPointsChecker() <= 21 && dealerPointsChecker() > 21) || (playerPointsChecker() > dealerPointsChecker() && playerPointsChecker() <= 21 && dealerPointsChecker() >= 17)) {
      $('#gameText').text('Congratulations, you win!');
    } else if (playerPointsChecker() > 21 || (playerPointsChecker() < dealerPointsChecker() && dealerPointsChecker() >= 17)) {
      $('#gameText').text('Sorry, you lose! Please restart the game.');
    } else if (playerPointsChecker() === dealerPointsChecker() && dealerPointsChecker() >= 17) {
      $('#gameText').text("That's a tie! Please restart the game.");
    } else {
      return
    }
    $('#hitButton').prop('disabled', true);
    $('#standButton').prop('disabled', true);
    $('#startButton').prop('disabled', false);
};

    // Start button logic
    $('#startButton').on('click', () => {
      $('#startButton').text('Restart!');
      if (playerWeights.length >= 2) {
        location.reload();
      }
      else {
        startGame();
        $('.playerDisplayCards').eq(0).css('backgroundColor', 'white');
        $('.playerDisplayCards').eq(1).css('backgroundColor', 'white');
        $('.dealerDisplayCards').eq(0).css('backgroundColor', 'white');
        $('.dealerDisplayCards').eq(1).css({
          'backgroundImage': 'url("https:/thumbs.dreamstime.com/t/playing-card-back-pattern-abstract-blue-texture-38939105.jpg")',
          'backgroundRepeat': 'repeat',
          'backgroundSize': '50%'
        });
        $('#startButton').prop('disabled', true);
      }
      });

  // Hit me button logic
    $('#hitButton').on('click', () => {
      hitmeButtonClicker += 1;
      if (hitmeButtonClicker === 1) {
        dealPlayerCards(2);
        $('.playerDisplayCards').eq(2).css('backgroundColor', 'white');
      } else if (hitmeButtonClicker === 2) {
        dealPlayerCards(3);
        $('.playerDisplayCards').eq(3).css('backgroundColor', 'white');
      } else if (hitmeButtonClicker === 3) {
        dealPlayerCards(4);
        $('.playerDisplayCards').eq(4).css('backgroundColor', 'white');
      }
    });

  // Stand button logic
    $('#standButton').on('click', () => {
      dealDealerCards(1);
      $('.dealerDisplayCards').eq(1).css({
        'backgroundColor': 'white',
        'backgroundImage': 'none'
      });
      setTimeout(() => {
        if (dealerPointsChecker() < 17) {
        dealDealerCards(2)
        $('.dealerDisplayCards').eq(2).css('backgroundColor', 'white');
      }
    }, 1000);
      setTimeout(() => {
        if(dealerPointsChecker() < 17 && dealerWeights.length === 3) {
          dealDealerCards(3)
          $('.dealerDisplayCards').eq(3).css('backgroundColor', 'white');
      }
    }, 2000);
      setTimeout(() => {
        if(dealerPointsChecker() < 17 && dealerWeights.length === 4) {
          dealDealerCards(4)
          $('.dealerDisplayCards').eq(4).css('backgroundColor', 'white');
      }
    }, 3000);
  });
});
