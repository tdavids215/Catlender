// Selecting elements from the DOM
var textEntry = document.querySelector("#text-entry");
var submitButton = document.querySelector("#submitButton");
var dateInput = document.querySelector("input[type='date']");
var textLocation = document.querySelector("#text-location");
var selectedDate = null;
var catPics = "https://api.thecatapi.com/v1/images/search";

// Function to display saved texts based on selected date
function displaySavedTexts() {
  textLocation.innerHTML = "";
  var savedTexts = getSavedTexts();
  savedTexts
    .filter((savedText) => savedText.date === selectedDate)
    .forEach((savedText) => {
      // Create a new blockquote element to display saved text
      var savedDiv = document.createElement("blockquote");
      savedDiv.textContent = savedText.text;

      // Create a delete button for each saved text
      var deleteButton = document.createElement("a");
      deleteButton.href = "#";
      deleteButton.role = "button";
      deleteButton.textContent = "Delete";
      deleteButton.className = "outline";
      deleteButton.addEventListener("click", () => handleDelete(savedText.id));

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
  var taskId = new Date().getTime(); // Using timestamp as unique identifier
  savedTexts.push({ id: taskId, date: selectedDate, text: enteredText });
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
  displaySavedTexts(); // Re-display saved texts
  textEntry.value = "";
}

// Function to handle date selection
function handleDateSelection() {
  selectedDate = dateInput.value;
  displaySavedTexts();
}

// Function to set default date to today
function setDefaultDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  dateInput.value = yyyy + '-' + mm + '-' + dd;
  handleDateSelection();
}

// Function to handle deletion of a saved text
function handleDelete(taskId) {
  var savedTexts = getSavedTexts();
  savedTexts = savedTexts.filter((savedText) => savedText.id !== taskId);
  localStorage.setItem("enteredTexts", JSON.stringify(savedTexts));
  displaySavedTexts();
}

// Event listener for date selection change
dateInput.addEventListener("change", handleDateSelection);

// Event listener for submit button click
submitButton.addEventListener("click", handleSubmission);

// Call setDefaultDate when the page is loaded
setDefaultDate();

// Fetching Cat Pictures from API
fetch(catPics)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var imageUrl = data[0].url;
    var imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    document.getElementById("cat-container").appendChild(imgElement);
  })
  .catch(function (error) {
    console.log(error);
  });

//Added Cat Fact API
  var catFact = 'https://meowfacts.p.rapidapi.com/?lang=eng';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '506837473emsh8453bfa9de13dbfp12a602jsn86e302e8082d',
    'X-RapidAPI-Host': 'meowfacts.p.rapidapi.com'
  }
};
//Fetching Cat Fact API and appending it to the 'Cat Container' with a 'P' Element
fetch(catFact, options)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result);
    var displayCatFact = result.data;
    var factElement = document.createElement("p");
    factElement.textContent = displayCatFact;
    // factElement.classList.add("cat-fact");
    document.getElementById("cat-fact").appendChild(factElement);
  })
  .catch(function(error) {
    console.error(error);
  });

