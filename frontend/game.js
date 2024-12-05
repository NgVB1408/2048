let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid");
    const scoreDisplay = document.getElementById("score");
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
                if (grid[i][j] !== 0) {
                    tile.textContent = grid[i][j];
                    tile.setAttribute("data-value", grid[i][j]);
                }
                gridContainer.appendChild(tile);
            }
        }
        scoreDisplay.textContent = `Điểm: ${score}`;
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
        if (checkGameOver()) {
            alert("Trò chơi kết thúc! Điểm của bạn là: " + score);
        }
    }

    function moveLeft() {
        for (let i = 0; i < 4; i++) {
            let row = grid[i].filter(num => num !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    score += row[j];
                    row.splice(j + 1, 1);
                }
            }
            let missing = 4 - row.length;
            let zeros = Array(missing).fill(0);
            grid[i] = row.concat(zeros);
        }
        createGrid();
    }

    function moveRight() {
        for (let i = 0; i < 4; i++) {
            let row = grid[i].filter(num => num !== 0);
            for (let j = row.length - 1; j > 0; j--) {
                if (row[j] === row[j - 1]) {
                    row[j] *= 2;
                    score += row[j];
                    row.splice(j - 1, 1);
                }
            }
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
            for (let i = 0; i < column.length - 1; i++) {
                if (column[i] === column[i + 1]) {
                    column[i] *= 2;
                    score += column[i];
                    column.splice(i + 1, 1);
                }
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
            for (let i = column.length - 1; i > 0; i--) {
                if (column[i] === column[i - 1]) {
                    column[i] *= 2;
                    score += column[i];
                    column.splice(i - 1, 1);
                }
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

    function checkGameOver() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) return false;
                if (j < 3 && grid[i][j] === grid[i][j + 1]) return false;
                if (i < 3 && grid[i][j] === grid[i + 1][j]) return false;
            }
        }
        return true;
    }
});
