const mealsEl = document.querySelector("#meals");
const favoriteContainer = document.querySelector("#fav-meals");
const mealPopup = document.querySelector("#meal-popup");
const mealInfoEl = document.querySelector("#meal-info");
const popupCloseBtn = document.querySelector("#close-popup");
const searchTerm = document.querySelector("#search-term");
const searchBtn = document.querySelector("#search");

//Instintate
getRandomMeal();
fetchFavMeals();

//1. Get Random Meals from link
async function getRandomMeal(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    console.log(respData);

    const randomMeal = respData.meals[0];
    addMeal(randomMeal, true);
};

//2. Get Random Meal using ID
async function getMealById(id){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();

    const meal = respData.meals[0];
    return meal;
};

//3. Get Random Meals using Term / Name
async function getMealsBySearch(term){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();

    const meals = respData.meals;
    return meals;
};

//4. To Fetch Favourit Items from Fav
async function fetchFavMeals(){
    favoriteContainer.innerHTML = "";
    const mealIds = getMealsLS();

    for(let i=0; i<mealIds.length; i++){
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealFav(meal);
    }
};

//FUNCTION - ADD
function addMeal(mealData, random = false){
    console.log(mealData);

    //Create innerHTML for <div class="meal">
    const meal = document.createElement("div");
    meal.classList.add("meal");
    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random"> Random Recipe </span>` : ""}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    //Add / Remove from Fav
    btn.addEventListener("click", () => {
        if(btn.classList.contains("active")){
            removeMealLs(mealData.idMeal); //It remove meal from LS
            btn.classList.remove("active");
        }else{
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }

        fetchFavMeals();
    });

    //It will show the Fav meal
    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
};

//FUNCTION - ADD MEALS TO LS for FAV.
function addMealLS(mealId){
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
};

//FUNCTION - REMOVE MEALS FROM LS for FAV.
function removeMealLS(mealId){
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
};

//FUNCTION - GET MEALS FROM LS
function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
};

//FUNCTION - SHOW RANDOM-MEALS / FAV-MEALS DETAILS
function showMealInfo(mealData){
    mealInfoEl.innerHTML = ""; //clean itup

    //update the meal-info
    const mealEl = document.createElement('div');
    const ingredients = [];

    for(let i=1; i<=20; i++){
        if(mealData["strIngredient" + i]){
            ingredients.push(`${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`);
        }else{
            break;
        }
    }

    //Create innerHTML for <div class="meal-info">
    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);
    mealPopup.classList.remove("hidden");
};

//FUNCTION - ADD MEAL TO FAV
function addMealFav(mealData){
    const favMeal = document.createElement("li");

    //created innerHTML for <ul class="fav-meals" id="fav-meals">
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");

    //EVENT
    btn.addEventListener("click", ()=> {
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);
};

//EVENT - SEARCH BUTTON
searchBtn.addEventListener("click", async() => {
    mealsEl.innerHTML = "";
    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);

    if(meals){
        meals.forEach((meal)=> { //multiple random meals will add
            addMeal(meal);
        });
    }
});

//EVENT - CLOSE THE FAV-ITEM BUTTON
popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});