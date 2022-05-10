const hourElement = document.getElementById("hours");
const minuteElement = document.getElementById("minutes");
const secondElement = document.getElementById("seconds");
const div = document.querySelector(".laps");
const startBtn = document.getElementById("startbtn");

const watch = {
  isStarted: false,
  paused: false,
  hours: 0,
  minutes: 0,
  seconds: 0,
  interval: 0,
  reset() {
    watch.isStarted = false;
    watch.seconds = 0;
    watch.minutes = 0;
    watch.hours = 0;
    this.updateWatch();
    div.innerHTML = "";
    div.style.border = "none";
    const startBtn = document.getElementById("startbtn");
    startBtn.disabled = false;
  },

  updateWatch() {
    hourElement.textContent = watch.hours;
    minuteElement.textContent = watch.minutes;
    secondElement.textContent = watch.seconds;
  },
  updateSecs() {
    secondElement.textContent = watch.seconds;
  },
  updateMins() {
    minuteElement.textContent = watch.minutes;
  },
  updateHours() {
    hourElement.textContent = watch.hours;
  },
};

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", function doSomething() {
    if (button.classList.contains("start-btn")) {
      watch.isStarted = true;
      watch.paused = false;
      button.disabled = true;
      watch.startButtonCounter = watch.startButtonCounter + 1;
      button.classList.add("remove-hovers");

      watch.interval = setInterval(function () {
        if (watch.isStarted && !watch.paused) {
          watch.seconds = watch.seconds + 1;
          watch.updateSecs();

          if (watch.seconds > 59) {
            watch.minutes = watch.minutes + 1;
            watch.seconds = 0;
            watch.updateMins();
            watch.updateSecs();

            if (watch.minutes > 59) {
              watch.hours = watch.hours + 1;
              watch.minutes = 0;
              watch.updateMins();
              watch.updateHours();
            }
          }
        }
      }, 1000);
    }

    if (button.classList.contains("reset-btn")) {
      watch.reset();
      clearInterval(watch.interval);
      startBtn.classList.remove("remove-hovers");
    }

    if (button.classList.contains("lap-btn")) {
      createLap();
    }
    if (button.classList.contains("pause-btn")) {
      watch.paused = true;
      clearInterval(watch.interval);
      startBtn.disabled = false;
      startBtn.classList.remove("remove-hovers");
    }
  });
});

function createLap() {
  div.innerHTML += `<p class="lap"> 
    ${watch.hours} : ${watch.minutes} : ${watch.seconds}</p>`;

  div.style.border = "1px solid white";
  div.style.backgroundColor = "white";
}
