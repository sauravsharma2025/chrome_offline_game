// this is code from index page with google sign code

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let playGuest = document.getElementById("anonymously");
let game = document.getElementsByClassName("game")[0];
function triggerGame() {
  if (!localStorage.getItem("game")) {
    let gameObj = {
      player: "dragon",
      playerImg: "images/dragon.png",
      enemy: "images/cactus.png",
      theme: "white",
    };
    localStorage.setItem("game", JSON.stringify([gameObj]));
  }
  if (localStorage.getItem("users")) {
    document
      .getElementById("profile_format_id")
      .addEventListener("click", showProfileBox);
    function showProfileBox() {
      if (
        document.getElementsByClassName("containerData")[0].style.display ===
        "none"
      ) {
        document.getElementsByClassName("containerData")[0].style.display =
          "flex";

        document.getElementById("logout").style.display = "flex";
      } else {
        document.getElementsByClassName("containerData")[0].style.display =
          "none";
      }
      //start below code is for user profile on screen
    }
    let scoreHistory = JSON.parse(localStorage.getItem("score_history"));
    console.log("SK@", scoreHistory[0].score);
    let highest = scoreHistory[0].score;
    for (let i = 0; i < scoreHistory.length - 1; i++) {
      let next = scoreHistory[i + 1].score;
      if (highest > next) {
        continue;
      } else {
        highest = scoreHistory[i + 1].score;
      }
    }
    console.log("SK@42", highest);
    let userData = JSON.parse(localStorage.getItem("users"));
    console.log("SK@43", userData);
    let user_profile = `
    <div class="image-holder">
     <img src="${userData[0].profile}" alt="" width="120px" height="90px" style="border-radius:30px;object-fit:cover;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
     </div>
     <div class="name-email">
         <p>${userData[0].name}</p>
         <p>${userData[0].email}</p>
     </div>
 </div>
 <div class="highest">
     <h3>Highest Score</h3>
      <h3>: ${highest}</h3>   
 `;
    let profileElm = document.createElement("div");
    profileElm.className = "profileData";
    profileElm.innerHTML = user_profile;
    document.getElementsByClassName("containerData")[0].prepend(profileElm);
    // document.getElementById(
    //   "show_profile"
    // ).innerHTML = `<img src='images/cat.png' width='30px' height='30px'>`;
    let profileOnHome = document.createElement("img");
    profileOnHome.src = userData[0].profile;
    profileOnHome.style.width = "30px";
    profileOnHome.style.height = "30px";
    document.getElementById("show_profile").append(profileOnHome);
    document.getElementById("high_record").innerHTML = ` HI : ${highest}`;
    // document
    //   .getElementById("profile_format_id")
    //   .removeEventListener("click", showProfileBox);
    // End user profile code end here.
  }

  let gameData = JSON.parse(localStorage.getItem("game"));
  document.getElementsByClassName("main")[0].remove();
  game.style = "display:flex";
  let dino = document.getElementById("dino");
  dino.style.backgroundImage = `url(${gameData[0].playerImg})`;
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
  function startGameOnclick() {
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
      document.getElementById("game-over").style.display = "none";
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
      //following logic will insert every record which is higher than 5
      if (score >= 5) {
        let scoreObj = {
          score: score,
          date_time: new Date().toLocaleString(),
          lifeline: "No",
        };
        let localStorageArrObj = JSON.parse(
          localStorage.getItem("score_history")
        );

        localStorageArrObj.push(scoreObj);
        localStorage.setItem(
          "score_history",
          JSON.stringify(localStorageArrObj)
        );
      }

      if (score > localStorage.getItem("High")) {
        localStorage.setItem("High", score);
      }
      cactus.style.animationDuration = "1.5s";
      document.getElementById("game-over").style.display = "block";
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
  // if (document.getElementById("game-over")) {
  //   document.getElementById("game-over").addEventListener("click", (event) => {
  //     document.getElementById("game-over").remove();
  //   });
  // }
}
const firebaseConfig = {
  apiKey: "AIzaSyAuf4L0P-b69m0IKQGl-UZ_6jkfO2wPtdQ",
  authDomain: "chetak-4e794.firebaseapp.com",
  projectId: "chetak-4e794",
  storageBucket: "chetak-4e794.appspot.com",
  messagingSenderId: "274010369347",
  appId: "1:274010369347:web:91c7e573d4a55673d793f6",
  measurementId: "G-JGBG2QJZMD",
};
if (!localStorage.getItem("users")) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(app);
  const analytics = getAnalytics(app);
  document.getElementById("login-register").addEventListener("click", (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        //below code create db in user system
        if (!localStorage.getItem("users")) {
          localStorage.setItem("users", JSON.stringify([]));
        }
        if (user) {
          // let registered_user = JSON.parse(localStorage.getItem("users"));
          let uniqueNumer = new Date().getTime();
          let userDetail = {
            name: user.displayName,
            email: user.email,
            profile: user.photoURL,
            id: uniqueNumer,
          };
          // registered_user.push(userDetail);
          localStorage.setItem("users", JSON.stringify([userDetail]));
        }
      })
      .then(() => {
        triggerGame();
      })

      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        alert(errorMessage);
      });
    let loginRegister = document.getElementById("login-register");
  });
} else {
  document
    .getElementById("login-register")
    .addEventListener("click", triggerGame);
}

playGuest.addEventListener("click", triggerGame); //Playing Anonymously

if (!localStorage.getItem("score_history")) {
  localStorage.setItem(
    "score_history",
    JSON.stringify([
      {
        score: 0,
      },
    ])
  );
}
