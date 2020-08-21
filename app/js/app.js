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






	// Товары

	const productData = [
	  {
	  	photo: "images/dest/catalog-img-1.jpg",
	    name: "Эконом",
	    area: 0.63,
	    price: 100
	  },
	  {
	  	photo: "images/dest/catalog-img-2.jpg",
	    name: "Эконом плюс",
	    size: '90x100x180',
	    area: 0.90,
	    equipment: ["Лежак", "Игровой комплекс"],
	    price: 200
	  },
	  {
	  	photo: "images/dest/catalog-img-3.jpg",
	    name: "Комфорт",
	    size: '100x125x180',
	    area: 1.13,
	    equipment: ["Лежак", "Игровой комплекс", "Когтеточка"],
	    price: 250
	  },
	  {
	  	photo: "images/dest/catalog-img-4.jpg",
	    name: "Сьют",
	    size: '125x125x180',
	    area: 1.56,
	    equipment: ["Лежак", "Игровой комплекс", "Когтеточка"],
	    price: 350
	  },
	  {
	  	photo: "images/dest/catalog-img-5.jpg",
	    name: "Люкс",
	    size: '160x160x180',
	    area: 2.56,
	    equipment: ["Лежак", "Игровой комплекс", "Когтеточка", "Домик"],
	    price: 500
	  },
	  {
	  	photo: "images/dest/catalog-img-6.jpg",
	    name: "Супер-Люкс",
	    size: '180x160x180',
	    area: 2.88,
	    equipment: ["Лежак", "Игровой комплекс", "Когтеточка", "Домик"],
	    price: 600
	  },
	];

	

	function size(sizes) {
	  return `<li><p>Размеры (ШxГxВ) - <span>${sizes}</span>см</p></li>`;
	}
	
	function equipments(equipments) {
		return `${equipments.map(equipment => {
			if(equipment == 'Лежак'){
		  		return `<img src="images/dest/equipment2.svg" alt="Лежак">`;
		  	} else if(equipment == 'Игровой комплекс'){
		  		return `<img src="images/dest/equipment3.svg" alt="Игровой комплекс">`
		  	} else if(equipment == 'Когтеточка'){
		  		return `<img src="images/dest/equipment4.svg" alt="Когтеточка">`
		  	} else if(equipment == 'Домик'){
		  		return `<img src="images/dest/equipment5.svg" alt="Домик">`
		    }
		}).join(" ")}`;

		
			
	}

	function productTemplate(product) {
	  return `

	  	<div class="item">
						<div class="product">
							<div class="product-thumbnail">
								<img src="${product.photo}" alt="Товар">
							</div>
							<div class="product-info">
								<h3>${product.name}</h3>
								<ul>
									${product.size ? size(product.size) : ""}
									<li><p>Площадь - <span class="area">${product.area}</span> м2</p></li>

									<li><p>Оснащение номера <span>${product.equipment ? equipments(product.equipment) : '<img src="images/dest/equipment1.svg" alt="Пустой номер">'}</span></p></li>

									<li><p>Цена за сутки <span class="price">${product.price}</span>₽</p></li>
								</ul>
								<a href="#" class="btn">Забронировать <i><img src="images/dest/lapa.svg" alt="Лапа кота"></i></a>
							</div>
						</div>
					</div>
	  `;
	}

	d.getElementById("resault").innerHTML = `${productData.map(productTemplate).join("")}`;




	// филтр товаров


	function getCheckedArea() {
	  var checkboxes = document.getElementsByClassName('list-area-checkbox');
	  var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать 
	  for (var i = 0; i < checkboxes.length; i++) {
	     if (checkboxes[i].checked) {
	        checkboxesChecked.push(Number(checkboxes[i].name)); // положим в массив выбранный
	        
	     }
	  }
	  return checkboxesChecked; // для использования в нужном месте
	}

	function getCheckedEquipment() {
	  var checkboxes = document.getElementsByClassName('list-equipment-checkbox');
	  var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать 
	  for (var i = 0; i < checkboxes.length; i++) {
	     if (checkboxes[i].checked) {
	        checkboxesChecked.push(checkboxes[i].name); // положим в массив выбранный
	        
	     }
	  }
	  return checkboxesChecked; // для использования в нужном месте
	}

	

	var form = d.querySelector('.filter form');
	form.onsubmit = function(e){
		e.preventDefault();
		var priceFrom = form.querySelector('#gap-from').value,
			priceTo = form.querySelector('#gap-to').value,
			listArea = getCheckedArea(),
			listEquipment = getCheckedEquipment();

			console.log(listArea)
			console.log(listEquipment)


			filterProductData = productData.slice();
			//console.log(filterProductData)
			for(var i = 0; i < filterProductData.length; i++) {

				// Сверяем цену
				if((filterProductData[i].price < priceFrom) || (filterProductData[i].price > priceTo) ){
					console.log('Товар: '+i + ' Не подходит и был грохнут');
					 delete filterProductData[i];
				}

				if (filterProductData[i] && listArea){
					console.log("Товар выжыл")

					for(var b = 0; b < listArea.length; b++){
						if(Number(filterProductData[i].area) == Number(listArea[b])){
							console.log('Товар: '+i + ' Подходит и он остается');
							break;
						}
						if(b == listArea.length-1){
							console.log('Товар: '+i + ' Не подходит и был грохнут | Залажал на площади');
							delete filterProductData[i];
						}
					}
				} else {
					console.log("Товар" +i+ "мертв")

				}

				if (filterProductData[i] && listEquipment){
					console.log("Товар выжыл")

					for(var b = 0; b < listEquipment.length; b++){
						console.log(filterProductData[i])
						if((filterProductData[i].equipment) && (filterProductData[i].equipment.includes(listEquipment[b]))){
							console.log('Товар: '+i + ' Подходит и он остается');
							
						}else{
							console.log('Товар: '+i + ' Не подходит и был грохнут | Залажал на оснащении');
							delete filterProductData[i];
							break;	
						}
					}
				} else {
					console.log("Товар" +i+ "мертв")
				}


				// Сверяем площадь
				

				// Сверяем оснащение
				// for(var b = 0; b < listArea.length; b++){
				// 	if(Number(filterProductData[i].area) == Number(listArea[b])){
				// 		console.log('Товар: '+i + ' Подходит и он остается');
				// 		break;
				// 	}
				// 	if(b == listArea.length-1){
				// 		console.log('Товар: '+i + ' Не подходит и был грохнут');
				// 		delete filterProductData[i];
				// 	}
				// }

				
				
		 	}

		 	console.log(filterProductData)
		 	d.getElementById("resault").innerHTML = `${filterProductData.map(productTemplate).join("")}`;
		 	return ;
		 	
	}

});
