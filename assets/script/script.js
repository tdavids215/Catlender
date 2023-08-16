// Selecting elements from the DOM
var textEntry = document.querySelector("#text-entry");
var submitButton = document.querySelector("#submitButton");
var dateInput = document.querySelector("input[type='date']");
var textLocation = document.querySelector("#text-location");
var selectedDate = null;
var catPics = "https://api.thecatapi.com/v1/images/search";

// Function to create button elements
function createButton(type, savedText) {
  var button = document.createElement("button");
  button.textContent = type;

  // Adding appropriate event listeners based on button type
  if (type === "Edit") {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent any default action
      handleEdit(savedText.id);
    });
  } else if (type === "Delete") {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent any default action
      handleDelete(savedText.id);
    });
  } else if (type === "Save") {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent any default action
      // Any specific logic for saving, if required.
    });
  }

  return button;
}

// Function to display saved texts based on selected date
function displaySavedTexts() {
  textLocation.innerHTML = "";
  var savedTexts = getSavedTexts();
  savedTexts
    .filter((savedText) => savedText.date === selectedDate)
    .forEach((savedText) => {
      // Create a new article element with p element as child to display saved text
      var savedDiv = document.createElement("article");
      savedDiv.id = `task-${savedText.id}`; // Add unique ID for reference during editing

      var textEl = document.createElement("p");
      textEl.textContent = savedText.text;
      savedDiv.appendChild(textEl);

      // Create and append Edit and Delete buttons
      var editButton = createButton("Edit", savedText);
      savedDiv.appendChild(editButton);

      var deleteButton = createButton("Delete", savedText);
      savedDiv.appendChild(deleteButton);

      /*
      var completionFieldset = createCompletionCheckbox(savedText);
      savedDiv.appendChild(completionFieldset);
      */

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
  savedTexts.push({ id: taskId, date: selectedDate, text: enteredText, completed: false });
  localStorage.setItem("enteredTexts", JSON.stringify(savedTexts));
}

// Function to handle text submission
function handleSubmission() {
  if (!selectedDate) {
    alert("Please select a date first.");
    return;
  }
  var enteredText = textEntry.value.trim(); // trim removes whitespace from both ends of a string
  if (!enteredText) { // checks if the trimmed text is empty
    alert("Please enter some text before submitting.");
    return;
  }
  
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
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  dateInput.value = yyyy + "-" + mm + "-" + dd;
  handleDateSelection();
}

// Function to handle deletion of a saved text
function handleDelete(taskId) {
  var savedTexts = getSavedTexts();
  savedTexts = savedTexts.filter((savedText) => savedText.id !== taskId);
  localStorage.setItem("enteredTexts", JSON.stringify(savedTexts));
  displaySavedTexts();
}

// Function to handle editing of a saved text
function handleEdit(taskId) {
  var savedTexts = getSavedTexts();
  var textToEdit = savedTexts.find((savedText) => savedText.id === taskId);
  var savedDiv = document.querySelector(`#task-${taskId}`);
  var textNode = savedDiv.querySelector('p');

  if (textToEdit && savedDiv && textNode) {
    // Replace the current text with a text input element
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = textToEdit.text;
    savedDiv.replaceChild(editInput, textNode);

    // Create a Save button to apply the edits
    var saveButton = createButton("Save", textToEdit); // Using createButton for Save button
    saveButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent any default action
      
      textToEdit.text = editInput.value;
      localStorage.setItem("enteredTexts", JSON.stringify(savedTexts));
      displaySavedTexts();
    });

    // Replace the Edit button with the Save button
    var editButton = Array.from(savedDiv.querySelectorAll("button")).find((el) => el.textContent === "Edit");
    savedDiv.replaceChild(saveButton, editButton);
  }
}

/*
// Function to create checkbox for marking completion
function createCompletionCheckbox(savedText) {
  var fieldset = document.createElement("fieldset");

  var label = document.createElement("label");
  label.setAttribute("for", `completed-${savedText.id}`);

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `completed-${savedText.id}`;
  checkbox.name = "completed";
  checkbox.checked = savedText.completed || false;
  checkbox.addEventListener("change", () => handleCompletionToggle(savedText.id, checkbox.checked));

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode("Mark as completed"));

  fieldset.appendChild(label);

  return fieldset;
}

// Function to handle toggling of completion status
function handleCompletionToggle(taskId, isCompleted) {
  var savedTexts = getSavedTexts();
  var textToToggle = savedTexts.find((savedText) => savedText.id === taskId);
  var savedDiv = document.querySelector(`#task-${taskId}`);
  var textNode = savedDiv.querySelector('p');
  var editButton = Array.from(savedDiv.querySelectorAll("a")).find((el) => el.textContent === "Edit");

  if (textToToggle && savedDiv && textNode && editButton) {
    textToToggle.completed = isCompleted;
    localStorage.setItem("enteredTexts", JSON.stringify(savedTexts));
    textNode.style.textDecoration = isCompleted ? "line-through" : "none";
    editButton.style.pointerEvents = isCompleted ? "none" : "auto"; // Add this line to disable or enable the Edit button
    editButton.style.opacity = isCompleted ? 0.5 : 1; // Optional: reduce opacity to visually indicate it's disabled
  }
}
*/

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
var catFact = "https://meowfacts.p.rapidapi.com/?lang=eng";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "506837473emsh8453bfa9de13dbfp12a602jsn86e302e8082d",
    "X-RapidAPI-Host": "meowfacts.p.rapidapi.com",
  },
};
//Fetching Cat Fact API and appending it to the 'Cat Container' with a 'P' Element
fetch(catFact, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    console.log(result);
    var displayCatFact = result.data;
    var factElement = document.createElement("p");
    factElement.textContent = displayCatFact;

    // Append the text and fact elements to the cat-fact element
    document.getElementById("cat-fact").appendChild(factElement);
  })
  .catch(function (error) {
    console.error(error);
  });

// theme switcher
function themeSwitcherFunction() {
  const themeSwitcher = {
    // Config
    _scheme: "light",
    checkboxTarget: "#theme-switch",
    rootAttribute: "data-theme",
    localStorageKey: "picoPreferredColorScheme",
    // Init
    init() {
      this.scheme = this.schemeFromLocalStorage;
      this.initSwitcher();
    },
    // Get color scheme from local storage
    get schemeFromLocalStorage() {
      if (typeof window.localStorage !== "undefined") {
        if (window.localStorage.getItem(this.localStorageKey) !== null) {
          return window.localStorage.getItem(this.localStorageKey);
        }
      }
      return this._scheme;
    },
    // Init switcher
    initSwitcher() {
      const checkbox = document.querySelector(this.checkboxTarget);
      if (this._scheme === "dark") {
        checkbox.checked = true;
      }
      checkbox.addEventListener("change", () => {
        this.scheme = checkbox.checked ? "dark" : "light";
      });
    },
    // Set scheme
    set scheme(scheme) {
      if (scheme === "dark" || scheme === "light") {
        this._scheme = scheme;
      }
      this.applyScheme();
      this.schemeToLocalStorage();
    },
    // Get scheme
    get scheme() {
      return this._scheme;
    },
    // Apply scheme
    applyScheme() {
      document.querySelector("html").setAttribute(this.rootAttribute, this.scheme);
    },
    // Store scheme to local storage
    schemeToLocalStorage() {
      if (typeof window.localStorage !== "undefined") {
        window.localStorage.setItem(this.localStorageKey, this.scheme);
      }
    },
  };
  // Init the theme switcher
  themeSwitcher.init();
}
// Invoke the function
themeSwitcherFunction();