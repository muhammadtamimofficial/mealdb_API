const inputFeild = document.getElementById('input-feild');
const searchReasult = document.getElementById('search-result');
const showDeatilsCard = document.getElementById('showDeatilsCard')
// const inputBtn = document.getElementById('feild-btn');
document.getElementById('feild-btn').addEventListener('click', function () {
    // const inputFeild = document.getElementById('input-feild');
    const inputValue = inputFeild.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.meals))

    inputFeild.value = '';
    searchReasult.innerHTML = '';
})

const displayResult = (meals) => {
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
                <button onclick="showDetails(${meal.idMeal})" class="btn btn-outline-success">Show details</button>
            </div>
        </div>
        `
        // console.log(searchReasult);
        searchReasult.appendChild(div);
    });
}
const showDetails = (mealId) => {
    // console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => showDetailsCard(data))
}
const showDetailsCard = (data) => {
    console.log(data);
    showDeatilsCard.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card', 'mb-3', 'w-75', 'mx-auto');
    div.innerHTML = `
    <img src="${data.meals[0].strMealThumb}" alt="Card image cap">

    <div class="card-body">
    <h5 class="card-title">Name: ${data.meals[0].strMeal}</h5>
    <p class="card-text">${data.meals[0].strInstructions}</p>
    <div>
    <a target=_blank href="${data.meals[0].strYoutube}" class="btn btn-outline-success">Video Tutorial</a>
    <button onclick="hideDetails()" class="btn btn-outline-success">Hide details</button>
    </div>
    </div>
    <img style="width:100%" class="card-img-top"
`
    showDeatilsCard.appendChild(div);
}

const hideDetails = () => {
    showDeatilsCard.innerHTML = '';
}