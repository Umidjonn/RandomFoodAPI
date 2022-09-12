// https://www.themealdb.com/api.php site supported

const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
		createMeal(res.meals[0]);
	});
});

const createMeal = (meal) => {
	const ingredients = [];
	// 20 tagacha olingan nomlar
	for (let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// To'xtaish 
			break;
		}
	}
	
	const newInnerHTML = `
		<div class="row">
			<div class="">
				<img class="mt-5 img" src="${meal.strMealThumb}" alt="Meal Image" width='300'heigth='300' >
				${meal.strCategory ? `<p><strong>Toifa:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Hudud:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Ovqat turi:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${meal.strYoutube ? `
		<div class="row">
			<h5>Tayyorlash usuli</h5>
			<div class="videoWrapper">
				<iframe width="100" height="100"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;
	
	meal_container.innerHTML = newInnerHTML;
}