

// ---------------------------------------------------------------------------------------------------------------
// Global Variables
// ---------------------------------------------------------------------------------------------------------------

// initial array for buttons to add
var topics = ["pink", "blue", "yellow", "orange", "red", "purple"];

// Divs that we are going to dynamically add to
var gifDiv = $("#gif-view");  // gifs go here
var btnDiv = $("#button-view");  // buttons go here

// page load variables set 
var isNewLoad = true;
var btnCounter = 0;


// run function to add initial buttons to the page
addButton();


// ---------------------------------------------------------------------------------------------------------------
// Add button function
// ---------------------------------------------------------------------------------------------------------------
function addButton(newBtnItem) {

	// check to see if the page has been loaded w/ original buttons yet
	if (isNewLoad) {

		// set new load variable to false now
		isNewLoad = false;
		
	} else {

		// add new input text to the topics array for processing
		topics.push(newBtnItem);  
		// set input field back to empty
		$("#new-button").val("");

	}


	// use global variable to increase count so the for loop only goes through the process at the point of the array / new item passed
	for (var i = btnCounter; i < topics.length; i++) {
					
			// create new button element
			var newBtn = $("<button>");
			newBtn.addClass("btn button-submit");
			// newBtn.css("background-color", topics[i]);  // changes color of button to the array item
			newBtn.text(topics[i]);
			btnDiv.append(newBtn);

			console.log("topics item: " + topics[i]);
			
			// assign i to btnCounter to make sure it is at the right point in the array for each iteration
			btnCounter++;

	}


}



// ---------------------------------------------------------------------------------------------------------------
// On "Add" button click process
// ---------------------------------------------------------------------------------------------------------------
$("#add-btn").on("click", function() {

	console.log("add button clicked");
	// grabs the input field text value from the page
	var newBtnText = $("#new-button").val().trim();
	console.log("input text = " + newBtnText);
	if (newBtnText === "") {

		alert("Please type what you would like to add first");
	} else {
		addButton(newBtnText);
	}

});





// ---------------------------------------------------------------------------------------------------------------
// 
// ---------------------------------------------------------------------------------------------------------------
