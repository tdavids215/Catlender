// Get references to the necessary elements
var textEntry = document.querySelector("#text-entry");
var submitButton = document.querySelector("#submitButton");
var textLocation = document.querySelector("#text-location");

// Add event listener to the submit button
submitButton.addEventListener("click", function() {
  // Get the text entered in the textarea
  var enteredText = textEntry.value;
  
  // Create a new div element to display the entered text
  var newDiv = document.createElement("div");
  newDiv.textContent = enteredText;
  
  // Append the new div to the text location div
  textLocation.appendChild(newDiv);
  
  // Clear the textarea for the next input
  textEntry.value = "";
});