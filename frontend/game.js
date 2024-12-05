let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let scoreElement = document.getElementById("score");
let leaderboardList = document.getElementById("leaderboard-list");
let score = 0;
let jumping = false;

// Xử lý nhảy
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
        if (!jumping) jump();
    }
});

function jump() {
    jumping = true;
    let upInterval = setInterval(() => {
        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
        if (dinoBottom >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (dinoBottom <= 0) {
                    clearInterval(downInterval);
                    jumping = false;
                } else {
                    dinoBottom -= 5;
                    dino.style.bottom = dinoBottom + "px";
                }
            }, 20);
        } else {
            dinoBottom += 5;
            dino.style.bottom = dinoBottom + "px";
        }
    }, 20);
}

// Di chuyển xương rồng và xử lý va chạm
let cactusInterval = setInterval(() => {
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    if (cactusLeft <= 50 && cactusLeft > 0 && dinoBottom <= 40) {
        alert(`Trò chơi kết thúc! Điểm của bạn: ${score}`);
        clearInterval(cactusInterval);
        saveScore(score);
        resetGame();
    } else {
        cactus.style.left = (cactusLeft - 5) + "px";
        if (cactusLeft <= 0) {
            cactus.style.left = "600px";
            score++;
            scoreElement.textContent = `Điểm: ${score}`;
        }
    }
}, 20);

// Lưu điểm và cập nhật bảng xếp hạng
function saveScore(newScore) {
    let today = new Date().toISOString().split("T")[0];
    let leaderboard = JSON.parse(localStorage.getItem(today) || "[]");
    leaderboard.push(newScore);
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem(today, JSON.stringify(leaderboard));
    updateLeaderboard(today);
}

function updateLeaderboard(date) {
    let leaderboard = JSON.parse(localStorage.getItem(date) || "[]");
    leaderboardList.innerHTML = "";
    leaderboard.forEach((score, index) => {
        let li = document.createElement("li");
        li.textContent = `${index + 1}. Điểm: ${score}`;
        leaderboardList.appendChild(li);
    });
}

function resetGame() {
    score = 0;
    scoreElement.textContent = `Điểm: ${score}`;
    cactus.style.left = "600px";
    updateLeaderboard(new Date().toISOString().split("T")[0]);
}

// Khởi tạo bảng xếp hạng
updateLeaderboard(new Date().toISOString().split("T")[0]);
