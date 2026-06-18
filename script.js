function showDebriefPage() {
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page2").classList.remove("hidden");
}

function moveButton() {
  const button = document.getElementById("noButton");

  const maxX = window.innerWidth - 150;
  const maxY = window.innerHeight - 100;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  button.style.position = "fixed";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
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
    `Perfect. You are now booked for <br><strong>${date} at ${time}</strong> 💅`;
}
