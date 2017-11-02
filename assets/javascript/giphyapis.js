

// ---------------------------------------------------------------------------------------------------------------
// Global Variables
// ---------------------------------------------------------------------------------------------------------------

// initial array for buttons to add
var topics = ["pink", "blue", "yellow", "orange", "red", "purple"];

// Divs that we are going to dynamically add to
// var gifDiv = $("#gif-view");  // gifs go here
var gifDiv = $("#gif-main");  // gif setup / divs go here
var btnDiv = $("#button-view");  // buttons go here

// page load variables set 
var isNewLoad = true;
var btnCounter = 0;

// setup url parameters for AJAX call (Giphy API)
// var queryURL = "";

// "https://api.giphy.com/v1/gifs/search";
// queryURL += '?' + $.param({
// 	'api_key': "dc6zaTOxFJmzC", // "17JcoWrNVVDQWsQ9fffSXnx1UGkcSdhq",
// 	'limit': 10,
// 	'rating': "G",
// 	'lang': "en",
// 	'q': "",
// });


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

	console.log("gif button clicked");

	gifDiv.empty();

	var searchItem = $(this).text();

	var queryURL = "https://api.giphy.com/v1/gifs/search";
	queryURL += '?' + $.param({
		'api_key': "dc6zaTOxFJmzC", // "17JcoWrNVVDQWsQ9fffSXnx1UGkcSdhq",
		'limit': 10,
		'rating': "G",
		'lang': "en",
		'q': searchItem,
	});


	console.log("search for = " + searchItem);

	// queryURL += '&' + $.param({
	// 	'q': searchItem,
	// });

	// console.log(queryURL.param.q);
	// queryURL.param.q = searchItem;

	
	console.log("API URL: " + queryURL);

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

          // var bsRowDiv = $("<div class ='row new-row'>");
          // gifDiv.append(bsRowDiv);

          // var lastRow = $("#gif-main.row:last");
          // console.log(lastRow.attr("class"));

          for (var i = 0; i < results.length; i++) {
            // var gifDiv = $("<div class='item'>");

	        // var lastRow = $("#gif-main.row:last");
	        // console.log(lastRow);

            var bsColDiv = $("<div class='col-md-4'>");
            console.log(bsColDiv);
            // var bsRowDiv = $("<div class ='row'>");
        	// gifDiv.append(bsRowDiv);
        	// bsRowDiv.append(bsColDiv);

            // after 3 iterations create a new row div for the gifs to be in a new row
            if (i%3 === 0) {

            	// console.log("divisible by 3");
            	var bsnewRowDiv = $("<div class ='row'>");
            	bsnewRowDiv.addClass("new-row" + i);
            	// console.log(bsnewRowDiv.attr("class"));
            	// console.log("creating new row");
            	gifDiv.append(bsnewRowDiv);
            	// bsnewRowDiv.append(bsColDiv);
            	// lastRow = bsnewRowDiv;


            } // else {

            	// var lastRow = $("row:last");
            	// console.log("appending to existing row");
            	// lastRow = $("#gif-main.row:last");
            	// console.log(lastRow);
            	// bsnewRowDiv.append(bsColDiv);

            // }

            // lastRow = $("#gif-main row:last");
            // console.log(lastRow.html());
            // console.log(lastRow);
            // lastRow.append(bsColDiv);
            bsnewRowDiv.append(bsColDiv);

            // var thumbnailDiv = $("<div class='thumbnail'>");

            var imgDiv = $("<div>");
            imgDiv.addClass("thumbnail");
            var caption = $("<div>");
            caption.addClass("caption");

            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.addClass("gif-img");
            gifImage.attr("id", "gif" + i);
            gifImage.attr("src", results[i].images.fixed_width_still.url);
            gifImage.attr("data-still-url", results[i].images.fixed_width_still.url);
            gifImage.attr("alt", results[i].title);
            gifImage.attr("data-animated-url", results[i].images.fixed_width.url);
            gifImage.attr("data-img-type", "still");


            bsColDiv.append(imgDiv);
            caption.prepend(p);
            imgDiv.prepend(caption);
            imgDiv.prepend(gifImage);


            // $(gifDiv).prepend(imgDiv);
          }
        });

}


// ---------------------------------------------------------------------------------------------------------------
// process when the gif images are clicked by the user
// ---------------------------------------------------------------------------------------------------------------
$("#gif-main").on("click", ".gif-img", function () {

	console.log("image clicked");

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
