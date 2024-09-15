document.addEventListener("DOMContentLoaded", function () {
  const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  savedFeedbacks.forEach((feedback) => {
    addFeedbackToPage(feedback.name, feedback.subject, feedback.message, feedback.email);
  });
});

document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const newFeedback = { name, email, subject, message };

  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  feedbacks.push(newFeedback);

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  addFeedbackToPage(name, subject, message, email);

  document.getElementById("feedbackForm").reset();
});

function addFeedbackToPage(name, subject, message, email) {
  const newPersonDiv = document.createElement("div");
  newPersonDiv.innerHTML = `
            <p><span>${name}</span> ${subject} <br>
            Message: ${message} <br>
            Email: ${email}</p>
        `;

  document.getElementById("people").appendChild(newPersonDiv);
}
