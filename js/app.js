/*
 * Create a list that holds all of your cards
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
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 
function createGrid() {

	shuffle(cardsArr);
	
	const fragment = document.createDocumentFragment();
	
	cardsArr.forEach(function(card) {
	
		const cardHTML = document.createElement("li");
		cardHTML.classList.add("card");
		
		const cardHTMLImage = document.createElement("i");
		cardHTMLImage.classList.add("fa", card);
		
		cardHTML.appendChild(cardHTMLImage);
		
		fragment.appendChild(cardHTML);
	});
	
	const deck = document.querySelector(".deck");
	
	deck.appendChild(fragment);
}

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
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

document.addEventListener('DOMContentLoaded', function () {
	createGrid();
});