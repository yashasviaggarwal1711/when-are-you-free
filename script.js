function showDebriefPage() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

function moveButton() {
  const button = document.getElementById("noButton");

  const x = Math.random() * (window.innerWidth - 180);
  const y = Math.random() * (window.innerHeight - 90);

  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
  button.style.width = "140px";
  button.style.zIndex = "10";
}

function submitPlan() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const result = document.getElementById("result");

  if (!date || !time) {
    result.innerHTML = "bestie, the calendar committee needs a date and time 😭";
    return;
  }

  result.innerHTML =
    "approved. debrief has been scheduled for:<br><br><strong>" +
    date +
    " at " +
    time +
    "</strong><br><br>please arrive prepared with tea 💅";
}
