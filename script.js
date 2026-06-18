function showDebriefPage() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

function moveButton() {

  const button = document.getElementById("noButton");

  const x = Math.random() * (window.innerWidth - 200);
  const y = Math.random() * (window.innerHeight - 100);

  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

function submitPlan() {

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const result = document.getElementById("result");

  if (!date || !time) {
    result.innerHTML =
      "bestie, you forgot to pick a date or time 😭";
    return;
  }

  result.innerHTML =
    "Perfect. You are now booked for:<br><br><strong>" +
    date +
    " at " +
    time +
    "</strong> 💅";
}
