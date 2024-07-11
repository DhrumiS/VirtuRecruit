const timeContainer = document.getElementById("time");

function updateTime() {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString();
  timeContainer.textContent = `online at: ${formattedTime}`;
}

updateTime();

setInterval(updateTime, 3000);

const resume = document.getElementById("resume");

resume.addEventListener("click", function () {
  document.write("welcome");
});

// --------------------for uploading reume and cv ---------------------------------------------------------

// document.getElementsByTagName('input[type=file').addEventListener('change', function(event) {
//   var file = event.target.files[0]; // Get the file object

//   // Check if a file is selected
//   if (file) {
//     var reader = new FileReader(); // Create a FileReader object

//     // Set up the onload event handler
//     reader.onload = function(e) {
//       var fileContent = e.target.result; // Get the file content

//       // Do whatever you want with the file content here
//       console.log('File content:', fileContent);
//     };
//     else {
//       console.log('No file selected');
//     }
//   });

function submitData() {
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var profession = document.getElementById("profession").value;
  var email = document.getElementById("email").value;
  var resume = document.getElementById("resume").files[0]; // Get the file object
  var cv = document.getElementById("cv").files[0]; // Get the file object

  // Display the submitted data on the page
  //   var displayData = "Submitted Data:<br>" +
  //                     "Name: " + name + "<br>" +
  //                     "Phone No: " + phone + "<br>" +
  //                     "Profession: " + profession + "<br>" +
  //                     "Email: " + email + "<br>";
  //   document.getElementById("displayData").innerHTML = displayData;
  // var userData = document.getElementById("userData").value;

  // // Display the submitted data on the page
  // document.getElementById("displayData").innerHTML =
  //   "Submitted Data: " + userData;
}
