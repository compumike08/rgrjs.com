import express from 'express';
import Schema from '../data/schema';
import GraphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';

let app = express();

app.use(express.static('public'));

(async () => {
	let db = await MongoClient.connect(process.env.MONGO_URL);
	let schema = Schema(db);
	
	app.use('/graphql', GraphQLHTTP({
		schema,
		graphiql: true
	}));
	
	app.listen(3000, () => console.log('Listeing on port 3000'));
})();
