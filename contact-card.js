// Capture user data from form

$(document).ready(function(){
  formSubmit();
  cardClick();
});

var cardDatabase = []

function formSubmit(){
  $('form').submit(function(event){
    event.preventDefault();
    createCard($(this).serializeArray())
  })
}

function createCard(cardData){
  console.log("DATABASE: ",cardDatabase)

  $('.column-b').prepend($("<div />", {
      // RIGHT NOW WE'RE INSIDE THE DIV OBJECT
      'class': 'card',
      html: [
        $("<h2/>", { text: cardData[0].value +" "+cardData[1].value}),
        $("<p/>", { text: "Click here to show description"})
      ],
      'desc': cardDatabase.length
  }))

  // Store description in cardDatabase
  cardDatabase.push(cardData[2].value)
  $('form').trigger('reset')
}

function cardClick(){
  $('.column-b').on('click', '.card p', function(){

    var cardDatabaseIDX = $(this).parent().attr('desc')

    $(this).parent().html(cardDatabase[cardDatabaseIDX])

  })
}
