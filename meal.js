let meal_btn = document.querySelector("#get_meal");
let meal_info = document.querySelector("#meal");

function getMeal(meal) {
  let allIngredientsRecipes = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      allIngredientsRecipes.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }

  const newInnerHTML = `
    <div class="row">
        <div class="columns five">
            <img src="${meal.strMealThumb}" alt="Meal Image">
            ${
              meal.strCategory
                ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
                : ""
            }
            ${
              meal.strArea
                ? `<p><strong>Area:</strong> ${meal.strArea}</p>`
                : ""
            }
            ${
              meal.strTags
                ? `<p><strong>Tags:</strong> ${meal.strTags
                    .split(",")
                    .join(", ")}</p>`
                : ""
            }
            <h5>Ingredients:</h5>
            <ul>
                ${allIngredientsRecipes
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}
            </ul>
        </div>
        <div class="columns seven">
            <h4>${meal.strMeal}</h4>
            <p>${meal.strInstructions}</p>
        </div>
    </div>
    ${
      meal.strYoutube
        ? `
    <div class="row">
        <h5>Video Recipe</h5>
        <div class="videoWrapper">
            <iframe width="420" height="315"
            src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
            </iframe>
        </div>
    </div>`
        : ""
    }
`;

  meal_info.innerHTML = newInnerHTML;
}









function getData() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
    //   if (data.meals && data.meals.length > 0) {
        getMeal(data.meals[0]);
    //   } else {
        // console.warn("No meal data available");
    //   }
    })
    .catch((err) => console.warn(err));
}

meal_btn.addEventListener("click", getData);
