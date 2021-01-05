// Dom Variables
// Dropdown menu for the ingredient selector
// var dropdownMenuIngredient = $("#dropdownMenuIngredient :selected")
// dropdown menu for the Genre selector
// var dropdownMenuGenre = $("#dropdownMenuGenre")
// card div for the drink results
var results = $('#results')
// User defined movie title
var userMovieRef = $('#movieTitle')
// user movie
var userMovie
// User defined genre
var userGenre
// genre of userMovie gotten from ajax of omdb
var finalGenre

var genre

var finalDrink

var finalCategory
// user selected drinkPreference
var drinkPreference
// Modal to check for age
var isLegal = 'false'
// URL variables
var omdbAPIKey = 'Trilogy'
var omdbQueryURL = (movie) => `https://www.omdbapi.com/?apikey=${omdbAPIKey}&t=${movie}`;
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
  $('.heading').addClass('hide')
  $('.title-Btn').addClass('hide')
  $('.genre-Btn').addClass('hide')
})

// click listener to show movie genre form
$("#genreBtn").click(function () {
  $('#genreForm').removeClass('hide')
  $('#titleBtn').addClass('hide')
  $('#genreBtn').addClass('hide')
  $('#reset').removeClass('hide')
  $('#submitBtnGenre').removeClass('hide')
  $('.heading').addClass('hide')
  $('.title-Btn').addClass('hide')
  $('.genre-Btn').addClass('hide')
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
  $('.heading').removeClass('hide')
  $('.title-Btn').removeClass('hide')
  $('.genre-Btn').removeClass('hide')
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

  // use the drink array to return drink info (drink name, ingredients, measurements, & instructions)
  function drinkInfo(url) {
    $.ajax({
      url: url
    })
      .then((response) => {
        console.log(response.drinks[0]);

        $('#drink-title').append(`<h4 class="">${response.drinks[0].strDrink}</h4>`);

        $('#drink-image').append(`<img src="${response.drinks[0].strDrinkThumb}" alt="${response.drinks[0].strDrink}" width="400" height="400">`);

        $('#drink-instructions').append(`<p>${response.drinks[0].strInstructions}</p>`);

        var hasStrIng = true;
        var strIdx = 1
        while (hasStrIng) {
          var strIngredient = 'strIngredient' + strIdx;
          var strIngredientVal = response.drinks[0][strIngredient];

          var strMeasure = 'strMeasure' + strIdx;
          var strMeasureVal = response.drinks[0][strMeasure];
          if (strIngredientVal == null) {
            hasStrIng = false;
            return hasStrIng;
          } else {
            if (strMeasureVal !== null) {
              console.log(strIngredientVal);
              console.log(strMeasureVal);
              $('#drink-ingredients').append(`<li>${strMeasureVal} ${strIngredientVal}</li>`)
              ++strIdx;
            } else {
              console.log(strIngredientVal);
              $('#drink-ingredients').append(`<li>${strIngredientVal}</li>`)
              ++strIdx;
            }

          }
        }
      })
  }

  // modal for age check
  // $("#isLegalModal").addClass('reveal')
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
  })

  $("#getStarted").click(function (event) {
    event.preventDefault();
    console.log('Lets get started')
    
    document.location.href = 'preferences.html';
  });

  drinkInfo('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12528')

})

function getPosition(arr) {
  return Math.floor(Math.random() * (arr.length))
}

$("#submitBtnTitle").on('click', function (event) {
  event.preventDefault();
  // Do not allow userMovie to be empty
  if (!userMovieRef.val()) return;
  $.ajax({ url: omdbQueryURL(userMovieRef.val()) }).then((response) => {
    $('.genre').remove()
    // Converts string on Genre into a array of strings
    userMovieVal = userMovieRef.val()
    userMovie= userMovieVal.charAt(0).toUpperCase() + userMovieVal.slice(1)
    console.log('userMovie', userMovie);
    // grabs genre from ajax object
    const getGenreTypes = (response.Genre || "").split(", ");
    // for each string in ajax object genre
    drinkData(getGenreTypes[getPosition(getGenreTypes)])
    console.log(finalCategory)
    finalGenre = getGenreTypes[getPosition(getGenreTypes)]
    console.log(finalGenre)
  })
});

var prefResults = $('#prefResults')

function drinkData(genre) {
  // trim the result
  const currentDrinks = compare[genre.trim()];
  // grab one genre
  const getDrinksCatagory = currentDrinks[getPosition(currentDrinks)]
  finalCategory = getDrinksCatagory
  // returns one drink
  $.ajax({ url: queryURLCategory(getDrinksCatagory) }).then(response => {

    resetResults()
    console.log(response.drinks[0])

    finalDrink = response.drinks[0].strDrink
    finalGenre = genre

    $('#genreAndCategory').append(finalGenre + ' / ' + finalCategory)
    
    $('#drink-title').append(`<h4 class="">${response.drinks[0].strDrink}</h4>`);

    $('#drink-image').append(`<img src="${response.drinks[0].strDrinkThumb}" alt="${response.drinks[0].strDrink}" width="400" height="400">`);

    $('#drink-instructions').append(`<p>${response.drinks[0].strInstructions}</p>`);

    // object for populating our choice description
var descriptions = {

  'Action': "You chose the action movie " + userMovie + ". We think you would really enjoy pairing it with the " + finalDrink + ". Action movies are full of energy and excitement, just like this drink!",

  'Adventure': "You chose the adventure movie " + userMovie + ".  " + userMovie + " pairs great with the " + finalDrink + ". Your drink choice should be as adventurous as your taste in movies!",

  'Animation': "You chose the Animated movie " + userMovie + ". Explore your inner youth with the " + finalDrink + ". Fun and rich, the " + finalDrink + " will satisfy your sweet tooth while you enjoy your flick.",

  'Biography': "Into Biographies I see. You'll need something a little stronger to get you through " + userMovie + ". Try the " + finalDrink + " to get you through the slower plot points and help you digest all the riveting info. You may need 2 or 3 to get you through the whole movie.",

  'Comedy': "You chose the comedy " + userMovie + ". This will go great with the " + finalDrink + " The only thing funnier than " + userMovie + " is your " + finalDrink + ".",

  'Crime': "The movie " + userMovie + " is a classic crime movie. What better to drink with it than a classic cocktail. Try the " + finalDrink + " and turn your living room into your own personal speakeasy.",

  'Documentary': "You'll need some caffeine to get you through the documentary " + userMovie + ". Coffee or tea would suit this best. Try making the " + finalDrink + ". This will definitely spice up your educational evening.",

  'Drama': "You've got a flair for the dramatic. The " + finalDrink + " will make sure your drink choice is as emotionally charged as what you're watching.",

  'Family': "Family movies should be enjoyed with family. Make it an enjoyable movie night for everyone! Grab some soda for the kids, and while you've got the soda handy make sure to make yourself the " + finalDrink + ".",

  'Fantasy': userMovie + " is a great fantasy movie. Invite the whole fellowship over to watch it and make sure to make some extra rounds of the " + finalDrink + " for all of them.",

  'History': "You must be a history buff! Despite being a bit boring, you can never go wrong with the " + finalDrink + ". An easy watching movie needs an easy drinking cocktail.",

  'Horror': "You certainly like scary things with your movie choice, " + userMovie + "! Hack up these ingredients and add some red food dye to really scare your friends with a nice bloody " + finalDrink + ".",

  'Musical': "Sing along with " + userMovie + " while you enjoy sipping on your " + finalDrink + ". Musicals are best enjoyed with a nice drink on the side. Do-re-mi-fa-so-la-" + finalDrink + "-do.",

  'Mystery': "Everyone likes a good mystery and " + userMovie + " will certainly deliver. The " + finalDrink + " will be an excellent way to discover a new and exciting drink while figuring out \"who dun it\".",

  'Romance': "When you want to get frisky you want a drink that helps set the mood. " + userMovie + " will set the stage and the " + finalDrink + " will be sure to leave your sweetheart wanting a bit more sugar… ;-)",

  'Sci-Fi': "In a kitchen not so far away, hopefully you have all the ingredients for the " + finalDrink + ". Explore this far out drink while you are enjoying " + userMovie + ".",

  'Thriller': userMovie + " will keep you on the edge of your seat. Help yourself calm down with a nice easy drink, the " + finalDrink + ". ",

  'Western': "Let's be real. What's a western movie without a few shots of moonshine? Whether you're  roping cattle or in a standoff with the deputy, make sure to bring the " + finalDrink + ". With this drink on the menu, you're sure to have the rootenest, tootenist evening you can imagine!",

}

    console.log(descriptions)
    $('#adLib').append(descriptions[finalGenre]);

    var hasStrIng = true;
    var strIdx = 1
      while (hasStrIng) {
      var strIngredient = 'strIngredient' + strIdx;
      var strIngredientVal = response.drinks[0][strIngredient];

        var strMeasure = 'strMeasure' + strIdx;
        var strMeasureVal = response.drinks[0][strMeasure];
          if (strIngredientVal == null) {
            hasStrIng = false;
            return hasStrIng;
          } else {
            if (strMeasureVal !== null) {
              // console.log(strIngredientVal);
              // console.log(strMeasureVal);
              $('#drink-ingredients').append(`<li>${strMeasureVal} ${strIngredientVal}</li>`)
              ++strIdx;
            } else {
              // console.log(strIngredientVal);
              $('#drink-ingredients').append(`<li>${strIngredientVal}</li>`)
              ++strIdx;
            }

          }
        }
  })
}

function resetResults() {
  $('#drink-title, #drink-image, #drink-ingredients, #drink-instructions, #genreAndCategory, #adLib' ).empty()
} 

$("#submitBtnGenre").on('click', function (event) {
  event.preventDefault();
  // Do not allow userMovie to be empty
  genre = $("#dropdownMenuGenre").val()
  console.log(genre, 'i like');
  if (!genre) return;
  $('.genre').remove()
  drinkData(genre)
  
});