const findButton = document.querySelector(".find-button");

findButton.addEventListener("click", function () {
  const jobTitle = document.querySelector(".input-field").value;

  if (jobTitle.trim() === "" || location.trim() === "") {
    alert("Please enter a job title and location.");
    return;
  }
  alert(`Searching for jobs with title "${jobTitle}" in "${location}".`);
});

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("createAccountForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form input values
    var email = document.getElementById("email").value;
    var fullName = document.getElementById("name").value;
    var phoneNo = document.getElementById("phone_no").value;
    var education = document.getElementById("Education").value;
    var intro = document.getElementById("intro").value;
    var profession = document.getElementById("profession").value;
    var password = document.getElementById("password").value;

    // Create an object to store user data
    var userData = {
      email: email,
      fullName: fullName,
      phoneNo: phoneNo,
      education: education,
      intro: intro,
      profession: profession,
      password: password,
    };

    // Store user data in local storage
    localStorage.setItem("userData", JSON.stringify(userData));

    // Redirect to the login page
    window.location.href = "C:homepage2login.html"; // Replace "/login" with the actual login page URL
  });
});
