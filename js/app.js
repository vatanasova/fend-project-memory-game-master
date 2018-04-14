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
 * Increments move counter and displays it
 */
function updateMoves() {

	moveCounter ++;
				
	const movesContainer = document.querySelector(".moves");
	movesContainer.textContent = moveCounter;
}

/*
 * Display a message with the final score
 */
function finalScore() {
	
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
 *    + increment the move counter and display it on the page
 *    + if all cards have matched, display a message with the final score
 */

document.addEventListener('DOMContentLoaded', function () {

	createGrid();
	
	document.querySelector('.deck').addEventListener('click', function (event) {
	
		const target = event.target;
	
		if ((target.nodeName === 'LI') && !target.classList.contains("match") && !target.classList.contains("open")) {
		
			openCard(target);
			
			const iconClasses = target.firstChild.classList;
			const iconClass = iconClasses.item(iconClasses.length - 1);

			addCardToOpenCards(iconClass);
			
			if (openCards.length > 1) {
				if (openCards[0] === openCards[1]) {
					lockCards(iconClass);
					
					matchCounter ++;
					if (matchCounter == (cardsArr.length/2)) {
						finalScore();
					}
				} else {
					openCards.forEach(function(iconClass) {
						setTimeout(closeCard, 1000, iconClass);
					});
				}
				
				removeCardsFromOpenCards();
				
				updateMoves();
			}
		}
	}); 
});