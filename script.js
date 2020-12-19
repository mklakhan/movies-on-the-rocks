// DOM variables

$("#submitBtn").click(function(){
    console.log (userMovie.val())
    var omdbQueryURL = 'http://www.omdbapi.com/?apikey=' + omdbAPIKey + '&t=' + userMovie.val()
    
    $.ajax({
        url: omdbQueryURL
      }).then(function(response) {
        //   console.log(response)
        var userMovieGenre = response.Genre.split(",");

        console.log(userMovieGenre)
        for (i=0; i < userMovieGenre.length; i++) {
            var category = userMovieGenre[i].trim()
            var queryURLCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + category
            console.log(queryURLCategory)
        };
  });
});

// User defined movie title
var userMovie = $('#movieTitle')

var dropdownToggle = document.getElementById('dropdownMenu')

// User defined genre
var userGenre

// genre of userMovie gotten from ajax of omdb
var userMovieGenre

// drink recipe data gotten from ajax of TheCocktailDB
var drinkData

// user selected drinkPreference
var drinkPreference


// Modal to check for age
var isLegal = 'false'

if (isLegal === 'false') {
  // modal for age check
  $("#isLegalModal").addClass('reveal')
  // save information to local storage
  // if click yes
  $("#isLegalYes").click(function(){
  console.log('true' + ' will be saved')
  localStorage.setItem(isLegal, "true")
  })
  // if click no
  $("#isLegalNo").click(function(){
  console.log('false' + ' will be saved')
  localStorage.setItem(isLegal, "false")
  })
}



// var compare = [{
//     genre: 'horror'
//     drinkCategory: 'bloody Mary'
// }]

// var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
// var queryURLCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
// var queryURLOrdinary = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink'
// var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=14029'
var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552'
// var queryURLID = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=AT&T'


// When user inputs a movie we will do an ajax call to OMDB to pull the genre from that movie
// do an ajax call which will return a random drink in a category based on the genre of the movie the user selected
// prepend the drink data to the DOM 
// prepend the movie synopsis to the DOM


var omdbAPIKey = 'Trilogy'
var omdbQueryURL = 'http://www.omdbapi.com/?apikey=' + omdbAPIKey + '&'
var cocktailQueryURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

// fetch(omdbQueryURL)
//     .then(function(articleResponse) {
//         console.log(articleResponse)
// })

    // // SearchBtn Function
    // function searchBtn() {
    //     // console.log(userMovie)
    //     var omdbQueryURL = 'http://www.omdbapi.com/?apikey=' + omdbAPIKey + '&t=' + userMovie
    //     fetch(omdbQueryURL)
    //     .then(function(dataResponse) {
    //         console.log(dataResponse)
    //         // var userMovieGenre = articleResponse.data.genre
    //         // fetch(queryURL)
    //     })
    // }