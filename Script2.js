// DOM variables

// card div for the drink results
var results = $('#results')


// If the user wants to select a drink based on title
  // User defined movie title
  var userMovie = $('#movieTitle')
  // genre of userMovie gotten from ajax of omdb when selecting by title
  var userMovieGenre


// If the user wants to select a drink based on genre
  // User defined genre
  var userGenre

// drink recipe data gotten from ajax of TheCocktailDB
var drinkData

// user selected drinkPreference
var drinkPreference

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
  drinkCategory: 'Beer'
},
{ 
  genre: 'Adventure', 
  drinkCategory: 'Homemade Liqueur'
},
{ 
  genre: 'Animation', 
  drinkCategory: ['Milk \/ Float \/ Shake', 'Soft Drink \/ Soda']
},
{ 
  genre: 'Biography', 
  drinkCategory: 'Shot'
},
{ 
  genre: 'Comedy', 
  drinkCategory: ['Beer', 'Cocktail', 'Ordinary Drink']
},
{ 
  genre: 'Crime', 
  drinkCategory: 'Cocktail'
},
{ 
  genre: 'Documentary', 
  drinkCategory: 'Coffee \/ Tea'},
{
  genre: 'Drama',
  drinkCategory: 'Cocktail'
},
{
  genre: 'Family',
  drinkCategory: 'Soft Drink \/ Soda'
},
{
  genre: 'Fantasy',
  drinkCategory: 'Punch \/ Party Drink'
},
{
  genre: 'History',
  drinkCategory: 'Ordinary Drink'
},
{
  genre: 'Horror',
  drinkCategory: 'Punch \/ Party Drink'
},
{
  genre: 'Musical',
  drinkCategory: ['Ordinary Drink', 'Cocktail']
},
{
  genre: 'Mystery',
  drinkCategory: ['Ordinary Drink', 'Other\/Unknown']
},
{
  genre: 'Romance',
  drinkCategory: ['Cocoa', 'Milk \/ Float \/ Shake']
},
{
  genre: 'Sci-Fi',
  drinkCategory: 'Other\/Unknown'
},
{
  genre: 'Thriller',
  drinkCategory: ['Ordinary Drink', 'Beer']
},
{
  genre: 'Western',
  drinkCategory: 'Shot'
},
]

// Modal for age check on page load
$(document).ready(function () {
  const ageVerification = (+localStorage.getItem("isLegal"));
  
  setTimeout(function () {
    console.log("Before Modal Load")
    console.log("Checking ageVerification", ageVerification)
    if (!ageVerification || ageVerification < 21) {
      console.log("Opening Modal");
      $("#openAgeModal").click();
    }
  }, 100)

});

// Random Number Function
function getPosition(arr) {
  return Math.floor(Math.random() * (arr.length))
}

// click listener to show movie title form
$("#titleBtn").click(function(){
  $('#titleForm').removeClass('hide')
  $('#titleBtn').addClass('hide')
  $('#genreBtn').addClass('hide')
  $('#reset').removeClass('hide')
  $('#submitBtnTitle').removeClass('hide')
})

// click listener to show movie genre form
$("#genreBtn").click(function(){
  $('#genreForm').removeClass('hide')
  $('#titleBtn').addClass('hide')
  $('#genreBtn').addClass('hide')
  $('#reset').removeClass('hide')
  $('#submitBtnGenre').removeClass('hide')
})

// click listener on reset button
$("#reset").click(function(){
  $('#genreForm').addClass('hide')
  $('#titleForm').addClass('hide')
  $('#titleBtn').removeClass('hide')
  $('#genreBtn').removeClass('hide')
  $('#reset').addClass('hide')
  $('#submitBtnGenre').addClass('hide')
  $('#submitBtnTitle').addClass('hide')
})

// click listener for submit button using genre category
$("#submitBtnGenre").click(function(){
  // dropdown menu for the Genre selector
  var dropdownMenuGenre = $("#dropdownMenuGenre :selected")
  console.log(dropdownMenuGenre.val())
    // for loop over compare variable
    for (j=0; j < compare.length; j++) {
      // console.log(dropdownMenuGenre.val() + ' ' + compare[j].genre.trim())
      if (dropdownMenuGenre.val() === compare[j].genre.trim()) {
        console.log(compare[j].genre.trim())

        var finalCategoryGenre=compare[j].drinkCategory
        var genreURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='
        console.log(finalCategoryGenre)

        console.log(finalCategoryGenre[getPosition(finalCategoryGenre)])

        $.ajax({
                  url: genreURL + finalCategoryGenre[k]
                }).then(function(genreResponseTwo) {
                    console.log(genreResponseTwo)

        // if (Array.isArray(finalCategoryGenre)){
        //   console.log('This is an array')
        //   console.log(genreURL)
        //     for (k=0; k < finalCategoryGenre.length; k++) {
        //       $.ajax({
        //         url: genreURL + finalCategoryGenre[k]
        //       }).then(function(genreResponseTwo) {
        //           console.log(genreResponseTwo)
        //           // prepend the drink data to the DOM
        //           // results.prepend('<img src=' + drinkResponseTwo.drinks[0].strDrinkThumb + ' />')
        //           // results.prepend('<h2>' + drinkResponseTwo.drinks[0].strDrink + '</h2>')
        //           // console.log(drinkResponseTwo.drinks[0].strDrinkThumb)
        //       })
        //     }
        //   } else {
        //     console.log(finalCategoryGenre.trim())
        //     console.log(genreURL + finalCategoryGenre.toString().trim())
        //     // ajax call to pull drink from category
        //     $.ajax({
        //       url: genreURL + finalCategoryGenre
        //     }).then(function(genreResponse) {
        //       console.log(genreResponse)
        //     })
        //   }
      }
    }
})


$("#submitBtnTitle").click(function(){
    console.log (userMovie.val())
    var omdbQueryURL = 'http://www.omdbapi.com/?apikey=' + omdbAPIKey + '&t=' + userMovie.val()
    // Dropdown menu for the ingredient selector
    // var dropdownMenuIngredient = $("#dropdownMenuIngredient :selected")
    // dropdown menu for the Genre selector
    // var dropdownMenuGenre = $("#dropdownMenuGenre :selected")
    // console.log(dropdownMenuIngredient.val())
    // console.log(dropdownMenuGenre.val())

    $.ajax({
        url: omdbQueryURL
      }).then(function(response) {
          // console.log(response)
        var userMovieGenre = response.Genre.split(",");

        console.log(userMovieGenre)
        for (i=0; i < userMovieGenre.length; i++) {
          genre = userMovieGenre[i].trim()
          console.log(genre)

            // for loop over compare variable
            for (j=0; j < compare.length; j++) {
              // console.log(userMovieGenre[i].trim())
              // console.log(compare[j].genre)
              if (userMovieGenre[i].trim() === compare[j].genre.trim()) {
                var finalCategory = compare[j].drinkCategory.toString().split(",")
                console.log(finalCategory)
                if (Array.isArray(finalCategory)){
                console.log('This is an array')
                  // for (k=0; k < finalCategory.length; k++) {
                  //   $.ajax({
                  //     url: queryURLCategory + compare[j].drinkCategory
                  //   }).then(function(drinkResponseTwo) {
                  //       console.log(drinkResponseTwo)
                        // prepend the drink data to the DOM
                        // results.prepend('<img src=' + drinkResponseTwo.drinks[0].strDrinkThumb + ' />')
                        // results.prepend('<h2>' + drinkResponseTwo.drinks[0].strDrink + '</h2>')
                        // console.log(drinkResponseTwo.drinks[0].strDrinkThumb)
                    // })
                //   }
                } else {
                // Ajax call to grab drink data
                  console.log(queryURLCategory + compare[j].drinkCategory.split(","))
                  $.ajax({
                    url: queryURLCategory + (compare[j].drinkCategory.split(","))
                  }).then(function(drinkResponse) {
                      console.log(drinkResponse)
                      // prepend the drink data to the DOM 
                      results.prepend('<img src=' + drinkResponse.drinks[0].strDrinkThumb + ' />')
                      results.prepend('<h2>' + drinkResponse.drinks[0].strDrink + '</h2>')
                      console.log(drinkResponse.drinks[0].strDrinkThumb)
                  })
                }
              // console.log(compare[j].drinkCategory.split(","))
              } else {
                console.log('else')
            }
        };
      }
    });
});

// modal for age check
// save information to local storage

// if click yes
$("#isLegalYes").click(function (event) {
  event.preventDefault()
  console.log('true will be saved')
  localStorage.setItem("isLegal", "21")
  // document.location.href = 'preferences.html';
});

// if click no
$("#isLegalNo").click(function (event) {
  event.preventDefault()
  console.log('false will be saved')
  localStorage.setItem("isLegal", "1")
  localStorage.removeItem("isLegal")
  document.location.href = 'https://www.youtube.com/watch?v=aucAFuZJuC4';
});

// Let's Get Started Link to Pref Page
$("#getStarted").click(function (event) {
  event.preventDefault();
  console.log('Lets get started')
  document.location.href = 'preferences.html';
});