module.exports = {
	dev:{
		connectionString: 'postgresql://postgres:docker@127.0.0.1:5432/mvp',
		port: '8001'
	},
	production:{
		connectionString: process.env.POSTGRES_CONNECTION_STRING + '?ssl=true',
		port: process.env.PORT
	}
};
