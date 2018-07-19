let icons = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
// let icons = ["leaf", "bomb", "leaf", "bomb"];
// let icons = ["bomb", "bomb"];


const deck = document.body.querySelector('.deck');
let shuffledCards = shuffle(icons);

function createUnorderedCardList(icon){
  let li = document.createElement('li');
  let i = document.createElement('i');

  li.setAttribute("class", "card");
  i.setAttribute("class", "fa " + icon);

  li.appendChild(i);
  deck.appendChild(li);
};

shuffledCards.forEach(function prependFaToCardName(c){ //outputs an element in array *one* at a time
  let faCardName = "fa-" + c;
  createUnorderedCardList(faCardName);
});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let openCards = []; //Should only have 2 cards
let cards = document.querySelectorAll('li.card');
let isFirstClick = false;

// Add an event listener to each card to listen for user interaction, 'click'
cards.forEach(function(card){
  card.addEventListener('click', function(e){
    if(!isFirstClick){
      isFirstClick = true;
      startTimer();
    }

    const ct = e.target;
    if(!openCards.includes(ct)) {
      ct.classList.add('open', 'show');
      openCards.push(ct);
    }

    if(openCards.length === 2) {
      compareTwoCards(openCards);
    }
  })
});

// let time = document.querySelector('#timer');
let timer;
let min = document.querySelector('.minutes');
let sec = document.querySelector('.seconds');

let m = 0;
let s = 0;

function startTimer() {
  timer = setInterval(function() {
    if(s === 59){
      m++;
      if(m < 10){
        m = '0' + m;
        min.innerHTML = m;
      }
      min.innerHTML = m;
      s = 0;
    }

    s++;
    if(s < 10){
      s = '0' + s;
      sec.innerHTML = s;
    }
    sec.innerHTML = s;
  }, 1000);
}

let matchedCards = [];

// Compare two cards with two scenarios, successful match and failure match
function compareTwoCards(arr){
  if (arr[0].firstChild.className === arr[1].firstChild.className){
    arr.forEach(function(card){
      card.classList.add('match');

      // Added to the matched cards array
      matchedCards.push(card);
    });
    arr.length = 0;

    increaseCounter();

    if(matchedCards.length === icons.length){
      // clearInterval()
      displayModal();
    }
  } else {
    setTimeout(function() {
      arr.forEach(function(card){
        card.classList.remove('open', 'show');
      });
      arr.length = 0;
    }, 500);

    increaseCounter();

  } //else
} //compareTwoCards f(n)

let counter = 0;
let moves = document.querySelector('.moves');

// A counter to keep track on number of moves
function increaseCounter() {
  counter++;
  moves.innerHTML = counter;
  changeStarRating();
}

let stars = document.body.querySelectorAll('.fa-star');

function changeStarRating() {
  let star = document.body.querySelector('.fa-star');
  if(counter % 10 === 0){
    star.classList.remove('fa-star');
    star.classList.add('fa-star-o');
  }
}

// A modal that shows when all cards are matched
let modal = document.querySelector(".modal");
let title = document.querySelector(".modal-title");
let listStars = document.body.querySelector('.modal-stars');

function displayModal() {
    // let modalStars = [...stars];
    // modalStars.forEach(function(i){
    //   let li = document.createElement('li');
    //   li.append(i);
    //   listStars.append(li);
    // })

    // title.innerHTML = `Congratulations! You matched all the cards in ${counter} moves within ${totalTime} seconds!`
    title.innerHTML = `Congratulations!
                       You matched all the cards in ${counter}
                       moves within ${m} minutes and ${s} seconds!
                       You get ${stars.length} stars!`
    setTimeout(function() {
      modal.classList.add("show-modal");
    }, 250);

}

let resetButton = document.querySelector(".reset");

// A function that resets the game
function resetGame() {
  modal.classList.remove("show-modal");

  function resetTimer() {
    clearInterval(timer);
    min.innerHTML = '00';
    sec.innerHTML = '00';
  };

  function resetCards() {
    matchedCards = [];
    cards.forEach(function(c){
      c.classList.remove('open', 'show', 'match')
    })
  }

  function resetMoves() {
    counter = 0;
    moves.innerHTML = 0;
  }

  // function resetStars() {
  //   modalStars = [];
  //   stars.forEach(function(s){
  //     if (s.classList.contains("fa-star-o")){
  //       s.classList.remove('fa-star-o');
  //       s.classList.add('fa-star');
  //     }
  //   });
  // }

  resetTimer();
  resetCards();
  resetMoves();
  // resetStars();
}

resetButton.addEventListener("click", resetGame);
