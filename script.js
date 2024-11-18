let startTime, updatedTime, difference;
let running = false;
let interval;
let lapsContainer = document.getElementById('laps');
let display = document.getElementById('display');

function formatTime(ms) {
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / (1000 * 60)) % 60;
  let hours = Math.floor(ms / (1000 * 60 * 60));
  
  return (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds
  );
}

document.getElementById("startStop").addEventListener("click", function() {
  if (!running) {
    running = true;
    startTime = Date.now() - (difference || 0);
    interval = setInterval(() => {
      updatedTime = Date.now() - startTime;
      display.innerText = formatTime(updatedTime);
    }, 1000);
    this.innerText = "Pause";
  } else {
    running = false;
    difference = Date.now() - startTime;
    clearInterval(interval);
    this.innerText = "Start";
  }
});

document.getElementById("reset").addEventListener("click", function() {
  running = false;
  clearInterval(interval);
  display.innerText = "00:00:00";
  document.getElementById("startStop").innerText = "Start";
  difference = 0;
  lapsContainer.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", function() {
  if (running) {
    let lapTime = formatTime(Date.now() - startTime);
    let lapItem = document.createElement("li");
    lapItem.innerText = lapTime;
    lapsContainer.appendChild(lapItem);
  }
});
