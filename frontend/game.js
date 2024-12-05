let playerName = "";
let score = 0;
let jumping = false;
let speed = 5;

document.getElementById("start-game").addEventListener("click", () => {
    const inputName = document.getElementById("player-name").value.trim();
    if (inputName === "") {
        alert("Vui lòng nhập tên của bạn!");
        return;
    }
    playerName = inputName;
    document.getElementById("player-input").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    startGame();
});

function startGame() {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");
    const scoreElement = document.getElementById("score");
    const leaderboardList = document.getElementById("leaderboard-list");

    // Sự kiện nhảy trên PC và điện thoại
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" || event.code === "ArrowUp") {
            if (!jumping) jump(dino);
        }
    });

    document.addEventListener("touchstart", () => {
        if (!jumping) jump(dino);
    });

    function jump(dino) {
        jumping = true;
        let height = 0;
        const upInterval = setInterval(() => {
            if (height >= 150) {
                clearInterval(upInterval);
                const downInterval = setInterval(() => {
                    if (height <= 0) {
                        clearInterval(downInterval);
                        jumping = false;
                    } else {
                        height -= 5;
                        dino.style.bottom = `${height}px`;
                    }
                }, 20);
            } else {
                height += 5;
                dino.style.bottom = `${height}px`;
            }
        }, 20);
    }

    const cactusMoveInterval = setInterval(() => {
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
        if (cactusLeft <= 0) {
            cactus.style.left = "600px"; // Reset vị trí
            score++; // Tăng điểm
            scoreElement.textContent = `Điểm: ${score}`;
            if (score % 5 === 0) speed++; // Tăng tốc độ sau mỗi 5 điểm
        } else {
            cactus.style.left = `${cactusLeft - speed}px`; // Di chuyển theo tốc độ
        }
    }, 20);

    const collisionCheck = setInterval(() => {
        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

        if (cactusLeft <= 50 && cactusLeft > 0 && dinoBottom <= 40) {
            alert(`Trò chơi kết thúc! Điểm của bạn: ${score}`);
            clearInterval(cactusMoveInterval);
            clearInterval(collisionCheck);
            saveScore(score);
            resetGame();
        }
    }, 20);

    function saveScore(newScore) {
        let today = new Date().toISOString().split("T")[0];
        let leaderboard = JSON.parse(localStorage.getItem(today) || "[]");
        leaderboard.push({ name: playerName, score: newScore });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 5); // Lưu 5 người chơi cao điểm nhất
        localStorage.setItem(today, JSON.stringify(leaderboard));
        updateLeaderboard(today);
    }

    function updateLeaderboard(date) {
        let leaderboard = JSON.parse(localStorage.getItem(date) || "[]");
        leaderboardList.innerHTML = "";
        leaderboard.forEach((entry, index) => {
            let li = document.createElement("li");
            li.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
            leaderboardList.appendChild(li);
        });
    }

    function resetGame() {
        score = 0;
        cactus.style.left = "600px";
        scoreElement.textContent = `Điểm: ${score}`;
        updateLeaderboard(new Date().toISOString().split("T")[0]);
        location.reload();
    }

    updateLeaderboard(new Date().toISOString().split("T")[0]);
}
