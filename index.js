//Main starting point of the application
const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const { mongoDbUrl, mongoDbDatabaseName } = require('./config');

//DB setup
mongoose
	.connect(`${mongoDbUrl}/${mongoDbDatabaseName}`, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then((res) => {
		console.log('connected to db');
	})
	.catch((err) => {
		console.log('Error connecting to db');
	});

const app = express();

app.use(morgan('combined'));
app.use(express.json());

router(app);

//Server setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
	console.log('server running on : ' + port);
});
