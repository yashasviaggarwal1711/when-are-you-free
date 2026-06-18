function submitPlan() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const result = document.getElementById("result");

  if (!date || !time) {
    result.innerHTML = "bestie, you forgot to pick a date or time 😭";
    return;
  }

  result.innerHTML = `
    Perfect. You are now booked for:<br>
    <strong>${date} at ${time}</strong> 💅
  `;
}
