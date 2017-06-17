/**
	-Initial state: show buttons created from an array of interests
	-On click of a button, call the giphy API and show 10 giphy still images
	-On click of still image, animate it
	-On click of animated image, stop animation
	-On click of submit button, add new button using form text
**/

$(document).ready(function() {

	/***** VARIABLES *****/

	var app = {
		interests: ['Sun', 'Moon', 'Stars', 'Galaxy', 'Asteroid', 'Black Hole', 'Mercury', 
		'Planet Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'],
		interestButtons: [],
		buttonChoice: '',

		baseURL: 'https://api.giphy.com/v1/gifs/search?',
		apiKey: 'dc6zaTOxFJmzC',
		limit: 10,
		rating: 'pg',
	};


	/***** EVENTS *****/

	/* Set initial state of page, showing buttons for each interest in array */
	renderButtons();

	/* On click of interest button, call the API*/
	$('#js-buttons').on('click', '.js-button-class', function() {
		$('#js-images').empty();
		var queryURL = app.baseURL + 
			'q=' + $(this).attr('name') +
			'&limit=' + app.limit +
			'&api_key=' + app.apiKey;
		console.log(queryURL);
		console.log($(this).attr('name'));

		$.ajax({
        	url: queryURL,
        	method: 'GET'
      	}).done(function(response) {
      		for (i=0; i<app.limit; i++) {
      			var imageUrl = response.data[i].images.fixed_height.url;
      			var imageUrlStill = response.data[i].images.fixed_height_still.url;
      			console.log(response);
      			var imageWrapper = $('<div class="border-blue float-left margin">');
      			var interestImage = $('<img class="margin js-gif">');
      			interestImage.attr('src', imageUrl);
      			interestImage.attr('data-animate', imageUrl);
      			interestImage.attr('data-still', imageUrlStill);
      			interestImage.attr('data-state', 'animate');
        		interestImage.attr('alt', 'interest image');
        		ratingDiv = $('<div class="font-white margin">');
				ratingDiv.html('Rating: ' + response.data[i].rating);
        		$('#js-images').append(imageWrapper);
        		imageWrapper.append(interestImage, ratingDiv);
      		}
     	});
	});

	/* On click of submit button, create a new button*/
    $('#js-add-interest').on('click', function(event) {
    	$('#js-buttons').empty();
        event.preventDefault();
        var newInterest = $('#js-interest-input').val().trim();
        app.interests.push(newInterest);
        renderButtons();
        $('#js-interest-input').val('');
      });


    $('#js-images').on('click', '.js-gif', function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr('data-state');
      console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    });


	/***** FUNCTIONS *****/

	function renderButtons() { 
		for (i=0; i<app.interests.length; i++) {
			newButton = $('<button class="margin">' + app.interests[i] + '</button>');
			newButton.attr('name', app.interests[i]);
			newButton.addClass('js-button-class');			
			$('#js-buttons').append(newButton);
			console.log(newButton.attr('name'));
			app.interestButtons.push(newButton);
			console.log(app.interestButtons[i].attr('name'));
		}
	}




});