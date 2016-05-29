import fs from 'fs';
import express from 'express';
import nconf from 'nconf';
import Schema from '../data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';

let app = express();

//*** BEGIN CONFIG SECTION ***
let configFilePath = "./config/configApp.json";
	
//The first config source below has highest priority, with each successive one having lower priority.
nconf.file('custom', configFilePath);
nconf.argv(); //Arguments passed when application started
nconf.env(); //Enviornment variables

//*** END CONFIG SECTION ***

app.use(express.static('public'));

(async () => {
	try {
		let dbConnectUrl = nconf.get("MONGO_URL");
		let db = await MongoClient.connect(dbConnectUrl);
		let schema = Schema(db);
		
		app.use('/graphql', GraphQLHTTP({
			schema,
			graphiql: true
		}));
		
		app.listen(3000, () => console.log('Listeing on port 3000'));
		
		let json = await graphql(schema, introspectionQuery);
		fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
			if (err) throw err;
			
			console.log("JSON schema created");
		});
	}catch(e){
		console.log(e);
	}
})();
