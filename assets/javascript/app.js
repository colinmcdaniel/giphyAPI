var topics = [
	"abraham lincoln",
	"franklin d. roosevelt",
	"john f. kennedy",
	"george washington",
	"barack obama",
	"theodore roosevelt",
	"ronald reagan",
	"richard nixon",
	"thomas jefferson",
	"harry s. truman",
	];

// Updates buttons display
function renderButtons(){
	$("#buttons").empty();
	for(var i=0;i<topics.length;i++){
		var button = $("<button>");
		button.addClass("btn btn-primary");
		button.attr("data-name",topics[i]);
		button.text(topics[i]);
		$("#buttons").append(button);
	}
}

// When click topic button...
$(document).on("click","button", function(){
	var topic = $(this).data("name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		var results = response.data;

		// For each gif...
		for(var i = 0; i<results.length;i++){
			
			// Create container div with rating and image
			var gifDiv = $("<div class='item'>");
			var ratingText = $("<p>").text("Rating: " + results[i].rating);
			var image = $("<img>");
			
			// Create still and animated versions of image
			image.attr("data-animatesrc", results[i].images.fixed_height.url);
			image.attr("data-stillsrc", results[i].images.fixed_height_still.url);
			image.attr("src", image.data("stillsrc"));
			image.addClass("gifbutton");

			// Append rating and image to container div
			gifDiv.append(ratingText);
			gifDiv.append(image);

			// Add container divs to top of gif display div
			$("#gifsdisplay").prepend(gifDiv);
		}
	});
});

// When click gif, switch state to animate or still
$(document).on('click', '.gifbutton', function(){
	var url = $(this).attr("src");
	var stillurl = $(this).attr("data-stillsrc");

	if(url==stillurl)
        $(this).attr("src",$(this).attr("data-animatesrc"));
    else
       	$(this).attr("src",$(this).attr("data-stillsrc"));
});

// When click submit input button
$("#submit").on("click",function(){

	// Get user text and push into topics array, then update buttons
	var text = $("#topic-input").val().trim();
	topics.push(text);
	renderButtons();

	// Don't refresh page
	return false;
});

renderButtons();