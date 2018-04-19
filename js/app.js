/*
 * List that holds all of the cards
 */
 
const cardsArr = [
	"fa-anchor",
	"fa-bicycle",
	"fa-bolt",
	"fa-bomb",
	"fa-cube",
	"fa-diamond",
	"fa-leaf",
	"fa-paper-plane-o",
	"fa-anchor",
	"fa-bicycle",
	"fa-bolt",
	"fa-bomb",
	"fa-cube",
	"fa-diamond",
	"fa-leaf",
	"fa-paper-plane-o"
];

/*
 * List of "open" cards
*/
const openCards = [];

let matchCounter = 0;
let moveCounter = 0;
let starRating = 3;
let start;
let time;
let timerStarted = false;
let elapsed = 0;
let totalTime;
let timeVar;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

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
 * Display the cards on the page
 */
function createGrid() {

//shuffle the list of cards
	shuffle(cardsArr);
	
	const fragment = document.createDocumentFragment();

//loop through each card and create its HTML
	cardsArr.forEach(function(card) {
	
		const cardHTML = document.createElement("li");
		cardHTML.classList.add("card");
		
		const cardHTMLImage = document.createElement("i");
		cardHTMLImage.classList.add("fa", card);
		
		cardHTML.appendChild(cardHTMLImage);
		
		fragment.appendChild(cardHTML);
	});
	
	const deck = document.querySelector(".deck");

//add each card's HTML to the page
	deck.appendChild(fragment);
}

/*
 * Resets the grid
 */
function resetGrid() {

	matchCounter = 0;
	removeCardsFromOpenCards();

	const grid = document.querySelector(".deck");
	
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	
	createGrid();
}

/*
 * Open card - display the card's symbol
 */
function openCard(target) {
	target.classList.add("open", "show");
}

/*
 * Add card to a *list* of "open" cards
 */
function addCardToOpenCards(iconClass) {
	openCards.push(iconClass);
}

/*
 * Lock card in open position
 */
function lockCards(iconClass) {

	const icons = document.getElementsByClassName(iconClass);
	
	for (let i = 0; i < icons.length; i++) {
	
		const parent = icons[i].parentNode;
		
		parent.classList.remove("open", "show");
		parent.classList.add("match");
	}
}

/*
 * Hide card's symbol
 */
function closeCard(iconClass) {   

	const icons = document.getElementsByClassName(iconClass);

	for (let i = 0; i < icons.length; i++) {
	
		const parent = icons[i].parentNode;
		
		parent.classList.remove("open", "show");
	}
}

/*
 * Remove cards from the *list* of "open" cards
 */
function removeCardsFromOpenCards() {
	openCards.pop();
	openCards.pop();
}

/*
 * Updates star rating
 */
function updateRating() {

	if ((moveCounter % 15 === 0) && (starRating > 1)) {
		starRating --;
		
		const solidStars = document.querySelectorAll(".fa-star");
		const lastSolidStar = solidStars[solidStars.length - 1];
		lastSolidStar.classList.replace("fa-star", "fa-star-o");
	}
}

/*
 * Resets star rating
 */
function resetRating() {

	starRating = 3;

	const starsCont = document.querySelector(".stars");
	const stars = starsCont.children;
	
	for (let i = 0; i < stars.length; i++) {
		stars[i].firstChild.classList.replace("fa-star-o", "fa-star");
	}
}

/*
 * Timer
 */
function gameTimer() {

	time = new Date().getTime() - start;

	t = Math.floor(time / 1000)
	elapsed = Math.floor(t/60) + "m" + Math.floor(t%60) + "s";

	const timerCont = document.querySelector(".timer");
	timerCont.textContent = elapsed;
}

/*
 * Resets game timer
 */
function resetTimer() {

	elapsed = 0;
	
	clearTimeout(timeVar);
	
	timerStarted = false;
	
	const timerCont = document.querySelector(".timer");
	timerCont.textContent = "0m00s";
}

/*
 * Increments move counter and displays it
 */
function updateMoves() {

	moveCounter ++;
				
	const movesContainer = document.querySelector(".moves");
	movesContainer.textContent = moveCounter;
	
	updateRating();
}

/*
 * Resets move counter and displays it
 */
function resetMoves() {

	moveCounter = 0;

	const movesContainer = document.querySelector(".moves");
	movesContainer.textContent = moveCounter;
}

/*
 * Display a message with the final score
 */
function gameOver() {
	
	// Get the modal
	const modal = document.getElementById('gameOverModal');
	//Open the modal
	modal.style.display = "block";
	document.querySelector(".timeSpent").textContent = totalTime;
	document.querySelector(".starsWon").textContent = starRating;
	
	const startNewGameBtn = document.getElementById("startNewGame");
	// When the user clicks on the button, reset the game
	startNewGameBtn.addEventListener("click", function() {
		modal.style.display = "none";
		reset();
	});
	
	// Get the <span> element that closes the modal
	const closeSpan = document.getElementsByClassName("close")[0];
	
	// When the user clicks on <span> (x), close the modal
	closeSpan.addEventListener("click", function() {
		modal.style.display = "none";
	});
	
	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener("click", function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}); 
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
 *    + increment the move counter and display it on the page
 *    + if all cards have matched, display a message with the final score
 */
 
function cardEvtListener() {
	document.querySelector('.deck').addEventListener('click', function (event) {
	
		if (timerStarted == false) {
				//start game timer
				start = new Date().getTime();
				
				timeVar = setInterval(gameTimer, 100);
			
				timerStarted = true;
		}
	
		const target = event.target;
	
		if ((target.nodeName === 'LI') && !target.classList.contains("match") && !target.classList.contains("open") && (openCards.length < 2)) {
		
			openCard(target);
			
			const iconClasses = target.firstChild.classList;
			const iconClass = iconClasses.item(iconClasses.length - 1);

			addCardToOpenCards(iconClass);
			
			if (openCards.length > 1) {
				if (openCards[0] === openCards[1]) {
					lockCards(iconClass);
					
					matchCounter ++;
					if (matchCounter == (cardsArr.length/2)) {
						totalTime = elapsed;
						clearTimeout(timeVar);
						gameOver();
					}
				} else {
					openCards.forEach(function(iconClass) { 
						setTimeout(closeCard, 500, iconClass);
					});
				}
				
				removeCardsFromOpenCards();
				
				updateMoves();
			}
		}
	});
}

/*
 * Reset the game board, the timer, and the star rating
 */
function reset() {

	resetGrid();
	resetRating();
	resetMoves();
	resetTimer();
}

/*
 * Event listener for the restart button click
 */
function resetListener() {

	const resetEl = document.querySelector(".restart");
	resetEl.addEventListener("click", reset);
}

document.addEventListener('DOMContentLoaded', function () {
//create card grid
	createGrid();
//set up card event listener
	cardEvtListener();
//set up reset event listener
	resetListener();
});