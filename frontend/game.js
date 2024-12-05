let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid");
    createGrid();
    generateNewTile();
    generateNewTile();

    document.addEventListener("keydown", handleKeyPress);

    function createGrid() {
        gridContainer.innerHTML = "";
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.textContent = grid[i][j] === 0 ? "" : grid[i][j];
                gridContainer.appendChild(tile);
            }
        }
    }

    function generateNewTile() {
        let emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) emptyCells.push({ x: i, y: j });
            }
        }
        if (emptyCells.length > 0) {
            const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[x][y] = Math.random() > 0.5 ? 2 : 4;
            createGrid();
        }
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
        }
        generateNewTile();
    }

    function moveLeft() {
        for (let i = 0; i < 4; i++) {
            let row = grid[i].filter(num => num !== 0);
            let missing = 4 - row.length;
            let zeros = Array(missing).fill(0);
            grid[i] = row.concat(zeros);
        }
        createGrid();
    }

    function moveRight() {
        for (let i = 0; i < 4; i++) {
            let row = grid[i].filter(num => num !== 0);
            let missing = 4 - row.length;
            let zeros = Array(missing).fill(0);
            grid[i] = zeros.concat(row);
        }
        createGrid();
    }

    function moveUp() {
        for (let col = 0; col < 4; col++) {
            let column = [];
            for (let row = 0; row < 4; row++) {
                if (grid[row][col] !== 0) column.push(grid[row][col]);
            }
            let missing = 4 - column.length;
            let zeros = Array(missing).fill(0);
            column = column.concat(zeros);
            for (let row = 0; row < 4; row++) {
                grid[row][col] = column[row];
            }
        }
        createGrid();
    }

    function moveDown() {
        for (let col = 0; col < 4; col++) {
            let column = [];
            for (let row = 0; row < 4; row++) {
                if (grid[row][col] !== 0) column.push(grid[row][col]);
            }
            let missing = 4 - column.length;
            let zeros = Array(missing).fill(0);
            column = zeros.concat(column);
            for (let row = 0; row < 4; row++) {
                grid[row][col] = column[row];
            }
        }
        createGrid();
    }
});
