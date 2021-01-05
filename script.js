$(document).ready(function () {

  // gets key from localStorage
  // converts key from string to number
  const ageVerification = (+localStorage.getItem("isLegal"));
  
  // displays modal on page load
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

  // click listener to show movie title form
  $("#titleBtn").click(function (event) {
    event.preventDefault()
    $('#titleForm, #reset, #submitBtnTitle').removeClass('hide')
    $('#titleBtn, #genreBtn, .heading').addClass('hide')
  })

  // click listener to show movie genre form
  $("#genreBtn").click(function (event) {
    event.preventDefault()
    $('#genreForm, #reset, #submitBtnGenre').removeClass('hide')
    $('#titleBtn, #genreBtn, .heading').addClass('hide')
  })

  // click listener that resets values and returns back to inital state
  $("#reset").click(function (event) {
    event.preventDefault()
    userMovieRef.val("")
    $("#dropdownMenuGenre").val("")
    $('#genreForm, #titleForm, #reset, #submitBtnGenre, #submitBtnTitle').addClass('hide')
    $('#titleBtn, #genreBtn, .heading').removeClass('hide')
  })

  // object comparing genre to drink category and descriptions
  var compare = {
    'Action': {
      drink: ['Beer'],
      libs: (userMovie, finalDrink) => "You chose the action movie " + userMovie + ". We think you would really enjoy pairing it with the " + finalDrink + ". Action movies are full of energy and excitement, just like this drink!",
    },
    'Adventure': {
      drink: ['Homemade Liqueur'],
      libs: (userMovie, finalDrink) => "You chose the adventure movie " + userMovie + ".  " + userMovie + " pairs great with the " + finalDrink + ". Your drink choice should be as adventurous as your taste in movies!",
    },
    'Animation': {
      drink: ['Milk \/ Float \/ Shake', 'Soft Drink \/ Soda'],
      libs: (userMovie, finalDrink) => "You chose the Animated movie " + userMovie + ". Explore your inner youth with the " + finalDrink + ". Fun and rich, the " + finalDrink + " will satisfy your sweet tooth while you enjoy your flick.",
    },
    'Biography': {
      drink: ['Shot'],
      libs: (userMovie, finalDrink) => "Into Biographies I see. You'll need something a little stronger to get you through " + userMovie + ". Try the " + finalDrink + " to get you through the slower plot points and help you digest all the riveting info. You may need 2 or 3 to get you through the whole movie.",
    },
    'Comedy': {
      drink: ['Beer', 'Cocktail', 'Ordinary Drink'],
      libs: (userMovie, finalDrink) => "You chose the comedy " + userMovie + ". This will go great with the " + finalDrink + " The only thing funnier than " + userMovie + " is your " + finalDrink + ".",
    },
    'Crime': {
      drink: ['Cocktail'],
      libs: (userMovie, finalDrink) => "The movie " + userMovie + " is a classic crime movie. What better to drink with it than a classic cocktail. Try the " + finalDrink + " and turn your living room into your own personal speakeasy.",
    },
    'Documentary': {
      drink: ['Coffee \/ Tea'],
      libs: (userMovie, finalDrink) => "You'll need some caffeine to get you through the documentary " + userMovie + ". Coffee or tea would suit this best. Try making the " + finalDrink + ". This will definitely spice up your educational evening.",
    },
    'Drama': {
      drink: ['Cocktail'],
      libs: (userMovie, finalDrink) => "You've got a flair for the dramatic. The " + finalDrink + " will make sure your drink choice is as emotionally charged as what you're watching.",
    },
    'Family': {
      drink: ['Soft Drink \/ Soda'],
      libs: (userMovie, finalDrink) => "Family movies should be enjoyed with family. Make it an enjoyable movie night for everyone! Grab some soda for the kids, and while you've got the soda handy make sure to make yourself the " + finalDrink + ".",
    },
    'Fantasy': {
      drink: ['Punch \/ Party Drink'],
      libs: (userMovie, finalDrink) => userMovie + " is a great fantasy movie. Invite the whole fellowship over to watch it and make sure to make some extra rounds of the " + finalDrink + " for all of them.",
    },
    'History': {
      drink: ['Ordinary Drink'],
      libs: (userMovie, finalDrink) => "You must be a history buff! Despite being a bit boring, you can never go wrong with the " + finalDrink + ". An easy watching movie needs an easy drinking cocktail.",
    },
    'Horror': {
      drink: ['Punch \/ Party Drink'],
      libs: (userMovie, finalDrink) => "You certainly like scary things with your movie choice, " + userMovie + "! Hack up these ingredients and add some red food dye to really scare your friends with a nice bloody " + finalDrink + ".",
    },
    'Musical': {
      drink: ['Ordinary Drink', 'Cocktail'],
      libs: (userMovie, finalDrink) => "Sing along with " + userMovie + " while you enjoy sipping on your " + finalDrink + ". Musicals are best enjoyed with a nice drink on the side. Do-re-mi-fa-so-la-" + finalDrink + "-do.",
    },
    'Mystery': {
      drink: ['Ordinary Drink', 'Other\/Unknown'],
      libs: (userMovie, finalDrink) => "Everyone likes a good mystery and " + userMovie + " will certainly deliver. The " + finalDrink + " will be an excellent way to discover a new and exciting drink while figuring out \"who dun it\".",
    },
    'Romance': {
      drink: ['Cocoa', 'Milk \/ Float \/ Shake'],
      libs: (userMovie, finalDrink) => "When you want to get frisky you want a drink that helps set the mood. " + userMovie + " will set the stage and the " + finalDrink + " will be sure to leave your sweetheart wanting a bit more sugar… ;-)",
    },
    'Sci-Fi': {
      drink: ['Other\/Unknown'],
      libs: (userMovie, finalDrink) => "In a kitchen not so far away, hopefully you have all the ingredients for the " + finalDrink + ". Explore this far out drink while you are enjoying " + userMovie + ".",
    },
    'Thriller': {
      drink: ['Ordinary Drink', 'Beer'],
      libs: (userMovie, finalDrink) => userMovie + " will keep you on the edge of your seat. Help yourself calm down with a nice easy drink, the " + finalDrink + ". ",
    },
    'Western': {
      drink: ['Shot'],
      libs: (userMovie, finalDrink) => "Let's be real. What's a western movie without a few shots of moonshine? Whether you're  roping cattle or in a standoff with the deputy, make sure to bring the " + finalDrink + ". With this drink on the menu, you're sure to have the rootenest, tootenist evening you can imagine!",
    },
  }

  // on page load, display drink of the month
  drinkInfo('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12528')

  // gets random position of an array
  // if no parameters or undefined, default to array
  function getPosition(arr = []) {
    return Math.floor(Math.random() * (arr.length))
  }

  // empties nodes
  function resetResults() {
    $('#drink-title, #drink-image, #drink-ingredients, #drink-instructions, #genreAndCategory, #adLib').empty()
  }

  // error handling log
  // in case of future error handling cases
  function errorHandling(error) {
    console.info(error)
  }

  // returns the ingredients of a drink
  function drinksIngredients(currentDrink) {
    const drinks = [];
    var hasStrIng = true;
    var strIdx = 1;
    // while true, appends ingredients to array
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

  // append the drink info of the month (drink name, ingredients, measurements, & instructions)
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
      }).catch(errorHandling)
  }

  // modal for age check
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
    // redirects users who are not of age
    localStorage.removeItem("isLegal")
    document.location.href = 'https://www.youtube.com/watch?v=aucAFuZJuC4';
  })

  // click listener; redirects to pref page
  $("#getStarted").click(function (event) {
    event.preventDefault();
    document.location.href = 'preferences.html';
  });

  // click listener on submit button
  $("#submitBtnTitle").on('click', function (event) {
    event.preventDefault();
    // value of inputted movie
    var userMovie = userMovieRef.val()
    // Do not allow userMovie to be empty
    if (!userMovie) return;
    $.ajax({ url: omdbQueryURL(userMovie) }).then((response) => {
      // throws error if movie not found
      if (response.Error) return new Error(response);
      // grabs genre from ajax object and converts to an array
      const getGenreTypes = (response.Genre || "").split(", ");
      // runs function and passes genre as argument
      drinkData(getGenreTypes[getPosition(getGenreTypes)])

    }).catch(errorHandling) // catches error throw
  });

  // function that takes an argument and appends data to the preference list
  function drinkData(genre) {
    // value of inputted movie title
    var userMovie = userMovieRef.val();
    // trim the result
    const currentDrinks = compare[genre.trim()].drink;

    // grab one genre
    const getDrinksCategory = currentDrinks[getPosition(currentDrinks)];

    // gets the response data from ajax call (array of drinks)
    $.ajax({ url: queryURLCategory(getDrinksCategory) }).then(response => {
      // retrieve random drink from array
      const currentDrink = response.drinks[getPosition(response.drinks)].idDrink;
      // returns drink information
      return $.ajax({ url: drinkId(currentDrink) }).then(response => {
        // logs current drink data
        console.log({genre, currentDrinks,  getDrinksCategory, currentDrink, response})
        // runs reset function
        resetResults()

        var finalDrink = response.drinks[0].strDrink
        const drinks = drinksIngredients(response.drinks[0])
  
        // appends adlib for the inputted movie if available
        if (userMovie) {
          $('#adLib').append(compare[genre].libs(userMovie, finalDrink));
        }

        // appends data for the current drink to the drink section on preferences page
        $('#genreAndCategory').append(finalDrink)
        $('#drink-title').append(`<h4 class="">Type: ${getDrinksCategory}</h4>`);
        $('#drink-image').append(`<img src="${response.drinks[0].strDrinkThumb}" alt="${finalDrink}" width="400" height="400">`);
        $('#drink-instructions').append(`<p>${response.drinks[0].strInstructions}</p>`);
        $('#drink-ingredients').append(drinks);
      })
    }).catch(errorHandling) // catches errors
  }

  // click listener for genre button
  $("#submitBtnGenre").on('click', function (event) {
    event.preventDefault();
    // Do not allow userMovie to be empty
    var genre = $("#dropdownMenuGenre").val()
    if (!genre) return;
    drinkData(genre)
  });
})