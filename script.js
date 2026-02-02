const xIconMoveTracker = document.querySelector(".move-tracker-x-icon");
const oIconMoveTracker = document.querySelector(".move-tracker-o-icon");
const gameBox = document.querySelector(".game-box");
const boxes = document.querySelectorAll(".box");
const restart = document.querySelector(".restart-box");
const xScore = document.querySelector(".x-win");
const oScore = document.querySelector(".o-win");
const ties = document.querySelector(".ties-num");
const oIcon = `<div class="O-icon box-icon"></div>`;
const xIcon = `
            <svg
				class="X-icon box-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="4.5"
                stroke="currentColor"
                class="size-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
               `;

let currentTurn = "O";
let options = ["", "", "", "", "", "", "", "", ""];
let running = true;
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
let winNum = 0;
let loseNum = 0;
let drawNum = 0;

startGame();
restart.addEventListener("click", restartGame);
function startGame() {
	boxes.forEach((box) => box.addEventListener("click", boxClicked));
	showCurrentTurn();
}
function boxClicked() {
	const boxIndex = this.getAttribute("boxindex");
	if (options[boxIndex] != "" || running == false) {
		return;
	}
	updateBox(this, boxIndex);
	checkWinner();
}

function updateBox(box, index) {
	options[index] = currentTurn;
	switch (currentTurn) {
		case "X":
			box.insertAdjacentHTML("beforeend", xIcon);
			changeTurn();
			showCurrentTurn();
			break;
		case "O":
			box.insertAdjacentHTML("beforeend", oIcon);
			changeTurn();
			showCurrentTurn();
			break;
	}
}
function showCurrentTurn() {
	if (currentTurn == "X") {
		xIconMoveTracker.classList.remove("display-none");
		oIconMoveTracker.classList.add("display-none");
	} else {
		xIconMoveTracker.classList.add("display-none");
		oIconMoveTracker.classList.remove("display-none");
	}
}
function checkWinner() {
	let roundWon = false;
	let whoWin = null;
	for (let i = 0; i < winConditions.length; i++) {
		const condition = winConditions[i];
		const boxA = options[condition[0]];
		const boxB = options[condition[1]];
		const boxC = options[condition[2]];

		if (boxA == "" || boxB == "" || boxC == "") {
			continue;
		}
		if (boxA == boxB && boxB == boxC) {
			roundWon = true;
			addShadow(boxes[condition[0]]);
			addShadow(boxes[condition[1]]);
			addShadow(boxes[condition[2]]);
			whoWin = boxA;
			break;
		}
	}
	if (roundWon) {
		if (whoWin == "X") {
			winNum++;
			xScore.textContent = winNum;
		} else {
			loseNum++;
			oScore.textContent = loseNum;
		}
		running = false;
	} else if (!options.includes("")) {
		drawNum++;
		ties.textContent = drawNum;
		boxes.forEach(box =>{
			 box.classList.add("red-shadow");
			 setTimeout(() => {
				box.classList.remove("red-shadow");
			 },1000)
			});
		running = false;
	}
	// dont need else for change player becuase in updatebox change player has been called.
}
function changeTurn() {
	currentTurn = currentTurn == "X" ? "O" : "X";
}

function restartGame() {
	currentTurn = "X";
	options = ["", "", "", "", "", "", "", "", ""];
	showCurrentTurn();
	boxes.forEach((box) => (box.innerHTML = ""));
	running = true;
	restart.firstElementChild.classList.toggle("rotate");
}
function addShadow(box) {
	box.classList.add("shadow");
	setTimeout(() => {
		box.classList.remove("shadow");
	}, 1000);
}
