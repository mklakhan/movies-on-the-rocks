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

  // User defined movie title
  var userMovieRef = $('#movieTitle')

  // URL variables
  var omdbAPIKey = 'Trilogy'
  var omdbQueryURL = (movie) => `https://www.omdbapi.com/?apikey=${omdbAPIKey}&t=${movie}`;
  var queryURLCategory = (drink) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`;
  var drinkId = (id) => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

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

  $("#reset").click(function () {
    userMovieRef.val("")
    $("#dropdownMenuGenre").val("")
    $('#genreForm').addClass('hide')
    $('#titleForm').addClass('hide')
    $('#titleBtn').removeClass('hide')
    $('#genreBtn').removeClass('hide')
    $('#reset').addClass('hide')
    $('#submitBtnGenre').addClass('hide')
    $('#submitBtnTitle').addClass('hide')
    $('.heading').removeClass('hide')
    $('.title-Btn').removeClass('hide')
    $('.genre-Btn').removeClass('hide')
  })

  // object for populating our choice description
  var descriptions = {

    'Action': (userMovie, finalDrink) => "You chose the action movie " + userMovie + ". We think you would really enjoy pairing it with the " + finalDrink + ". Action movies are full of energy and excitement, just like this drink!",

    'Adventure': (userMovie, finalDrink) => "You chose the adventure movie " + userMovie + ".  " + userMovie + " pairs great with the " + finalDrink + ". Your drink choice should be as adventurous as your taste in movies!",

    'Animation': (userMovie, finalDrink) => "You chose the Animated movie " + userMovie + ". Explore your inner youth with the " + finalDrink + ". Fun and rich, the " + finalDrink + " will satisfy your sweet tooth while you enjoy your flick.",

    'Biography': (userMovie, finalDrink) => "Into Biographies I see. You'll need something a little stronger to get you through " + userMovie + ". Try the " + finalDrink + " to get you through the slower plot points and help you digest all the riveting info. You may need 2 or 3 to get you through the whole movie.",

    'Comedy': (userMovie, finalDrink) => "You chose the comedy " + userMovie + ". This will go great with the " + finalDrink + " The only thing funnier than " + userMovie + " is your " + finalDrink + ".",

    'Crime': (userMovie, finalDrink) => "The movie " + userMovie + " is a classic crime movie. What better to drink with it than a classic cocktail. Try the " + finalDrink + " and turn your living room into your own personal speakeasy.",

    'Documentary': (userMovie, finalDrink) => "You'll need some caffeine to get you through the documentary " + userMovie + ". Coffee or tea would suit this best. Try making the " + finalDrink + ". This will definitely spice up your educational evening.",

    'Drama': (userMovie, finalDrink) => "You've got a flair for the dramatic. The " + finalDrink + " will make sure your drink choice is as emotionally charged as what you're watching.",

    'Family': (userMovie, finalDrink) => "Family movies should be enjoyed with family. Make it an enjoyable movie night for everyone! Grab some soda for the kids, and while you've got the soda handy make sure to make yourself the " + finalDrink + ".",

    'Fantasy': (userMovie, finalDrink) => userMovie + " is a great fantasy movie. Invite the whole fellowship over to watch it and make sure to make some extra rounds of the " + finalDrink + " for all of them.",

    'History': (userMovie, finalDrink) => "You must be a history buff! Despite being a bit boring, you can never go wrong with the " + finalDrink + ". An easy watching movie needs an easy drinking cocktail.",

    'Horror': (userMovie, finalDrink) => "You certainly like scary things with your movie choice, " + userMovie + "! Hack up these ingredients and add some red food dye to really scare your friends with a nice bloody " + finalDrink + ".",

    'Musical': (userMovie, finalDrink) => "Sing along with " + userMovie + " while you enjoy sipping on your " + finalDrink + ". Musicals are best enjoyed with a nice drink on the side. Do-re-mi-fa-so-la-" + finalDrink + "-do.",

    'Mystery': (userMovie, finalDrink) => "Everyone likes a good mystery and " + userMovie + " will certainly deliver. The " + finalDrink + " will be an excellent way to discover a new and exciting drink while figuring out \"who dun it\".",

    'Romance': (userMovie, finalDrink) => "When you want to get frisky you want a drink that helps set the mood. " + userMovie + " will set the stage and the " + finalDrink + " will be sure to leave your sweetheart wanting a bit more sugar… ;-)",

    'Sci-Fi': (userMovie, finalDrink) => "In a kitchen not so far away, hopefully you have all the ingredients for the " + finalDrink + ". Explore this far out drink while you are enjoying " + userMovie + ".",

    'Thriller': (userMovie, finalDrink) => userMovie + " will keep you on the edge of your seat. Help yourself calm down with a nice easy drink, the " + finalDrink + ". ",

    'Western': (userMovie, finalDrink) => "Let's be real. What's a western movie without a few shots of moonshine? Whether you're  roping cattle or in a standoff with the deputy, make sure to bring the " + finalDrink + ". With this drink on the menu, you're sure to have the rootenest, tootenist evening you can imagine!",

  }

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

  drinkInfo('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12528')

  function getPosition(arr = []) {
    return Math.floor(Math.random() * (arr.length))
  }

  function resetResults() {
    $('#drink-title, #drink-image, #drink-ingredients, #drink-instructions, #genreAndCategory, #adLib').empty()
  }

  function errorHanding(error) {
    console.info(error)
  }

  function drinksIngredients(currentDrink) {
    const drinks = [];
    var hasStrIng = true;
    var strIdx = 1;
    while (hasStrIng) {
      var strIngredient = `strIngredient${strIdx}`;
      var strIngredientVal = currentDrink[strIngredient];
      var strMeasure = `strMeasure${strIdx}`;
      var strMeasureVal = currentDrink[strMeasure];
      if (strIngredientVal == null) {
        hasStrIng = false;
      } else {
        if (strMeasureVal !== null) {
          drinks.push($('<li/>').text(`${strMeasureVal} ${strIngredientVal}`))
          ++strIdx;
        } else {
          drinks.push($('<li/>').text(`${strIngredientVal}`))
          ++strIdx;
        }
      }
    }
    return drinks;
  };

  // use the drink array to return drink info (drink name, ingredients, measurements, & instructions)
  function drinkInfo(url) {
    $.ajax({
      url: url
    })
      .then((response) => {
        const drinks = drinksIngredients(response.drinks[0])
        $('#drink-title').append(`<h4 class="">${response.drinks[0].strDrink}</h4>`);
        $('#drink-image').append(`<img src="${response.drinks[0].strDrinkThumb}" alt="${response.drinks[0].strDrink}" width="400" height="400">`);
        $('#drink-instructions').append(`<p>${response.drinks[0].strInstructions}</p>`);
        $('#drink-ingredients').append(drinks);
      }).catch(errorHanding)
  }

  // modal for age check
  // $("#isLegalModal").addClass('reveal')
  // save information to local storage
  // if click yes
  $("#isLegalYes").click(function (event) {
    event.preventDefault()
    console.log('true will be saved')
    localStorage.setItem("isLegal", "21")
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
    document.location.href = 'preferences.html';
  });

  $("#submitBtnTitle").on('click', function (event) {
    event.preventDefault();
    var userMovie = userMovieRef.val()
    // Do not allow userMovie to be empty
    if (!userMovie) return;
    $.ajax({ url: omdbQueryURL(userMovie) }).then((response) => {
      if (response.Error) return new Error(response);
      // grabs genre from ajax object
      const getGenreTypes = (response.Genre || "").split(", ");
      // for each string in ajax object genre
      drinkData(getGenreTypes[getPosition(getGenreTypes)])
    }).catch(errorHanding)
  });

  function drinkData(genre) {
    // trim the result
    var userMovie = userMovieRef.val();
    const currentDrinks = compare[genre.trim()];

    // grab one genre
    const getDrinksCategory = currentDrinks[getPosition(currentDrinks)];

    // returns one drink
    $.ajax({ url: queryURLCategory(getDrinksCategory) }).then(response => {
      const currentDrink = response.drinks[getPosition(response.drinks)].idDrink;
      return $.ajax({ url: drinkId(currentDrink) }).then(response => {
        console.log({genre, currentDrinks,  getDrinksCategory, currentDrink, response})
        resetResults()
        var finalDrink = response.drinks[0].strDrink
        const drinks = drinksIngredients(response.drinks[0])
  
        if (userMovie) {
          $('#adLib').append(descriptions[genre](userMovie, finalDrink));
        }
        $('#genreAndCategory').append(finalDrink)
        $('#drink-title').append(`<h4 class="">Type: ${getDrinksCategory}</h4>`);
        $('#drink-image').append(`<img src="${response.drinks[0].strDrinkThumb}" alt="${finalDrink}" width="400" height="400">`);
        $('#drink-instructions').append(`<p>${response.drinks[0].strInstructions}</p>`);
        $('#drink-ingredients').append(drinks);
      })
    }).catch(errorHanding)
  }

  $("#submitBtnGenre").on('click', function (event) {
    event.preventDefault();
    // Do not allow userMovie to be empty
    var genre = $("#dropdownMenuGenre").val()
    if (!genre) return;
    drinkData(genre)
  });
})