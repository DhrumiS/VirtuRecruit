// recruiter.js

document.addEventListener("DOMContentLoaded", function () {
    const timeContainer = document.getElementById("time");
  
    function displayLoginTime() {
      const loginTime = new Date();
      const formattedTime = loginTime.toLocaleTimeString();
      timeContainer.textContent = `Online at: ${formattedTime}`;
    }
  
    displayLoginTime();
  });
  
  $(document).ready(function () {
    // Function to update job details on the page
    function updateJobDetails(title, position, location, salary, description) {
      // Assuming the table rows have unique IDs for easy identification
      // You can use other methods to find the correct row to update
      // For demonstration purposes, let's update the first row
      $("#editJobModal").modal("hide"); // Hide the modal
      $("#editJobModal").on("hidden.bs.modal", function () {
        $("#jobTitleCell").text(title);
        $("#jobPositionCell").text(position);
        $("#jobLocationCell").text(location);
        $("#jobSalaryCell").text(salary);
        $("#jobDescriptionCell").text(description);
      });
    }
  
    // Save changes button click event
    $("#saveChangesBtn").click(function () {
      var title = $("#jobTitle").val();
      var position = $("#jobPosition").val();
      var location = $("#jobLocation").val();
      var salary = $("#jobSalary").val();
      var description = $("#jobDescription").val();
  
      // Call function to update job details
      updateJobDetails(title, position, location, salary, description);
    });
  });
  