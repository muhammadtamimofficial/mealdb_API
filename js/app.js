// start input feild , input button , search Result cotainar and show deatils card keep with ID 
const inputFeild = document.getElementById('input-feild');
const searchReasult = document.getElementById('search-result');
const showDeatilsCard = document.getElementById('showDeatilsCard')
const inputBtn = document.getElementById('feild-btn');
// end input feild , input button , search Result cotainar and show deatils card keep with ID 

// if press enter key then click on search button ,start 
inputFeild.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        inputBtn.click();
    }
})
// if press enter key then click on search button ,end 

// load api and convert on json , start
loadData = (ItemName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${ItemName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.meals))
    // clear input feild and search reasults
    inputFeild.value = '';
    searchReasult.innerHTML = '';
}
// load api and convert on json , end 

//  if click on search button then find input value and call loadData function, start
document.getElementById('feild-btn').addEventListener('click', function () {
    const inputValue = inputFeild.value;
    loadData(inputValue);
})
//  if click on search button then find input value and call loadData function, end

//  display api results start
const displayResult = (meals) => {
    // console.log(meals);
    meals.forEach(meal => {

        // console.log(meal.strMeal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal Image">
            <div class="card-body">
                <h5 class="card-title">Name: ${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
                <button onclick="showDetails(${meal.idMeal})"
                 class="btn btn-outline-success">Show details</button>
            </div>
        </div>
        `
        // console.log(searchReasult);
        searchReasult.appendChild(div);
    });
}
//  display api results end

//  load api results details start
const showDetails = (mealId) => {
    // console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => showDetailsCard(data))
}
// load api results details end

// display api deatail start
const showDetailsCard = (data) => {
    // console.log(data);
    showDeatilsCard.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card', 'mb-3', 'w-75', 'mx-auto');
    div.innerHTML = `
    <img src="${data.meals[0].strMealThumb}" alt="Card image cap">

    <div class="card-body">
    <h5 class="card-title">Name: ${data.meals[0].strMeal}</h5>
    <p style="text-align: justify" class="card-text text-justify">${data.meals[0].strInstructions}</p>
    <div>
    <a target=_blank href="${data.meals[0].strYoutube}" class="btn btn-outline-success">Video Tutorial</a>
    <button onclick="hideDetails()" class="btn btn-outline-success">Hide details</button>
    </div>
    </div>
    <img style="width:100%" class="card-img-top"
`
    showDeatilsCard.appendChild(div);
}
// display api deatail end 

// hide api details 
const hideDetails = () => showDeatilsCard.innerHTML = '';



loadData('');