/*
* Create a list that holds all of your cards ✅
*/

let icons = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
// let cards = ["leaf", "bomb", "leaf", "bomb"];
// let cards = ["bomb", "bomb"];


/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below ✅
*   - loop through each card and create its HTML ✅
*   - add each card's HTML to the page ✅
*/

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
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) ✅
*/

let counter = 0;
let moves = document.querySelector('.moves');
let allMatchedCards = [];

// A counter to keep track on number of moves
// function increaseCounter(){
//   counter++;
//   moves.innerHTML = counter;
//
//   function starRating(){
//     if(counter % 10 === 0){
//       let stars = document.body.querySelector('.fa-star');
//       stars.classList.remove('fa-star');
//       stars.classList.add('fa-star-o');
//     }
//   }
//   starRating();
// }
//
// let startTime = 0;
// let totalTime = 0;
//
// function startTimer(){
//   if(counter === 1){
//     startTime = Date.now();
//     console.log(startTime)
//   }
// }
//
// function calculateTime(end){
//   totalTime = Math.floor((end - startTime)/1000);
// }

// A function to clear cards that are being compared
function clearCardsList(a){
  a.length = 0;
};

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


// Compare two cards with two scenarios, successful match and failure match
function compareTwoCards(arr){
  // startTimer();

  if (arr[0].firstChild.className === arr[1].firstChild.className){
    function addMatchClassName(){
      arr.forEach(function(card){
        card.classList.add('match');

        // Successful matched cards are counted to show a modal
        allMatchedCards.push(card);
        if(allMatchedCards.length === 16){
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
