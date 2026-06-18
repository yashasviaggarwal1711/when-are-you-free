const loadingMessages = [
  "reviewing application...",
  "consulting legal...",
  "consulting strategic advisors...",
  "consulting absolutely nobody...",
  "conducting due diligence...",
  "due diligence completed...",
  "findings disregarded...",
  "decision made...",
  "application status: approved"
];

const noMessages = [
  "are you sure",
  "that's unfortunate",
  "please answer correctly",
  "interesting",
  "concerning",
  "deeply concerning",
  "your response has been noted",
  "for legal reasons",
  "🚓",
  "a report has been filed",
  "too late now",
  "yes"
];

let noIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("yesButton").addEventListener("click", showLoadingScreen);
  document.getElementById("noButton").addEventListener("click", handleNoClick);
});

function handleNoClick() {
  const button = document.getElementById("noButton");

  button.innerText = noMessages[noIndex];

  if (noIndex < noMessages.length - 1) {
    noIndex++;
  }

  const x = Math.random() * (window.innerWidth - 230);
  const y = Math.random() * (window.innerHeight - 100);

  button.classList.add("moving");
  button.style.left = x + "px";
  button.style.top = y + "px";
}

function showLoadingScreen() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="decor">⚖️ 📋 ⚖️</div>
    <h1 id="loadingText">reviewing application...</h1>
  `;

  let index = 0;

  const interval = setInterval(function () {
    index++;

    if (index < loadingMessages.length) {
      document.getElementById("loadingText").innerHTML = loadingMessages[index];
    } else {
      clearInterval(interval);
      showCalendarForm();
    }
  }, 850);
}

function showCalendarForm() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="badge">official debrief portal</div>
    <div class="decor">☕ 🎀 📋</div>

    <h1>so... when are you free?</h1>

    <p>your application has been approved. please select a suitable date and time.</p>

    <label for="date">date</label>
    <input type="date" id="date">

    <label for="time">time</label>
    <input type="time" id="time">

    <button class="yes-button" id="submitButton">schedule debrief</button>

    <div id="result"></div>
  `;

  document.getElementById("submitButton").addEventListener("click", submitPlan);
}

function submitPlan() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const result = document.getElementById("result");

  if (!date || !time) {
    result.innerHTML = "application incomplete. additional documentation required.";
    return;
  }

  result.innerHTML = `
    <div class="notice">
      <strong>OFFICIAL DEBRIEF SUMMONS</strong>
      <br><br>
      Application Status: Approved
      <br><br>
      Attendance: Expected
      <br><br>
      Date: ${date}
      <br><br>
      Time: ${time}
      <br><br>
      Items Required: Updates
      <br><br>
      Recommended: Screenshots
      <br><br>
      Appeals Process: Unavailable
    </div>
  `;
}
