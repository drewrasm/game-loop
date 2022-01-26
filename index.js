var addButton = document.getElementById("add");
var errorMessage = document.getElementById("error-message");
var eventDisplay = document.getElementById("events");
var prevTime;

var events = [];

const validateInput = () => {
  var name = document.getElementById("name").value;
  var interval = document.getElementById("interval").value;
  var times = document.getElementById("times").value;

  if (!name || name === "") {
    return "name cannot be empty";
  }
  if (isNaN(interval) || interval <= 0) {
    return "interval must be a positive integer";
  }
  if (isNaN(times) || times <= 0) {
    return "times must be a positive integer";
  }

  return {
    name: name,
    // not exaclty sure it's off by a factor of 2 consistently
    interval: Number(interval) / 2,
    count: Number(times),
    needsRender: false,
    lastRender: 0,
  };
};

const pasteEvent = (eventName, count) => {
  let event = document.createElement("div");
  event.innerHTML = `Event: ${eventName} (${count} remaining)`;
  eventDisplay.appendChild(event);
  eventDisplay.scrollTop = eventDisplay.scrollHeight;
};

addButton.addEventListener("click", (e) => {
  errorMessage.innerHTML = "";
  var input = validateInput();
  if (typeof input === "string") {
    errorMessage.innerHTML = input;
  } else {
    console.log(input);
  }
  events.push(input);
});

function processInput(elapsedTime) {
  for (let e of events) {
    if (e.lastRender == 0) {
      e.lastRender = elapsedTime;
    }
  }
}

function update(elapsedTime) {
  for (let e of events) {
    if (Math.abs(e.lastRender - elapsedTime) >= e.interval && e.count > 0) {
      e.count -= 1;
      e.needsRender = true;
      e.lastRender = elapsedTime;
    } else {
      e.needsRender = false;
    }
  }
}

function render() {
  for (let e of events) {
    if (e.needsRender) {
      pasteEvent(e.name, e.count);
    }
  }
}

function gameLoop(timeStamp) {
  let elapsedTime = timeStamp - prevTime;
  prevTime = elapsedTime;
  processInput(elapsedTime);
  update(elapsedTime);
  render();
  requestAnimationFrame(gameLoop);
}

function start() {
  prevTime = performance.now();
  requestAnimationFrame(gameLoop);
}

start();
