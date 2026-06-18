const formspreeEndpoint = "https://formspree.io/f/mnjykbkl";

const loadingMessages = [
  "preparing questions...",
  "organising questions...",
  "adding follow-up questions...",
  "checking if the questions are reasonable...",
  "they are not...",
  "proceeding anyway...",
  "appointment confirmed..."
];

const noMessages = [
  "are you sure",
  "interesting",
  "so you fear questions",
  "noted",
  "this raises more questions",
  "adding this to the list",
  "question list expanded",
  "witness becoming difficult",
  "please answer correctly",
  "refusal denied",
  "too late now",
  "yes"
];

let noIndex = 0;
let selectedName = "";
let selectedDate = "";
let selectedTime = "";
let selectedTimezone = "";
let selectedNote = "";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("yesButton").addEventListener("click", showTimeSelection);
  document.getElementById("noButton").addEventListener("click", handleNoClick);
});

function handleNoClick() {
  const button = document.getElementById("noButton");

  button.innerText = noMessages[noIndex];

  if (noIndex < noMessages.length - 1) {
    noIndex++;
  }

  const x = Math.random() * (window.innerWidth - 260);
  const y = Math.random() * (window.innerHeight - 100);

  button.classList.add("moving");
  button.style.left = x + "px";
  button.style.top = y + "px";
}

function showTimeSelection() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="badge">appointment desk</div>
    <div class="decor">☕ 🎀 ❓</div>

    <h1>when are you available?</h1>

    <p>please select a suitable time to answer the questions.</p>

    <label for="name">name</label>
    <input type="text" id="name" placeholder="your official name for the record">

    <label for="date">date</label>
    <input type="date" id="date">

    <label for="time">time</label>
    <input type="time" id="time">

    <label for="timezone">timezone</label>
    <select id="timezone">
      <option value="">select timezone</option>
      <option value="India Standard Time">India Standard Time</option>
      <option value="Central European Time">Central European Time</option>
      <option value="British Time">British Time</option>
      <option value="Eastern Time">Eastern Time</option>
      <option value="Pacific Time">Pacific Time</option>
      <option value="Gulf Standard Time">Gulf Standard Time</option>
      <option value="Singapore Time">Singapore Time</option>
      <option value="Other">Other</option>
    </select>

    <label for="note">optional statement</label>
    <textarea id="note" placeholder="anything you would like to say before questioning begins"></textarea>

    <button class="yes-button" id="submitButton">submit availability</button>

    <div id="result"></div>
  `;

  document.getElementById("submitButton").addEventListener("click", submitToFormspree);
}

function submitToFormspree() {
  selectedName = document.getElementById("name").value.trim();
  selectedDate = document.getElementById("date").value;
  selectedTime = document.getElementById("time").value;
  selectedTimezone = document.getElementById("timezone").value;
  selectedNote = document.getElementById("note").value.trim();

  const result = document.getElementById("result");

  if (!selectedName || !selectedDate || !selectedTime || !selectedTimezone) {
    result.innerHTML = `<div class="error">incomplete. the questions cannot proceed without documentation.</div>`;
    return;
  }

  result.innerHTML = "submitting documentation...";

  fetch(formspreeEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: selectedName,
      date: selectedDate,
      time: selectedTime,
      timezone: selectedTimezone,
      note: selectedNote,
      subject: "New Questions Appointment"
    })
  })
  .then(function (response) {
    if (response.ok) {
      startAppointmentProcess();
    } else {
      result.innerHTML = `<div class="error">submission failed. bureaucracy has collapsed. please try again.</div>`;
    }
  })
  .catch(function () {
    result.innerHTML = `<div class="error">submission failed. the department is unreachable.</div>`;
  });
}

function startAppointmentProcess() {
  const result = document.getElementById("result");

  result.innerHTML = `<h1 class="loading-text" id="loadingText">preparing questions...</h1>`;

  let index = 0;

  const interval = setInterval(function () {
    index++;

    if (index < loadingMessages.length) {
      document.getElementById("loadingText").innerHTML = loadingMessages[index];
    } else {
      clearInterval(interval);
      showCertificate();
    }
  }, 850);
}

function showCertificate() {
  const result = document.getElementById("result");

  result.innerHTML = `
    <div class="certificate">
      <div class="certificate-title">CERTIFICATE OF APPOINTMENT</div>
      <div class="certificate-subtitle">for the formal answering of questions</div>

      <div class="certificate-line"></div>

      <div>This certifies that</div>

      <div class="name-line">${selectedName}</div>

      <div>has agreed to answer the questions.</div>

      <div class="certificate-line"></div>

      <div class="certificate-detail"><strong>Status:</strong> Appointment Confirmed</div>
      <div class="certificate-detail"><strong>Attendance:</strong> Expected</div>
      <div class="certificate-detail"><strong>Date:</strong> ${selectedDate}</div>
      <div class="certificate-detail"><strong>Time:</strong> ${selectedTime}</div>
      <div class="certificate-detail"><strong>Timezone:</strong> ${selectedTimezone}</div>

      <div class="certificate-line"></div>

      <div class="certificate-detail"><strong>Purpose:</strong> Answering my questions</div>
      <div class="certificate-detail"><strong>Items Required:</strong> Honesty</div>
      <div class="certificate-detail"><strong>Recommended:</strong> Screenshots</div>
      <div class="certificate-detail"><strong>Appeals Process:</strong> Unavailable</div>

      <div class="stamp">APPOINTED</div>
    </div>
  `;

  result.scrollIntoView({ behavior: "smooth", block: "start" });
}
