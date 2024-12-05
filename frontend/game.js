document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");

    // Tạo ma trận 4x4
    const createGrid = () => {
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            grid.appendChild(tile);
        }
    };

    createGrid();
});

