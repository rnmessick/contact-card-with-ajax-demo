// Capture user data from form

$(document).ready(function(){
  formSubmit();
  cardClick();
});

var cardDatabase = []

function formSubmit(){
  $('form').submit(function(event){
    event.preventDefault();
    // Call our createCard function and pass it the form data
    createCard($(this).serializeArray())
  })
}

function createCard(cardData){
  // Create an http request that goes to server and recieves data
  $('.column-b').prepend($("<div />", {
      // RIGHT NOW WE'RE INSIDE THE DIV OBJECT
      'class': 'card',
      html: [
        $("<h2/>", { text: cardData[0].value}),
        $("<p/>", { text: "Click here to show plot"})
      ],
      'desc': cardDatabase.length
  }))
  // Store description in cardDatabase
  $('form').trigger('reset')
}

function cardClick(){
  $('.column-b').on('click', '.card p', function(){
    var title = $(this).siblings('h2').text()
    var url = "http://www.omdbapi.com/?t="+title.toLowerCase().replace(/ /g, "+")
    // Puttin $(this) in a variable because the value of 'this'
    // changes inside our callback function
    var cardDiv = $(this)
    $(this).text("Loading...")

    // Now make an Ajax request to another server
    $.ajax({
      url: url,
      success: function(response){
        // If we're here, the Ajax request succeeded and we have a response
        // object to play with 
        cardDiv.parent().text(response.Plot)
      }
    })
  })
}
