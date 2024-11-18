let score = 0;

function playGame() {
	createGridContainer();
	randomStart();
	handleMovements();
	restartGame();
}

function restartGame() {
	let button = document.getElementById("restart-btn");
	button.addEventListener("click", () => {
		let cell = document.querySelectorAll(".cell");
		for (let i = 0; i < 16; i++) {
			cell[i].innerText = "";
			cell[i].className = "cell";
		}
		score = 0;
		updateScore();
		randomStart();
	});
}

function updateScore() {
	let scoreElement = document.getElementById("score");
	scoreElement.textContent = score;
}

function addAdjacents(valuesSet) {
	for (let i = 0; i < valuesSet.length - 1; i++) {
		if (valuesSet[i] == valuesSet[i + 1]) {
			valuesSet[i] *= 2;
			valuesSet[i + 1] = "";
			score += valuesSet[i];
			updateScore();
			if (valuesSet[i] == 2048)
				alert("You won!");
		}
	}
}

function moveX(direction) {
    let cell = document.querySelectorAll(".cell");
    let bool = false;
    let initialState = Array.from(cell).map(c => c.innerText);

    for (let x = 0; x < 4; x++) {
        let row = [];
        for (let y = 0; y < 4; y++) {
            if (cell[x * 4 + y].innerText != "")
                row.push(cell[x * 4 + y].innerText);
        }
        if (direction == "right")
            row.reverse();
        addAdjacents(row);
        row = row.concat(Array(4 - row.length).fill(""));
        if (direction == "right")
            row.reverse();
        for (let y = 0; y < 4; y++) {
            cell[x * 4 + y].innerText = row[y];
            cell[x * 4 + y].className = `cell cell-${row[y]}`;
        }
    }

    let finalState = Array.from(cell).map(c => c.innerText);
    bool = initialState.some((val, index) => val !== finalState[index]);

    return bool;
}

function moveY(direction) {
    let cell = document.querySelectorAll(".cell");
    let bool = false;
    let initialState = Array.from(cell).map(c => c.innerText);

    for (let y = 0; y < 4; y++) {
        let column = [];
        for (let x = 0; x < 4; x++) {
            if (cell[x * 4 + y].innerText != "")
                column.push(cell[x * 4 + y].innerText);
        }
        if (direction == "down")
            column.reverse();
        addAdjacents(column);
        column = column.concat(Array(4 - column.length).fill(""));
        if (direction == "down")
            column.reverse();
        for (let x = 0; x < 4; x++) {
            cell[x * 4 + y].innerText = column[x];
            cell[x * 4 + y].className = `cell cell-${column[x]}`;
        }
    }

    let finalState = Array.from(cell).map(c => c.innerText);
    bool = initialState.some((val, index) => val !== finalState[index]);

    return bool;
}

function handleMovements() {
	document.addEventListener("keydown", (event) => {
		let cell = document.querySelectorAll(".cell");
		let bool = false;

		if (event.key == "ArrowUp")
			bool = moveY("up");
		else if (event.key == "ArrowDown")
			bool = moveY("down");
		else if (event.key == "ArrowLeft")
			bool = moveX("left");
		else if (event.key == "ArrowRight")
			bool = moveX("right");

		if (bool === true) {
			for (let i = 0; i < 1; i++) {
				let random = Math.floor(Math.random() * 16);
				if (cell[random].innerText == "") {
					cell[random].innerText = 2;
					cell[random].className = "cell cell-2";
				}
				else
				i--;
			}
		}
	});
}

function randomStart() {
	// when i put brackets in the variable it means that it is an array
	let matrix = Array(16).fill(null);;
	for (let i = 0; i < 2; i++) {
		let random = Math.floor(Math.random() * 16);
		if (matrix[random] == null) {
			matrix[random] = 2;
		
			let cell = document.querySelectorAll(".cell");
			cell[random].innerText = 2;
			cell[random].className = "cell cell-2";
		}
		else
			i--;
	}
}

function createGridContainer() {
	let gridContainer = document.querySelector(".grid-container");
	let column = document.createElement("div");
	column.className = "column";

	for (let i = 0; i < 4; i++) {
		let row = document.createElement("div");
		row.className = "row";
		for (let j = 0; j < 4; j++) {
			let cell = document.createElement("div");
			cell.className = "cell";
			row.appendChild(cell);
		}
		column.appendChild(row);
	}

	gridContainer.appendChild(column);
}

playGame();
