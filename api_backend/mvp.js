const express = require('express');
const {Pool} = require('pg');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const config=require('./config')[process.env.NODE_ENV||'dev'];
const PORT = config.port;
// const PORT = 8001;
const pool= new Pool({
	connectionString: config.connectionString
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
app.patch('/menuItems', (req, res) => {
	// console.log(req.body);
	var menuItems= req.body;
	var name= menuItems.name;
	var description= menuItems.description;
	var calories= (menuItems.calories);
	var price= (menuItems.price);
	var menu_categories_id= menuItems.menu_categories_id; 
	// console.log(menu_categories_id);
	pool.query(`UPDATE menuItems SET name='${name}',description='${description}', calories=${calories}, price=${price}, menu_categories_id=${menu_categories_id} WHERE name='${name}'`)
		.then(result =>{
			res.status(200).send(result.rows);
		})
		.catch(e => console.error(e.stack));
});



app.delete('/menuItems/:id', (req, res) => {
	pool.query(`DELETE FROM menuItems WHERE id = ${req.params.id}`)
		.then(() => {
			console.log('hey there deleted');
			res.status(204).send('deleted');
		})
		.catch(e => console.error(e));
});


app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});