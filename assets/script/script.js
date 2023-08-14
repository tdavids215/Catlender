// Selecting elements from the DOM
var textEntry = document.querySelector("#text-entry");
var submitButton = document.querySelector("#submitButton");
var dateInput = document.querySelector("input[type='date']");
var textLocation = document.querySelector("#text-location");
var selectedDate = null;
var catPics = "https://api.thecatapi.com/v1/images/search";


// Function to display saved texts based on selected date
function displaySavedTexts() {
  textLocation.innerHTML = ""; // Clear existing displayed texts
  var savedTexts = getSavedTexts();
  savedTexts
    .filter((savedText) => savedText.date === selectedDate)
    .forEach((savedText, index) => {
      
      // Create a new blockquote element to display saved text
      var savedDiv = document.createElement("blockquote");
      savedDiv.textContent = savedText.text;

      // Create a delete button for each saved text
      var deleteButton = document.createElement("a");
      deleteButton.href = "#";
      deleteButton.role = "button";
      deleteButton.textContent = "Delete";
      deleteButton.className = "outline";
      deleteButton.addEventListener("click", () => handleDelete(savedText.index));

      // Append the delete button to the saved text element
      savedDiv.appendChild(deleteButton);

      // Append the saved text element to the text location
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
  var newIndex = savedTexts.length; // New index will be the current length of the array
  savedTexts.push({ index: newIndex, date: selectedDate, text: enteredText }); // Save the index
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

  // Create a new blockquote element for the entered text
  var newDiv = document.createElement("blockquote");
  newDiv.textContent = enteredText;

  // Create a delete button for the newly added text
  var deleteButton = document.createElement("a");
  deleteButton.href = "#";
  deleteButton.role = "button";
  deleteButton.textContent = "Delete";
  deleteButton.className = "outline";
  deleteButton.addEventListener("click", () => handleDelete(savedTexts.length - 1));

  // Append the delete button to the newly added text element
  newDiv.appendChild(deleteButton);

  // Append the newly added text element to the text location
  textLocation.appendChild(newDiv);

  textEntry.value = "";
}

// Function to handle date selection
function handleDateSelection() {
  selectedDate = dateInput.value;
  displaySavedTexts();
}

// Function to handle deletion of a saved text
function handleDelete(index) {
  var savedTexts = getSavedTexts();
  savedTexts.splice(index, 1); // Remove the selected text

  // Update local storage
  localStorage.setItem("enteredTexts", JSON.stringify(savedTexts));

  // Re-display saved texts
  displaySavedTexts();
}

// Event listener for date selection change
dateInput.addEventListener("change", handleDateSelection);

// Event listener for submit button click
submitButton.addEventListener("click", handleSubmission);

// Initial display of saved texts
displaySavedTexts();

//Fetching Cat Pictures from API

fetch(catPics)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var imageUrl = data[0].url; 
    var imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    document.getElementById("cat-container").appendChild(imgElement);
  })
  .catch(function(error) {
    console.log(error);
  });

  var catFact = 'https://meowfacts.p.rapidapi.com/?lang=eng';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '506837473emsh8453bfa9de13dbfp12a602jsn86e302e8082d',
    'X-RapidAPI-Host': 'meowfacts.p.rapidapi.com'
  }
};
