var textEntry = document.querySelector("#text-entry");
var submitButton = document.querySelector("#submitButton");
var textLocation = document.querySelector("#text-location");

// Load saved texts from local storage on page load
function loadTextsFromLocalStorage() {
  var savedTexts = JSON.parse(localStorage.getItem("enteredTexts")) || [];
  savedTexts.forEach(function (savedText) {
    var savedDiv = document.createElement("div");
    savedDiv.textContent = savedText;
    textLocation.appendChild(savedDiv);
  });
}

function saveTextsToLocalStorage(enteredText) {
  var savedTexts = JSON.parse(localStorage.getItem("enteredTexts")) || [];
  savedTexts.push(enteredText);
  localStorage.setItem("enteredTexts", JSON.stringify(savedTexts));
}

function handleSubmission() {
  var enteredText = textEntry.value;
  var newDiv = document.createElement("div");
  newDiv.textContent = enteredText;

  saveTextsToLocalStorage(enteredText);

  textLocation.appendChild(newDiv);
  textEntry.value = "";
}

// Load saved texts from local storage on page load
loadTextsFromLocalStorage();

// Add event listener to the submit button
submitButton.addEventListener("click", handleSubmission);
