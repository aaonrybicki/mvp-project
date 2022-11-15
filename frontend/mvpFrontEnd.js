//====event listeners for get method that essentially loads the fetch upon clicking the menuitems button and menu category button ===//
const apiUrl = 'https://los-portales.onrender.com/';

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
//====Function that creates an array of menu items on the page upon the click of the event handler on line 4=======//
function DisplayMenuItems(result) {
	for (let i = 0; result.length; i++) {
		const divSection2 = document.getElementById('displaySection');
		const foodItems = result[i];
		console.log(foodItems);

		const name = foodItems.name;
		const description = foodItems.description;
		const calories = foodItems.calories;
		const price = foodItems.price;
		// create divs and appends so it shows up in the selected div
		var ul = document.createElement('ul');
		const foodNameDiv = document.createElement('h1');
		foodNameDiv.innerHTML = name;
		ul.append(foodNameDiv);
		const h1Button = document.createElement('button');
		h1Button.innerHTML = 'delete this menu item';
		ul.setAttribute('id', foodItems.id);
		ul.append(h1Button);
		//==== delete event handler with a button to delete the menu item selected this is where the crud operation DELETE is=//
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

// this function does the same as the get menu items 
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

function clearData() {
	document.getElementById('displaySection').innerHTML = '';
}

// const form = document.getElementById('form');
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
	// setTimeout(menuItemButton.click(), 3000);
});