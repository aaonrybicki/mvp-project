const express = require('express');
const {Pool} = require('pg');
const port = 8001;
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
//do not put your connection string in your js, move it to a config.json file and then gitignore it so it doesnt get uploade
const pool = new Pool({
	user: 'postgres',
	host: '127.0.0.1',
	database: 'mvp',
	password: 'docker',
	port: 5432,
});
pool.connect();


app.get('/', (req, res) => {
	res.send('welcome to los portales');
});


app.get('/menuCategories', (req, res) => {
	pool.query('SELECT * FROM menuCategories')
		.then(result => {
			console.log(result.rows);
			res.status(200).send(result.rows);
		})
		.catch(e => console.error(e.stack));
});


app.get('/menuItems', (req, res) => {
	pool.query('SELECT * FROM menuItems')
		.then(result => {
			// console.log(result.rows);
			res.send(result.rows);
		})
		.catch(e => console.error(e.stack));
});


app.post('/menuItems', (req, res) => {
	// console.log(req.body);
	var menuItems= req.body;
	var name= menuItems.name;
	var description= menuItems.description;
	var calories= (menuItems.calories);
	var price= (menuItems.price);
	var menu_categories_id= menuItems.menu_categories_id; 
	// console.log(menu_categories_id);
	pool.query(`INSERT INTO menuItems (name, description, calories, price, menu_categories_id)
VALUES ('${name}', '${description}', ${calories}, ${price}, ${menu_categories_id}) RETURNING * `)
		.then(result =>{
			res.status(200).send(result.rows);
		})
		.catch(e => console.error(e.stack));
});


app.patch('/menuItems/:id', (req, res)=> {
	var menuItems= req.body;
	var name= menuItems.name;
	var description= menuItems.description;
	var calories=parseInt(menuItems.calories);
	var price=parseInt(menuItems.price);
	var menu_categories_id= parseInt(menuItems.menu_categories_id); 
	let id = req.params.id;
	let query = 'UPDATE menuItems SET name=$1, description=$2, calories=$3, price=$4, menu_categories_id=$5 WHERE id=$6';
	let values = [name, description, calories, price, menu_categories_id, id];
	console.log(values);
          
	pool.query(query, values)
		.then((result) => {
			res.status(200).send(result.rows);
		})
		.catch((err) => console.error(err.stack));
});


app.delete('/menuItems/:id', (req, res) => {
	pool.query(`DELETE FROM menuItems WHERE id = ${req.params.id}`)
		.then(() => {
			console.log('hey there deleted');
			res.status(204).send('deleted');
		})
		.catch(e => console.error(e));
});


app.listen(port, () => {
	console.log(`listening on port ${port}`);
});