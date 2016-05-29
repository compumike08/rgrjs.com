import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

import {
	globalIdField,
	connectionDefinitions,
	connectionArgs,
	connectionFromPromisedArray,
	mutationWithClientMutationId
} from "graphql-relay";

let Schema = (db) => {
	let store = {};
	
	let storeType = new GraphQLObjectType({
		name: 'Store',
		fields: () => ({
			id: globalIdField("Store"),
			linkConnection: {
				type: linkConnection.connectionType,
				args: {
					...connectionArgs,
					query: { type: GraphQLString }
				},
				resolve: (_, args) => {
					let findParams = {};
					if(args.query){
						findParams.title = new RegExp(args.query, 'i');
					}
					return connectionFromPromisedArray(
						db.collection("links")
							.find(findParams)
							.sort({createdAt: -1})
							.limit(args.first).toArray(),
						args
					);
				}
			}
		})
	});
	
	let linkType = new GraphQLObjectType({
		name: 'Link',
		fields: () => ({
			id: {
				type: new GraphQLNonNull(GraphQLID),
				resolve: (obj) => obj._id
			},
			title: { type: GraphQLString},
			url: { type: GraphQLString},
			createdAt: {
				type: GraphQLString,
				resolve: (obj) => new Date(obj.createdAt).toISOString()
			}
		})
	});
	
	let linkConnection = connectionDefinitions({
		name: 'Link',
		nodeType: linkType
	});
	
	let createLinkMutation = mutationWithClientMutationId({
		name: 'CreateLink',
		
		inputFields: {
			title: { type: new GraphQLNonNull(GraphQLString) },
			url: { type: new GraphQLNonNull(GraphQLString) }
		},
		
		outputFields: {
			linkEdge: {
				type: linkConnection.edgeType,
				resolve: (obj) => ({node: obj.ops[0], cursor: obj.insertedId})
			},
			store: {
				type: storeType,
				resolve: () => store
			}
		},
		
		mutateAndGetPayload: ({title, url}) => {
			return db.collection("links").insertOne({
				title,
				url,
				createdAt: Date.now()
			});
		}
	});

	let schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: () => ({
				store: {
					type: storeType,
					resolve: () => store
				}
			})
		}),
		
		mutation: new GraphQLObjectType({
			name: 'Mutation',
			fields: () => ({
				createLink: createLinkMutation
			})
		})
	});
	
	return schema;

}

export default Schema;
