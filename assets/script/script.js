var textEntry = document.querySelector("#text-entry");
var submitButton = document.querySelector("#submitButton");
var dateInput = document.querySelector("input[type='date']");
var textLocation = document.querySelector("#text-location");
var selectedDate = null;

// Function to display saved texts based on selected date
function displaySavedTexts() {
  textLocation.innerHTML = ""; // Clear existing displayed texts
  var savedTexts = getSavedTexts();
  savedTexts
    .filter((savedText) => savedText.date === selectedDate)
    .forEach((savedText) => {
      var savedDiv = document.createElement("div");
      savedDiv.textContent = savedText.text;
      textLocation.appendChild(savedDiv);
    });
}

// Function to get saved texts from local storage
function getSavedTexts() {
  return JSON.parse(localStorage.getItem("enteredTexts")) || [];
}

// Function to save text to local storage
function saveTextToLocalStorage(enteredText) {
  var savedTexts = getSavedTexts();
  savedTexts.push({ date: selectedDate, text: enteredText });
  localStorage.setItem("enteredTexts", JSON.stringify(savedTexts));
}

// Function to handle text submission
function handleSubmission() {
  if (!selectedDate) {
    alert("Please select a date first.");
    return;
  }

  var enteredText = textEntry.value;
  saveTextToLocalStorage(enteredText);

  var newDiv = document.createElement("div");
  newDiv.textContent = enteredText;
  textLocation.appendChild(newDiv);

  textEntry.value = "";
}

// Function to handle date selection
function handleDateSelection() {
  selectedDate = dateInput.value;
  displaySavedTexts();
}

// Event listener for date selection change
dateInput.addEventListener("change", handleDateSelection);

// Event listener for submit button click
submitButton.addEventListener("click", handleSubmission);

// Initial display of saved texts
displaySavedTexts();
