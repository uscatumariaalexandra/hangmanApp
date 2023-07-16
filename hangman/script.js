const startButton = document.getElementById("start-button");
const keybord = document.getElementById("keybord");
const wordPlace = document.getElementById("word");
const chancesRemained = document.getElementById("chances-remained");
let numberChancesRemained = document.getElementById("number-chances-remained");
let chance = Number(numberChancesRemained.innerHTML);
const keybordButtons = document.getElementsByClassName("button");
const buttons = Array.from(keybordButtons);
const timer = document.getElementById("card");
const popUpSound = new Audio("audio/popSound.mp3");

const randomWord = async function randomWord() {
  const options = {
    method: "GET",
    url: "https://random-word-api.p.rapidapi.com/get_word",
    headers: {
      "X-RapidAPI-Key": "4ce5834bfdmsh52d8f5501cced20p1a6552jsn6220c7d2c4b1",
      "X-RapidAPI-Host": "random-word-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const word = response.data.word;
    return await word;
  } catch (error) {
    console.error(error);
  }
};

randomWord()
  .then((word) => {
    wordPlace.textContent = word.replace(/./g, "⭐");
    console.log(word);
    for (const button of buttons) {
      button.addEventListener("click", function () {
        popUpSound.play();
        const pressedLetter = button.innerHTML;
        let letterFound = true;
        for (i = 0; i < word.length; i++) {
          if (word[i] == pressedLetter.toLowerCase()) {
            const text = wordPlace.textContent;
            const textArray = Array.from(text);
            textArray[i] = word[i];
            wordPlace.textContent = textArray.join("");
            letterFound = false;
          }
        }

        if (!wordPlace.textContent.includes("⭐")) {
          alert("YEEEEY!🎉you won🏆");
          window.location.reload();
        }

        if (letterFound == true) {
          chance--;
          numberChancesRemained.textContent = chance;
        }

        if (chance == 0) {
          alert("You died.💀Try again!🎮");
          window.location.reload();
        }
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });

let timeInSecs;
let ticker;

function startTimer(secs) {
  timeInSecs = parseInt(secs);
  ticker = setInterval("tick()", 1000);
}

function tick() {
  var secs = timeInSecs;
  if (secs > 0) {
    timeInSecs--;
  } else {
    alert("time's up");
    clearInterval(ticker);
    startTimer(5 * 60);
  }

  var mins = Math.floor(secs / 60);
  secs %= 60;
  var pretty =
    (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;

  document.getElementById("countdown").innerHTML = pretty;
}
let clicked = false;
function makeVisible() {
  keybord.style.visibility = "visible";
  wordPlace.style.visibility = "visible";
  chancesRemained.style.visibility = "visible";
  timer.style.visibility = "visible";
  startTimer(5 * 60);
}
startButton.addEventListener("click", function () {
  if (clicked == false) {
    makeVisible();
    // keybord.style.visibility = "visible";
    // wordPlace.style.visibility = "visible";
    // chancesRemained.style.visibility = "visible";
    // timer.style.visibility = "visible";
    // startTimer(5 * 60);
    clicked = true;
    startButton.innerHTML = "RESTART GAME";
  } else {
    window.location.reload();
    setTimeout(makeVisible(), 2000);
  }
});
