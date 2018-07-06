// let icons = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
let icons = ["leaf", "bomb", "leaf", "bomb"];

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

let counter = 0;
let moves = document.querySelector('.moves');

// A counter to keep track on number of moves
function increaseCounter(){
  counter++;
  moves.innerHTML = counter;
  changeStarRating();
}

function changeStarRating(){
  if(counter % 10 === 0){
    let stars = document.body.querySelector('.fa-star');
    stars.classList.remove('fa-star');
    stars.classList.add('fa-star-o');
  }
}

let openCards = []; //Should only have 2 cards
let cards = document.querySelectorAll('li.card');

// Add an event listener to each card to listen for user interaction, 'click'
cards.forEach(function(card){
  card.addEventListener('click', function(evt){
    // console.log('what is evt?', evt) eventTarget

    const ct = event.target;
    if(!openCards.includes(ct)) {
      ct.classList.add('open', 'show');
      openCards.push(ct);
      if(openCards.length === 2) {
        compareTwoCards(openCards);
      }
    }
  })
});

let allMatchedCards = [];

// Compare two cards with two scenarios, successful match and failure match
function compareTwoCards(arr){
  // startTimer();
  console.log('compare', arr[0])
  console.log('compare', arr)

  if (arr[0].firstChild.className === arr[1].firstChild.className){
    (function(){
      arr.forEach(function(card){
        card.classList.add('match');

        // Successful matched cards are counted to show a modal
        allMatchedCards.push(card);
        if(allMatchedCards.length === 4){
          displayWinModal();
        }
      });
      arr.length = 0;
    })();
    increaseCounter();
  } else {
    (function(){
      setTimeout(function(){
        arr.forEach(function(card){
          card.classList.remove('open', 'show');
        });
        arr.length = 0;
      }, 500);
    })();
    increaseCounter();
  } //else
} //compareTwoCards f(n)

let startTime = 0;
let totalTime = 0;

function startTimer(){
  if(counter === 1){
    startTime = Date.now();
    console.log(startTime)
  }
}

function calculateTime(end){
  totalTime = Math.floor((end - startTime)/1000);
}

// A modal that shows when all cards are matched
function displayWinModal(){
  let modal = document.querySelector(".modal");
  let title = document.querySelector(".modal-title");
  let restartButton = document.querySelector(".restart");

  function showModal() {
    endTime = Date.now()
    calculateTime(endTime);

    let modalStarsUl = document.body.querySelector('.modal-stars');
    let starsUl = document.body.querySelectorAll('.stars li');

    starsUl.forEach(function(li){
      li.childNodes[0].classList.add("fa-3x")
      modalStarsUl.append(li)
    })

    title.innerHTML = `Congratulations! You matched all the cards in ${counter} moves within ${totalTime} seconds!`
    modal.classList.add("show-modal");
  }

  // A function that resets the game
  function restartGame(){
    modal.classList.remove("show-modal");
    location.reload();
  }

  restartButton.addEventListener("click", restartGame);

  showModal();
}
