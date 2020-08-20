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

});
