

// ---------------------------------------------------------------------------------------------------------------
// Global Variables
// ---------------------------------------------------------------------------------------------------------------

// initial array for buttons to add
var topics = ["pink", "blue", "yellow", "orange", "red", "purple"];

// Divs that we are going to dynamically add to
var gifDiv = $("#gif-main");  // gif setup / divs go here
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
			newBtn.addClass("btn button-submit gif-get-btn");
			// newBtn.css("background-color", topics[i]);  // changes color of button to the array item
			newBtn.text(topics[i]);
			btnDiv.append(newBtn);

			// console.log("topics item: " + topics[i]);
			
			// assign i to btnCounter to make sure it is at the right point in the array for each iteration
			btnCounter++;

	}


}



// ---------------------------------------------------------------------------------------------------------------
// On "Add" button click process
// ---------------------------------------------------------------------------------------------------------------
$("#add-btn").on("click", function() {

	// grabs the input field text value from the page
	var newBtnText = $("#new-button").val().trim();
	// console.log("input text = " + newBtnText);
	if (newBtnText === "") {

		alert("Please type what you would like to add first");
	} else {
		addButton(newBtnText);
	}

});



// ---------------------------------------------------------------------------------------------------------------
// On .gif button click process
// ---------------------------------------------------------------------------------------------------------------
$(btnDiv).on("click", ".gif-get-btn", function () {

	gifDiv.empty();

	var searchItem = $(this).text();

	// setup url parameters for AJAX call (Giphy API)
	var queryURL = "https://api.giphy.com/v1/gifs/search";
	queryURL += '?' + $.param({
		'api_key': "dc6zaTOxFJmzC", // "17JcoWrNVVDQWsQ9fffSXnx1UGkcSdhq",
		'limit': 10,
		'rating': "G",
		'lang': "en",
		'q': searchItem,
	});

	grabAPIData(queryURL);

});



// ---------------------------------------------------------------------------------------------------------------
// get the API info from the endpont
// ---------------------------------------------------------------------------------------------------------------
function grabAPIData(apiURL) {

	// setup AJAX call w/ API data
	$.ajax({
          url: apiURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

    	  // iterate thru each response returned by the AJAX call above
          for (var i = 0; i < results.length; i++) {
    
            // create a new column div for each img
            var bsColDiv = $("<div class='col-md-4'>");
    
            // after 3 iterations create a new row div for the gifs to be in a new row
            if (i%3 === 0) {

            	var bsnewRowDiv = $("<div class ='row'>");
            	bsnewRowDiv.addClass("new-row" + i);
            	// append row onto the main gif div
            	gifDiv.append(bsnewRowDiv);
            	
            } 
            
            // append columns to the latest row
            bsnewRowDiv.append(bsColDiv);

            // create the image divs to show in the thumbnail format w/ the caption as the rating
            var imgDiv = $("<div>");
            imgDiv.addClass("thumbnail");
            var caption = $("<div>");
            caption.addClass("caption");

            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            // create the image tag and add all the needed attributes for the still / animated toggle
            var gifImage = $("<img>");
            gifImage.addClass("gif-img");
            gifImage.attr("id", "gif" + i);
            gifImage.attr("src", results[i].images.fixed_width_still.url);
            gifImage.attr("data-still-url", results[i].images.fixed_width_still.url);
            gifImage.attr("alt", results[i].title);
            gifImage.attr("data-animated-url", results[i].images.fixed_width.url);
            gifImage.attr("data-img-type", "still");

            // append / prepend all the new elements to the image div
            bsColDiv.append(imgDiv);
            caption.prepend(p);
            imgDiv.prepend(caption);
            imgDiv.prepend(gifImage);

          }
        });

}


// ---------------------------------------------------------------------------------------------------------------
// process when the gif images are clicked by the user
// ---------------------------------------------------------------------------------------------------------------
$("#gif-main").on("click", ".gif-img", function () {

	// setup state variable to equal image data-img-type of the image clicked
	var state = $(this).attr("data-img-type");
	var stillURL = $(this).attr("data-still-url");
	var animatedURL = $(this).attr("data-animated-url");
	
	// check to see if img in still state or animate state
	if (state === "still") {

		// change src to animated URL
		$(this).attr("src", animatedURL);
		// change state to animated
		$(this).attr("data-img-type", "animate");

	} else {

		// change src to still URL
		$(this).attr("src", stillURL);
		// change state to still
		$(this).attr("data-img-type", "still");

	}

});



// ---------------------------------------------------------------------------------------------------------------
// 
// ---------------------------------------------------------------------------------------------------------------
