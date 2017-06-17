$(document).ready(function() {

	/***** VARIABLES *****/

	var app = {
		interests: ['Sun', 'Moon', 'Stars', 'Galaxy', 'Asteroid', 'Black Hole', 'Mercury', 
		'Planet Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'],
		interestButtons: [],

		baseURL: 'https://api.giphy.com/v1/gifs/search?',
		apiKey: 'dc6zaTOxFJmzC',
		limit: 10,
		rating: '',
	};


	/***** EVENTS *****/

	/*set initial state of page, showing buttons for each interest in array */
	renderButtons();

	/*on click of interest button, call the API and show 10 giphy images*/
	$('#js-buttons').on('click', '.js-button-class', function() {

		/*empty the div containing images before appending new images*/
		$('#js-images').empty();

		/*construct the URL for the API call*/
		var queryURL = app.baseURL + 
			'q=' + $(this).attr('name') +
			'&limit=' + app.limit +
			'&api_key=' + app.apiKey;

		/*call the API*/
		$.ajax({
        	url: queryURL,
        	method: 'GET'
      	}).done(function(response) {
      		for (i=0; i<app.limit; i++) {

      			/*create variables to store the URLs of animated and still images*/
      			var imageUrl = response.data[i].images.fixed_height.url;
      			var imageUrlStill = response.data[i].images.fixed_height_still.url;

  				/*create and style the html elements to hold the images and ratings*/
      			var imageWrapper = $('<div class="border-purple float-left margin">');

      			var interestImage = $('<img class="margin js-gif">');
      			interestImage.attr('src', imageUrl);
      			interestImage.attr('data-state', 'animate');
        		interestImage.attr('alt', 'interest image');
        		  /*store 2 URLs as data attributes in order to toggle between them*/
      			interestImage.attr('data-animate', imageUrl);
      			interestImage.attr('data-still', imageUrlStill);

        		var ratingDiv = $('<div class="font-white margin">');
				ratingDiv.html('Rating: ' + response.data[i].rating);

        		$('#js-images').append(imageWrapper);
        		imageWrapper.append(interestImage, ratingDiv);
      		}
     	});
	});

	/*on click of submit button, create a new button*/
    $('#js-add-interest').on('click', function(event) {
    	event.preventDefault();

    	/*empty the div containing buttons before rendering all items in the array as buttons*/
    	$('#js-buttons').empty();
        
        /*capture the user's interest entered in the form field, push it to the interests array,
          and render the array as buttons*/
        var newInterest = $('#js-interest-input').val().trim();
        app.interests.push(newInterest);
        renderButtons();

        /*empty the input field*/
        $('#js-interest-input').val('');
      });

	/*on click of an image, change its state from animated to still or vice versa*/
    $('#js-images').on('click', '.js-gif', function() {

      /*create a variable to store the state of the image*/
      var state = $(this).attr('data-state');

      /*if the state is still, change the src and state attributes to animated;
        otherwise, change the src and state atttributes to still*/
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    });


	/***** FUNCTIONS *****/

	/*create a button for each item in the interests array*/
	function renderButtons() { 
		for (i=0; i<app.interests.length; i++) {
			newButton = $('<button class="margin">' + app.interests[i] + '</button>');
			newButton.attr('name', app.interests[i]);
			newButton.addClass('js-button-class');			
			$('#js-buttons').append(newButton);
			app.interestButtons.push(newButton);
		}
	}

});