console.log("Connected");

let recentWinners = "";
let resultHTML = document.getElementById("result");
let recentWinnersHTML = document.getElementById("recent-winners");
let multipleWinsHTML = document.getElementById("multiple-wins");
let winnersContainerHTML = document.getElementById("display-area");
let winnersListHTML = document.getElementById("winners-list");

window.addEventListener('DOMContentLoaded', function() {
  console.log("DOMContentLoaded");
  document.getElementById("btn-start").addEventListener("click", function () {
    sortOptions();
  });
  document.getElementById("btn-reset").addEventListener("click", function () {
    reset();
  });
});

function reset() {
  let winnersListHTML = document.getElementById("winners-list");
  winnersListHTML.innerHTML = "";
  let prevWinnersListHTML = document.getElementById("previous-winners-list");
  prevWinnersListHTML.innerHTML = "";
}

function sortOptions() {
  let transitionTime = document.getElementById("transisiton-time").value;
  let timeBetween = document.getElementById("time-between-results").value;
  let options = document.getElementById("options").value;
  options = options.split(',');
  pickWinner(options, transitionTime, timeBetween)
}

function pickWinner(options, transitionTime, timeBetween) {
  let winners = [];
  let loopAmount = document.getElementById("number-of-winners").value;
  winnersListHTML.innerHTML = "";
  for (let i = 0; i < loopAmount; i++){
    let winner = Math.floor(Math.random() * options.length); 
    winners.push(options[winner].trim());
    if (!multipleWinsHTML.checked) {
      options.splice(winner, 1)
    }
  }
  show1By1(winners, transitionTime, timeBetween);
  addWinnerToRecentlyWon(winners);
}

function show1By1(winners, transitionTime, timeBetween) {

  for (let i of winners){
    let newLi = document.createElement('li');
    newLi.className = "box";
    newLi.appendChild(document.createTextNode(i));
    winnersListHTML.appendChild(newLi);
    console.log(newLi)
  }

  setTimeout(function() {
    let elements = document.querySelectorAll("ul#winners-list > li");
    let delay = 0
    for (let element of elements) {
      element.style.transitionDuration  = `${transitionTime}s`
      delay = delay + parseInt(timeBetween);
      element.style.transitionDelay  = `${delay}s`;
      element.classList.toggle("show");
    }
  }, 1);

}


function addWinnerToRecentlyWon(winners) {
  let prevWinnersListHTML = document.getElementById("previous-winners-list");
  let newUl = document.createElement('Ul');
  prevWinnersListHTML.prepend(newUl);
  for (let i of winners){
    let newLi = document.createElement('li');
    newLi.className = "box";
    newLi.appendChild(document.createTextNode(i));
    prevWinnersListHTML.firstChild.appendChild(newLi);
  }
}