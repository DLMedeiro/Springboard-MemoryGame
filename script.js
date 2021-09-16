const gameContainer = document.getElementById("game");
const start = document.getElementsByClassName("start");
const reset = document.getElementsByClassName("reset");
const score = document.getElementById('score')
const savedScore = JSON.parse(localStorage.getItem('savedScore'));
const bestScore = document.getElementById('bestScore')
const disappear = document.getElementById('disappear');
const newGame = document.getElementById('newGame')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id = 'open';
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // newDiv.addEventListener("click", handleCardClick1);
    // newDiv.addEventListener("click", handleCardClick2);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
// you can use event.target to see which element was clicked


let compare = [];
let scoreCount = 0

function handleCardClick(event) {
  if (compare.length===0 && !event.target.classList.contains('clicked')){
    card = event.target
      let color = card.getAttribute('class');
      compare.push(color);
      card.className += ' clicked'
      card.removeAttribute('id');
      card.id = color;


  } else if (compare.length===1 && !event.target.classList.contains('clicked')) {
    card2 = event.target
      let color2 = card2.getAttribute('class');
      compare.push(color2);
      card.classList.remove('clicked');
      card2.removeAttribute('id');
      scoreCount++
      score.innerText = `${scoreCount}`
      card2.id = color2;
    
      
      if (compare[0] === compare[1]) {
        card.className += ' clicked'
        card2.className += ' clicked'
      } 
      
      if (compare[0] !== compare[1]) {
        setTimeout( function() {
          card.style.backgroundColor = 'rgba(0,200,200,.25)';
          card2.style.backgroundColor = 'rgba(0,200,200,.25)';
          card.id = 'open';
          card2.id = 'open'
          compare.pop();
          compare.pop();
        }, 2000)
        
        
      } else {
        compare.pop();
        compare.pop();
      }
      if (!document.getElementById('open')) {
        if (savedScore === null || savedScore > scoreCount){
        storeInLocalStorage(scoreCount);
        }
      }
    } 
}  

// when the DOM loads
document.addEventListener('DOMContentLoaded', function(e){
  if (savedScore !== null) {
    bestScore.innerText = savedScore[0];
  }
})

document.addEventListener('click', function (e) {
  if(e.target.className === 'start'){
    createDivsForColors(shuffledColors);
    disappear.innerHTML = '';
    let resetButton = document.createElement('button')
    resetButton.classList.add('reset');
    resetButton.innerText='New Game'
    newGame.appendChild(resetButton);
  }
});



// reset page
document.addEventListener('click', function(e) {
  if(e.target.className === 'reset'){
    // localStorage.clear()
    location.reload();
  }
});

// Add to local storage

  function storeInLocalStorage(num) {
    let savedScore;
    if (localStorage.getItem('savedScore') === null){
      savedScore = [];
    } else {
        savedScore = JSON.parse(localStorage.getItem('savedScore'));
        savedScore.splice(0,1);
    } 
      savedScore.push(num);
      localStorage.setItem('savedScore', JSON.stringify(savedScore));
      bestScore.innerText = savedScore[0];
    }
