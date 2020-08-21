document.addEventListener("DOMContentLoaded", function() {

	var d = document;



	// Ловим клик по бургеру для открытия мобильного меню
	var askFilter = d.querySelector('.header-burger');
	askFilter.addEventListener('click', function(e){
		d.querySelector('.mobile-menu').classList.add('active');
	})

	// Скрыть мобильное меню
	var closeFilter = d.querySelector('.mobile-menu .close');
	closeFilter.addEventListener('click', function(e){
		d.querySelector('.mobile-menu').classList.remove('active');
	})


	// Кнопка вызова фильтра для мобильных устройств
	var askFilter = d.querySelector('.btn-ask-filter');
	askFilter.addEventListener('click', function(e){
		e.preventDefault();
		d.querySelector('.filter').classList.add('active');
	})



	// Скрыть фильтр на мобильных устрйоствах
	var closeFilter = d.querySelector('.filter .close');
	closeFilter.addEventListener('click', function(e){
		d.querySelector('.filter').classList.remove('active');
	})







	// Чекаем есть ли активные чекбоксы или нет
	var checkboxesAll = document.querySelectorAll(".checkbox-wrapper input");

	for (var i = 0; i < checkboxesAll.length; i++) {
	  checkboxesAll[i].onchange = function(){
		var checkboxesChecked = [];
		for (var b = 0; b < checkboxesAll.length; b++) { 
		  	if (checkboxesAll[b].checked) {
		     	console.log('Чекнтуые есть')
		        checkboxesChecked.push(b);
		        d.querySelector(".btn-reset").classList.add('active');
		    } 
		}
		if(checkboxesChecked.length == 0){
			d.querySelector(".btn-reset").classList.remove('active');
		} 
	  };
	}


	d.querySelector('.btn-reset').onclick = function(e){
		e.preventDefault();
		d.querySelector('form').reset()
		this.classList.remove('active');
		filter();
	}



	// ------------------ Товары -------------------- //

	const productData = [
	  {
	  	photo: "images/dest/catalog-img-1.jpg",
	    name: "Эконом",
	    area: 0.63,
	    equipment: ["Пустой"],
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

	
	// Функция вывода размера для шаблона товара
	function size(sizes) {
	  return `<li><p>Размеры (ШxГxВ) - <span>${sizes}</span>см</p></li>`;
	}
	


	// Функция вывода оснащения для шаблона товара
	function equipments(equipments) {
		return `<li><p>Оснащение номера <span>${equipments.map(equipment => {
			if(equipment == 'Лежак'){
		  		return `<img src="images/dest/equipment2.svg" alt="Лежак">`;
		  	} else if(equipment == 'Игровой комплекс'){
		  		return `<img src="images/dest/equipment3.svg" alt="Игровой комплекс">`
		  	} else if(equipment == 'Когтеточка'){
		  		return `<img src="images/dest/equipment4.svg" alt="Когтеточка">`
		  	} else if(equipment == 'Домик'){
		  		return `<img src="images/dest/equipment5.svg" alt="Домик">`
		    } else if(equipment == 'Пустой'){
		  		return `<img src="images/dest/equipment1.svg" alt="Домик">`
		    }
		}).join(" ")}</span></p></li>`;

		
			
	}


	// Шаблон товара
	function productTemplate(product) {
	  return `

	  	<div class="item" data-price="${product.price}" data-area="${product.area}">
						<div class="product">
							<div class="product-thumbnail">
								<img src="${product.photo}" alt="Товар">
							</div>
							<div class="product-info">
								<h3>${product.name}</h3>
								<ul>
									${product.size ? size(product.size) : ""}
									<li><p>Площадь - <span class="area">${product.area}</span> м2</p></li>
									${product.equipment ? equipments(product.equipment) : ''}
									

									<li><p>Цена за сутки <span class="price">${product.price}</span>₽</p></li>
								</ul>
								<a href="#" class="btn">Забронировать <i><img src="images/dest/lapa.svg" alt="Лапа кота"></i></a>
							</div>
						</div>
					</div>
	  `;
	}


	// Выводим товварку из "Базы данных" по шаблону
	d.getElementById("resault").innerHTML = `${productData.map(productTemplate).join("")}`;








	// ------------------ Филтр товаров -------------------- //



	// Отслежываем отправку формы
	var form = d.querySelector('.filter form');
	form.onsubmit = function(e){
		e.preventDefault();
		filter();
		d.querySelector('.filter').classList.remove('active');	
	}




	// Скрипт фильтра
	function filter(){
		// Прописываем переменные с помощью которых будем фильтровать товарку
		var priceFrom = form.querySelector('#gap-from').value,
			priceTo = form.querySelector('#gap-to').value,
			listArea = getCheckedArea(),
			listEquipment = getCheckedEquipment();


			filterProductData = productData.slice(); // Копируем из "Базы данных" информацию о товарах
			
			for(var i = 0; i < filterProductData.length; i++) {

				// Сверяем цену
				if((filterProductData[i].price < priceFrom) || (filterProductData[i].price > priceTo) ){
					console.log('Товар: '+i + ' Не подходит и был грохнут | Не прошел проверку по Цене');
					 delete filterProductData[i];
				}


				// Проверяем площадь
				if (filterProductData[i] && listArea){
					console.log("Товар выжыл")

					for(var b = 0; b < listArea.length; b++){
						if(Number(filterProductData[i].area) == Number(listArea[b])){
							console.log('Товар: '+i + ' Подходит и он остается');
							break;
						}
						if(b == listArea.length-1){
							console.log('Товар: '+i + ' Не подходит и был грохнут | Не прошел проверку на площади');
							delete filterProductData[i];
						}
					}
				} else {
					console.log("Товар" +i+ "мертв")

				}


				// Проверяем оснащение
				if (filterProductData[i] && listEquipment){
					console.log("Товар выжыл")
					console.log(listEquipment)

					for(var b = 0; b < listEquipment.length; b++){
						console.log(filterProductData[i])
						if((filterProductData[i].equipment) && (filterProductData[i].equipment.includes(listEquipment[b]))){
							console.log('Товар: '+i + ' Подходит и он остается');
							
						}else{
							console.log('Товар: '+i + ' Не подходит и был грохнут | Не прошел проверку на оснащении');
							delete filterProductData[i];
							break;	
						}
					}
				} else {
					console.log("Товар" +i+ "мертв")
				}
				
		 	}

		 	// Проверем есть ли вообще такие товары по результатам фильтрации
		 	
		 	if(filterProductData.filter(n => n).length >= 1){

		 		// Выводим отфильтрованный список продуктов в Resault если товары есть
		 		d.getElementById("resault").innerHTML = `${filterProductData.map(productTemplate).join("")}`;
		 	} else {

		 		// Выводим это если товаров нет
		 		d.getElementById("resault").innerHTML = `<h2>К сожелению таких товаров у нас нет<h2>`;
		 	}

		 	
		 	

		 	// Сбрасываем сортировку товаров до Default
		 	d.querySelector('.filter-area .selected').innerHTML = `<img src="images/dest/arrow-to-top.svg" class="area-elem-arrow" alt="arrow-to-top">По площади`;
	}



	



	// Проверяет чекнутые чекбоксы в секции с площадью
	function getCheckedArea() {
	  var checkboxes = document.getElementsByClassName('list-area-checkbox');
	  var checkboxesChecked = []; 
	  for (var i = 0; i < checkboxes.length; i++) {
	     if (checkboxes[i].checked) {
	        checkboxesChecked.push(Number(checkboxes[i].name)); 
	        
	     }
	  }
	  return checkboxesChecked; 
	}
	// Проверяет чекнутые чекбоксы в секции с оснащением
	function getCheckedEquipment() {
	  var checkboxes = document.getElementsByClassName('list-equipment-checkbox');
	  var checkboxesChecked = [];  
	  for (var i = 0; i < checkboxes.length; i++) {
	     if (checkboxes[i].checked) {
	        checkboxesChecked.push(checkboxes[i].name); 
	        
	     }
	  }
	  return checkboxesChecked; 
	}












	// ------------------ Сортировка товаров -------------------- //

	var filterArea = d.querySelector('.filter-area .selected');

	filterArea.onclick = function(){
		this.parentNode.classList.add('active');
	}


	var options = document.querySelectorAll('.filter-area .option');
	// Ловим событие клилк по Опшенам и запускаем сортировку
	for (var oi = 0; oi < options.length; oi++) {
	  options[oi].onclick = function(){
	  	var сondition = this.getAttribute("data-sort"),
	  		сonditionType  = this.getAttribute("sort-type")
	  		сonditionContent = this.innerHTML;
	  		this.closest(".filter-area").classList.remove('active')
	  		this.closest(".filter-area").querySelector('.selected').innerHTML = сonditionContent;
	    	sortList(сondition, сonditionType)
	  };
	}

	// Сортируем эелементы в Resault по переданным значениям
	function sortList(сondition, сonditionType) {
	    var items = document.querySelector('#resault');
	    for (var i = 0; i < items.children.length - 1; i++) {
	        for (var b = i; b < items.children.length; b++) {

	        	if((сondition == 'area-low') || (сondition == 'price-low')){
	        		if (+items.children[i].getAttribute(сonditionType) > +items.children[b].getAttribute(сonditionType)) {
		                console.log(1);
		                var replacedNode = items.replaceChild(items.children[b], items.children[i]);
		                insertAfter(replacedNode, items.children[i]);
		            }
				} else if ((сondition == 'area-big') || (сondition == 'price-big')){
					if (+items.children[i].getAttribute(сonditionType) < +items.children[b].getAttribute(сonditionType)) {
		                console.log(2);
		                var replacedNode = items.replaceChild(items.children[b], items.children[i]);
		                insertAfter(replacedNode, items.children[i]);
		            }
				}

	        }
	    }
	}

	// Переставляем эелемент
	function insertAfter(elem, refElem) {
	    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
	}

});
