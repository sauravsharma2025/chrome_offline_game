let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let start = document.getElementById("strt-btn");
//Setting default value for score as a zero
if (!localStorage.getItem("High")) {
  localStorage.setItem("High", 0);
}
// start.addEventListener("click", () => {
let score = 0;
// });
function jump() {
  dino.className = "jump";
  let jumpSound = document.createElement("audio");
  // jump1.mp3
  jumpSound.src = "audio/jump2.mp3";
  jumpSound.autoplay = "autoplay";
  dino.append(jumpSound);
  setTimeout(function () {
    dino.removeAttribute("class");
    // jumpSound.remove();
  }, 300);
}
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
    cactus.className = "cactus-move";
    score += 1;
    if (score === 9) {
      document.getElementById("high-score-sound").pause();
    }
    let existingData = JSON.parse(localStorage.getItem("High"));
    if (existingData) {
      document.getElementById(
        "score"
      ).innerHTML = `High score: ${localStorage.getItem(
        "High"
      )} Total Score:${score}`;
    } else {
      document.getElementById("score").innerHTML = ` Total Score:${score}`;
    }
    if (score > localStorage.getItem("High")) {
      document.getElementById(
        "score"
      ).innerHTML = `High score:${score} Total Score:${score}`;
    }
  }
  if (score > localStorage.getItem("High")) {
    let highScoreSound = document.createElement("audio");
    highScoreSound.id = "high-score-sound";
    highScoreSound.src = "audio/jump1.mp3";
    highScoreSound.autoplay = "autoplay";
    dino.append(highScoreSound);
    let removehighScoreCrossSound = setTimeout(() => {
      // document.getElementById("high-score-sound").remove();
      // highScoreSound.remove();
    }, 1000);
  }
});

var runAudio = document.createElement("audio");
runAudio.className = "runSound";
runAudio.src = "audio/runningNew.mp3";
runAudio.autoplay = "autoplay";
runAudio.loop = "loop";
dino.append(runAudio);

const isAlive = setInterval(() => {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );

  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 65) {
    let gameOverSound = document.createElement("audio");
    gameOverSound.autoplay = "autoplay";
    gameOverSound.src = "audio/gameover.wav";
    dino.append(gameOverSound);
    // gameOverimg = document.createElement("img");
    // gameOverimg.src = "images/game-over.jpg";
    // document.getElementById("game-over").append(gameOverimg);
    // gameOverimg.addEventListener("click", () => {
    //   gameOverimg.remove();
    // });
    if (score > localStorage.getItem("High")) {
      localStorage.setItem("High", score);
    }
    let msgH1 = document.createElement("h1");
    let msgH11 = "Game Over! Click to Start Again";
    document.getElementById("game-over").innerHTML =
      "<nobr><h1 style='text-align:center;color:red;'>Game Over! Click to Start Again</h1>";
    const overMe = setTimeout(() => {
      cactus.removeAttribute("class");
      let storeScore = score;

      score = 0;

      // runAudio.remove();
    }, 300);
    document.getElementById("dino").addEventListener("keydown", () => {
      document.getElementById("dino").innerHTML = "";
    });
  }
}, 50);
