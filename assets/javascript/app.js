  // some intitial buttons

var instrumentsArray = ["guitar", "banjo", "violin", "flute", "piano"];
  
$(document).ready(function() {

  //disables enter key form submission
  $(document).on("keypress", "form", function(event) { 
    return event.keyCode != 13;
});
  //loop through array and add the buttons as well as the onclick to trigger searchgif function
    for (var i = 0; i < instrumentsArray.length; i++) {
        $("#instrument-buttons").append("<button type='button' onclick='searchGif(\"" + instrumentsArray[i] + "\")' class='btn btn-primary' value=' " + instrumentsArray[i] + "'> " + instrumentsArray[i] + " </button>");
    }
});
  //function for assigning a variable to the form field value then execute the searchgif function for the assigned value 
function instrumentButtonClicked() {
    var userInput = $('#instrument-input').val();
    searchGif(userInput);
}

  //creates and appends an additional button for the user chosen search value.

function enterButtonClicked() {
    var userInput = $('#instrument-input').val();
    if (userInput) {
        $('#instrument-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
        
    }
}

  // unused code for getting the enter key to do the same thing as the on click event

// $("#instrument-input").keyup(function(event){
//     if(event.keyCode == 13){
//         enterButtonClicked;
//     }
// });


  // ajax call
function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}
  //clear the gif display, loop through the ajax response, assign a variable to rating data and create its div
  //create variable for the image, prepend rating, and call data for still and animated, add size styling.
function displayGif(response) {
    $('#instruments').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#instruments').append(image);
    }
    // gif pause illusion logic
    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}