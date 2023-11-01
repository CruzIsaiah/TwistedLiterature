function redirectToHomePage() {
  window.location.href = "home.html";
  return false; // Prevent form submission
}

// JavaScript code (script.js)
$(document).ready(function () {
  // Click event for "Read More" button
  $(".expand-button").on("click", function () {
    var storyContent = $(this).closest(".story-content");
    storyContent.toggleClass("collapsed");

    // Change the button text based on the state
    if (storyContent.hasClass("collapsed")) {
      $(this).text("Read More");
    } else {
      $(this).text("Read Less");
    }
  });
});
