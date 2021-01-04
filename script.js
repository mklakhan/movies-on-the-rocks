// Dom Variables
// Dropdown menu for the ingredient selector
// var dropdownMenuIngredient = $("#dropdownMenuIngredient :selected")
// dropdown menu for the Genre selector
// var dropdownMenuGenre = $("#dropdownMenuGenre")
// card div for the drink results
var results = $('#results')
// User defined movie title
var userMovie = $('#movieTitle')
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
// URL variables
var omdbAPIKey = 'Trilogy'
var omdbQueryURL = (movie) => `http://www.omdbapi.com/?apikey=${omdbAPIKey}&t=${movie}`;
var queryURLCategory = (drink) => `https://www.thecocktaildb.com/api/json/v1/1/random.php/filter.php?c=${drink}`;
var queryURL = () => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552`;
// var queryURLCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='
// var queryURLOrdinary = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink'
// var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=14029'
// var queryURLID = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=AT&T'
// var cocktailQueryURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
$("#titleBtn").click(function () {
  $('#titleForm').removeClass('hide')
  $('#titleBtn').addClass('hide')
  $('#genreBtn').addClass('hide')
  $('#reset').removeClass('hide')
  $('#submitBtnTitle').removeClass('hide')
})
// click listener to show movie genre form
$("#genreBtn").click(function () {
  $('#genreForm').removeClass('hide')
  $('#titleBtn').addClass('hide')
  $('#genreBtn').addClass('hide')
  $('#reset').removeClass('hide')
  $('#submitBtnGenre').removeClass('hide')
})
$("#reset").click(function(){
  $('#genreForm').addClass('hide')
  $('#titleForm').addClass('hide')
  $('#titleBtn').removeClass('hide')
  $('#genreBtn').removeClass('hide')
  $('.genre').remove()
  $('#reset').addClass('hide')
  $('#submitBtnGenre').addClass('hide')
  $('#submitBtnTitle').addClass('hide')
})
// object comparing genre to drink category
var compare = {
  'Action': ['Beer'],
  'Adventure': ['Homemade Liqueur'],
  'Animation': ['Milk \/ Float \/ Shake', 'Soft Drink \/ Soda'],
  'Biography': ['Shot'],
  'Comedy': ['Beer', 'Cocktail', 'Ordinary Drink'],
  'Crime': ['Cocktail'],
  'Documentary': ['Coffee \/ Tea'],
  'Drama': ['Cocktail'],
  'Family': ['Soft Drink \/ Soda'],
  'Fantasy': ['Punch \/ Party Drink'],
  'History': ['Ordinary Drink'],
  'Horror': ['Punch \/ Party Drink'],
  'Musical': ['Ordinary Drink', 'Cocktail'],
  'Mystery': ['Ordinary Drink', 'Other\/Unknown'],
  'Romance': ['Cocoa', 'Milk \/ Float \/ Shake'],
  'Sci-Fi': ['Other\/Unknown'],
  'Thriller': ['Ordinary Drink', 'Beer'],
  'Western': ['Shot'],
}
function getPosition(arr) {
  return Math.floor(Math.random() * (arr.length))
}
$("#submitBtnTitle").on('click', function (event) {
  event.preventDefault();
  // Do not allow userMovie to be empty
  if (!userMovie.val()) return;
  $.ajax({ url: omdbQueryURL(userMovie.val()) }).then((response) => {
    $('.genre').remove()
    // Converts string on Genre into a array of strings
    // grabs genre from ajax object
    const getGenreTypes = (response.Genre || "").split(", ");
    // for each string in ajax object genre
    getGenreTypes.forEach(genre => {
    drinkData(genre)
    })
  })
});
function drinkData(genre) {
  // trim the result
  const currentDrinks = compare[genre.trim()];
  // grab one genre
  const getDrinksCatagory = currentDrinks[getPosition(currentDrinks)]
  // returns one drink
  $.ajax({ url: queryURLCategory(getDrinksCatagory) }).then(response => {
    results.append([
      $('<div/>', { "class": 'genre' }).append([
        $('<h4/>').css({ textAlign: 'center' }).text(genre.trim()),
        $('<div/>').css({ display: 'flex' }).append([
          $('<div/>').append([
            $('<img/>', { src: response.drinks[0].strDrinkThumb, width: 150 }),
            $('<h2/>').text(response.drinks[0].strDrink)
          ])
        ])
      ])
    ])
  })
}
$("#submitBtnGenre").on('click', function (event) {
  event.preventDefault();
  // Do not allow userMovie to be empty
  var genre = $("#dropdownMenuGenre").val()
  console.log(genre, 'i like');
  if (!genre) return;
  $('.genre').remove()
  drinkData(genre)
});