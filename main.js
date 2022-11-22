let playGuest = document.getElementById("anonymously");
let loginRegister = document.getElementById("login-register");
loginRegister.addEventListener("click", () => {
  document.getElementsByClassName("modal")[0].style.display = "flex";
});
let game = document.getElementsByClassName("game")[0];
playGuest.addEventListener("click", () => {
  document.getElementsByClassName("main")[0].remove();
  game.style = "display:block";
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
  document.addEventListener("keydown", startGame);
  dino.addEventListener("touchstart", startGameOnclick);
  function startGameOnclick(event) {
    jump();
    cactus.className = "cactus-move";
    score += 1;
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

    if (score + 1 == localStorage.getItem("High")) {
      let highScoreSound = document.createElement("audio");
      highScoreSound.id = "high-score-sound";
      highScoreSound.src = "audio/jump1.mp3";
      highScoreSound.autoplay = "autoplay";
      dino.append(highScoreSound);
    }
  }
  function startGame(event) {
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
    if (score + 1 == localStorage.getItem("High")) {
      let highScoreSound = document.createElement("audio");
      highScoreSound.id = "high-score-sound";
      highScoreSound.src = "audio/jump1.mp3";
      highScoreSound.autoplay = "autoplay";
      dino.append(highScoreSound);
      // setTimeout(() => {
      //   cactus.style.animationDuration = "1.3s";
      //   // document.getElementById("score").style.opacity =
      //   //   document.getElementById("score").style.opacity == 0 ? 1 : 0;
      // }, 10);
    }
  }

  var runAudio = document.createElement("audio");
  runAudio.className = "runSound";
  runAudio.src = "audio/runningNew.mp3";
  runAudio.autoplay = "autoplay";
  runAudio.loop = "loop";
  dino.append(runAudio);

  const isAlive = setInterval(() => {
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 65) {
      let gameOverSound = document.createElement("audio");
      gameOverSound.autoplay = "autoplay";
      gameOverSound.src = "audio/gameover.mp3";
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
      cactus.style.animationDuration = "1.5s";
      let msgH1 = document.createElement("h1");
      let msgH11 = "Game Over! Click to Start Again";
      document.getElementById("game-over").innerHTML =
        "<nobr><h1 id='over' style='text-align:center;color:red;'>Game Over! Click to Start Again</h1>";
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
  if (document.getElementById("game-over")) {
    document.getElementById("game-over").addEventListener("click", (event) => {
      document.getElementById("game-over").remove();
    });
  }
});
// Get the modal
var modal = document.getElementById("myModal");

var btn = document.getElementById("login-register");

var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
