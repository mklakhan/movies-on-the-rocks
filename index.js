// $("#ageModal").foundation('data-open', 'open');

var isLegal = 'false'

// use the drink array to return drink info (drink name, ingredients, measurements, & instructions)
    function drinkInfo(url) {
      $.ajax({
        url: url
      })
      .then ((response) => { 
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
  $("#isLegalYes").click(function(){
  console.log('true' + ' will be saved')
  localStorage.setItem(isLegal, "true")
  document.location.href = 'preferences.html';
  })
  // if click no
  $("#isLegalNo").click(function(){
  console.log('false' + ' will be saved')
  localStorage.setItem(isLegal, "false")
  document.location.href = 'https://www.youtube.com/watch?v=aucAFuZJuC4';
  })

    drinkInfo('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12528')


    