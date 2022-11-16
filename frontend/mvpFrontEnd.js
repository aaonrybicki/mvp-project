// const apiUrl = 'https://los-portales.onrender.com/';
const apiUrl ='http://localhost:8001/';
//====event listeners for get method that essentially loads the fetch upon clicking the menuitems button and menucategory button ===//
const menuItemButton = document.getElementById('menuItems');
menuItemButton.addEventListener('click', clearData);
menuItemButton.addEventListener('click', getMenuItems);

const menuCatsButton = document.getElementById('menuCats');
menuCatsButton.addEventListener('click', clearData);
menuCatsButton.addEventListener('click', getMenuCategory);
//==============================crud operation GET============================= //
function getMenuItems() {
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};
	fetch(apiUrl + 'menuItems', requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			DisplayMenuItems(result);
		})
		.catch(error => console.log('error', error));
}
//=====DisplayMenuItems function that displays menu items to a div======//
function DisplayMenuItems(result) {
	for (let i = 0; result.length; i++) {
		const divSection2 = document.getElementById('displaySection');
		const foodItems = result[i];
		console.log(foodItems);
		const name = foodItems.name;
		const description = foodItems.description;
		const calories = foodItems.calories;
		const price = foodItems.price; 
		var ul = document.createElement('ul');
		const foodNameDiv = document.createElement('h1');
		foodNameDiv.innerHTML = name;
		ul.append(foodNameDiv);
		const h1Button = document.createElement('button');
		h1Button.innerHTML = 'delete this menu item';
		ul.setAttribute('id', foodItems.id);
		ul.append(h1Button);
		//==========CRUD OPERATION DELETE with an event listener=====//
		h1Button.addEventListener('click', function(e){
			var id = e.target.parentNode.id;
			e.target.parentElement.remove();
			var requestOptions = {
				method: 'DELETE',
				redirect: 'follow'};
 
			fetch(`${apiUrl}menuItems/${id}`, requestOptions)
				.then(response => response.json())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));
		});
		const descriptionDiv = document.createElement('li');
		descriptionDiv.innerHTML = description;
		ul.appendChild(descriptionDiv);
		const calorieDiv = document.createElement('li');
		calorieDiv.innerHTML = 'calories: ' + calories;
		ul.appendChild(calorieDiv);
		const priceDiv = document.createElement('li');  
		priceDiv.innerHTML = 'price: $' + price;
		ul.appendChild(priceDiv);
		divSection2.append(ul);

	}
}

//=====crud operation GET for menuCategories note: the event listener button is located on line 11====//
function getMenuCategory() {
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};
	fetch(apiUrl + 'menuCategories', requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			DisplayMenuCategory(result);
			
		})
		.catch(error => console.log('error', error));
}

function DisplayMenuCategory(result) {
	for (let i = 0; result.length; i++) {
		const divSection2 = document.getElementById('displaySection');        
		const menuCategory = result[i];
		const id = menuCategory.id;
		const categoryName = menuCategory.name;
		var ul = document.createElement('ul');
		const categoryHeader = document.createElement('h1');
		categoryHeader.innerHTML = id + ') ' + categoryName;
		divSection2.append(ul);
		ul.appendChild(categoryHeader);          
	}
}
//=====================Function that clears the data in the displaySection=================//
function clearData() {
	document.getElementById('displaySection').innerHTML = '';
}
//======================CRUD OPERATION POST==============================//
const addButton = document.getElementById('submit');
addButton.addEventListener('click', function(e) { 
	e.preventDefault();
	const menuItem = {};
	menuItem.name = document.querySelector('#menuName').value;
	menuItem.description = document.querySelector('#menuDescription').value;
	menuItem.calories = document.querySelector('#menuCalorie').value;
	menuItem.price = document.querySelector('#menuPrice').value;
	menuItem.menu_categories_id = document.querySelector('#foriegnKey').value;
	
	
	fetch(apiUrl + 'menuItems', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(menuItem)
	})
		.then(res => res.json())
		.then(data => DisplayMenuItems(data))
		.catch(err => console.log(err));
});
//=====================CRUD OPERATION PATCH==========================//
const updateButton = document.getElementById('update');
updateButton.addEventListener('click', function(e) { 
	e.preventDefault();
	console.log('updateButton');
	const menuItem = {};
	menuItem.name = document.querySelector('#menuName').value;
	menuItem.description = document.querySelector('#menuDescription').value;
	menuItem.calories = document.querySelector('#menuCalorie').value;
	menuItem.price = document.querySelector('#menuPrice').value;
	menuItem.menu_categories_id = document.querySelector('#foriegnKey').value;
	

	fetch(apiUrl + 'menuItems', {
		method: 'PATCH', 
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(menuItem)
	})
		.then(res => res.json())
		.then(data => DisplayMenuItems(data))
		
		.catch(err => console.log(err));
	
});