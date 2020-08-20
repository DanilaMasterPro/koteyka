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

});
