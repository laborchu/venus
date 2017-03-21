import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');
let env = require("./env.json");
class Mongodb{

	connect() {
		this.connectDB()
			.on('error', console.log)
			// .on('disconnected', this.connectDB)
			.once('open', () => this.initModels());
	}

	connectDB() {
		const options = { server: { socketOptions: { keepAlive: 1 } } };
		var uri = `mongodb://${env.mongodb.host}:${env.mongodb.port}/mv`;
		let connection:mongoose.Connection = mongoose.connect(uri, options).connection;
		autoIncrement.initialize(connection);
		return connection;
	}
	initModels() {
		const fs = require('fs');
		const join = require('path').join;
		const models = join(__dirname, 'models');
		fs.readdirSync(models)
			.filter((file:any) => ~file.search(/^[^\.].*\.js$/))
			.forEach((file: any) => require(join(models, file)));
	}
}
export default Mongodb