document.addEventListener("DOMContentLoaded", function() {


	









	var d = document;
	var filterArea = d.querySelector('.filter-area');

	filterArea.addEventListener('click', function(){
		if(this.classList.contains('active')){
			this.classList.remove('active');
		}else{
			this.classList.add('active');
		}
		
	});

	var askFilter = d.querySelector('.btn-ask-filter');
	askFilter.addEventListener('click', function(e){
		e.preventDefault();
		d.querySelector('.filter').classList.add('active');
	})
	var closeFilter = d.querySelector('.close');
	closeFilter.addEventListener('click', function(e){
		e.preventDefault();
		d.querySelector('.filter').classList.remove('active');
	})

	const productData = [
	  {
	  	photo: "images/dest/catalog-img-1.jpg",
	    name: "Эконом",
	    area: 0,63,
	    equipment: [none],
	    price: 100
	  },
	  {
	  	photo: "images/dest/catalog-img-2.jpg",
	    name: "Эконом плюс",
	    size: '90x100x180',
	    area: 0,90,
	    equipment: [lejac, game],
	    price: 200
	  },
	  {
	  	photo: "images/dest/catalog-img-3.jpg",
	    name: "Комфорт",
	    size: '100x125x180',
	    area: 1,13,
	    equipment: [lejac, game, сlaws],
	    price: 250
	  },
	  {
	  	photo: "images/dest/catalog-img-4.jpg",
	    name: "Сьют",
	    size: '125x125x180',
	    area: 1,56,
	    equipment: [lejac, game, сlaws],
	    price: 350
	  },
	  {
	  	photo: "images/dest/catalog-img-5.jpg",
	    name: "Люкс",
	    size: '160x160x180',
	    area: 2,56,
	    equipment: [lejac, game, сlaws, home],
	    price: 500
	  },
	  {
	  	photo: "images/dest/catalog-img-6.jpg",
	    name: "Супер-Люкс",
	    size: '180x160x180',
	    area: 2,88,
	    equipment: [lejac, game, сlaws, home],
	    price: 600
	  },
	];

	// function age(birthYear) {
	//   let calculatedAge = new Date().getFullYear() - birthYear;
	//   if (calculatedAge == 1) {
	//     return "1 year old";
	//   } else if (calculatedAge == 0) {
	//     return "Baby";
	//   } else {
	//     return `${calculatedAge} years old`;
	//   }
	// }

	// function foods(foods) {
	//   return `
	// <h4>Favorite Foods</h4>
	// <ul class="foods-list">
	// ${foods.map(food => `<li>${food}</li>`).join("")}
	// </ul>
	// `;
	// }

	// function petTemplate(pet) {
	//   return `
	//     <div class="animal">
	//     <img class="pet-photo" src="${pet.photo}">
	//     <h2 class="pet-name">${pet.name} <span class="species">(${pet.species})</span></h2>
	//     <p><strong>Age:</strong> ${age(pet.birthYear)}</p>
	//     ${pet.favFoods ? foods(pet.favFoods) : ""}
	//     </div>
	//   `;
	// }

	// // document.getElementById("app").innerHTML = `
	// //   <h1 class="app-title">Pets (${petsData.length} results)</h1>
	// //   ${petsData.map(petTemplate).join("")}
	// //   <p class="footer">These ${petsData.length} pets were added recently. Check back soon for updates.</p>
	// // `;

});
