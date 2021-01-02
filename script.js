// DOM variables

// card div for the drink results
var results = $('#results')


// If the user wants to select a drink based on title
  var titleBtn = $('#titleBtn')
  // User defined movie title
  var userMovie = $('#movieTitle')
  // genre of userMovie gotten from ajax of omdb when selecting by title
  var userMovieGenre


// If the user wants to select a drink based on genre
  var genreBtn = $('genreBtn')
  // User defined genre
  var userGenre

// drink recipe data gotten from ajax of TheCocktailDB
var drinkData

// user selected drinkPreference
var drinkPreference

// Modal to check for age
var isLegal = 'false'

// URL variables
var queryURLCategory = 'https://www.thecocktaildb.com/api/json/v1/1/random.php/filter.php?c='
// var queryURLCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='
// var queryURLOrdinary = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink'
// var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=14029'
var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552'
// var queryURLID = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=AT&T'

var omdbAPIKey = 'Trilogy'
var omdbQueryURL = 'http://www.omdbapi.com/?apikey=' + omdbAPIKey + '&'
var cocktailQueryURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

// object comparing genre to drink category
var compare = [{
  genre: 'Action',
  drinkCategory: 'Beer'},
  {genre: 'Adventure',
  drinkCategory: 'Homemade Liqueur'},
  {genre: 'Animation',
  drinkCategory: ['Milk \/ Float \/ Shake', 'Soft Drink \/ Soda']},
  {genre: 'Biography',
  drinkCategory: 'Shot'},
  {genre: 'Comedy',
  drinkCategory: ['Beer','Cocktail','Ordinary Drink']},
  {genre: 'Crime',
  drinkCategory: 'Cocktail'},
  {genre: 'Documentary',
  drinkCategory: 'Coffee \/ Tea'},
  {genre: 'Drama',
  drinkCategory: 'Cocktail'},
  {genre: 'Family',
  drinkCategory: 'Soft Drink \/ Soda'},
  {genre: 'Fantasy',
  drinkCategory: 'Punch \/ Party Drink'},
  {genre: 'History',
  drinkCategory: 'Ordinary Drink'},
  {genre: 'Horror',
  drinkCategory: 'Punch \/ Party Drink'},
  {genre: 'Musical',
  drinkCategory: ['Ordinary Drink', 'Cocktail']},
  {genre: 'Mystery',
  drinkCategory: ['Ordinary Drink', 'Other\/Unknown']},
  {genre: 'Romance',
  drinkCategory: ['Cocoa', 'Milk \/ Float \/ Shake']},
  {genre: 'Sci-Fi',
  drinkCategory: 'Other\/Unknown'},
  {genre: 'Thriller',
  drinkCategory: ['Ordinary Drink', 'Beer']},
  {genre: 'Western',
  drinkCategory: 'Shot'},
]

$("#submitBtn").click(function(){
    console.log (userMovie.val())
    var omdbQueryURL = 'http://www.omdbapi.com/?apikey=' + omdbAPIKey + '&t=' + userMovie.val()
    // Dropdown menu for the ingredient selector
    var dropdownMenuIngredient = $("#dropdownMenuIngredient :selected")
    // dropdown menu for the Genre selector
    var dropdownMenuGenre = $("#dropdownMenuGenre :selected")
    console.log(dropdownMenuIngredient.val())
    console.log(dropdownMenuGenre.val())

    $.ajax({
        url: omdbQueryURL
      }).then(function(response) {
          // console.log(response)
        var userMovieGenre = response.Genre.split(",");

        // console.log(userMovieGenre)
        for (i=0; i < userMovieGenre.length; i++) {
          // Genre = userMovieGenre[i].trim()
            // for loop over compare variable
            for (j=0; j < compare.length; j++) {
              // console.log(userMovieGenre[i].trim())
              // console.log(compare[j].genre)
              if (userMovieGenre[i].trim() === compare[j].genre.trim()) {
                var finalCategory=compare[j].drinkCategory.toString().split(",")
                // console.log(finalCategory)
                if (Array.isArray(finalCategory)){
                // console.log('This is an array')
                  for (k=0; k < finalCategory.length; k++) {
                    $.ajax({
                      url: queryURLCategory + compare[j].drinkCategory
                    }).then(function(drinkResponseTwo) {
                        console.log(drinkResponseTwo)
                        // prepend the drink data to the DOM
                        results.prepend('<img src=' + drinkResponseTwo.drinks[0].strDrinkThumb + ' />')
                        results.prepend('<h2>' + drinkResponseTwo.drinks[0].strDrink + '</h2>')
                        // console.log(drinkResponseTwo.drinks[0].strDrinkThumb)
                    })
                  }
                } else {
                // Ajax call to grab drink data
                  $.ajax({
                    url: queryURLCategory + compare[j].drinkCategory.split(",")
                  }).then(function(drinkResponse) {
                      console.log(drinkResponse)
                      // prepend the drink data to the DOM 
                      results.prepend('<img src=' + drinkResponse.drinks[0].strDrinkThumb + ' />')
                      results.prepend('<h2>' + drinkResponse.drinks[0].strDrink + '</h2>')
                      // console.log(drinkResponse.drinks[0].strDrinkThumb)
                  })
                }
              // console.log(compare[j].drinkCategory.split(","))
              } else {
                console.log("no drink recommendations based on that genre")
              // console.log("it's not working")
              // console.log(compare[j].drinkCategory.toString())
              }
        };
      }
    });
});