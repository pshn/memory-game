/*
* Create a list that holds all of your cards ✅
*/

// let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
let cards = ["leaf", "bomb", "leaf", "bomb"];

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below ✅
*   - loop through each card and create its HTML ✅
*   - add each card's HTML to the page ✅
*/

const deck = document.body.querySelector('.deck');
let shuffledCards = shuffle(cards);

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

// Shuffle function from http://stackoverflow.com/a/2450976
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

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one) ✅
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) ✅
*  - if the list already has another card, check to see if the two cards match ✅
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) ✅
*    + if the cards do not match, remove the cards from the list ✅ and hide the card's symbol (put this functionality in another function that you call from this one) ✅
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) ✅
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

let counter = 0;
let moves = document.querySelector('.moves');
let allMatchedCards = [];

function increaseCounter(){
  counter++;
  moves.innerHTML = counter;
}

function clearCardsList(a){
  a.length = 0;
};

let openCardsArray = [];
let cardsArray = document.querySelectorAll('li.card');

cardsArray.forEach(function(c){
  c.addEventListener('click', revealCard)
});

function revealCard(){
  this.classList.add('open', 'show');
  openCardsArray.push(this);
  if(openCardsArray.length === 2){
    increaseCounter();
    compareTwoCards(openCardsArray);
  }
}

function compareTwoCards(arr){
  if (arr[0].firstChild.className === arr[1].firstChild.className){
    function addMatchClassName(){
      arr.forEach(function(card){
        card.classList.add('match');

        allMatchedCards.push(card);
        if(allMatchedCards.length === 4){
          displayWinModal();
        }
      });
      clearCardsList(arr);
    }
    addMatchClassName();
  } else {
    function removeClassNames(){
      setTimeout(function(){
        arr.forEach(function(card){
          card.classList.remove('open', 'show');
        });
        clearCardsList(arr);
      }, 500);
    }
    removeClassNames();
  } //else
} //compareTwoCards f(n)

function displayWinModal(){
  var modal = document.querySelector(".modal");
  var title = document.querySelector(".modal-title");
  var restartButton = document.querySelector(".restart");

  function showModal() {
    title.innerHTML = "You won!!!!"
    modal.classList.add("show-modal");
  }

  function restartGame(){
    modal.classList.remove("show-modal");
    location.reload();
  }

  restartButton.addEventListener("click", restartGame);

  showModal();
}
