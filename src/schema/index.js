const { GraphQLSchema, GraphQLString, GraphQLObjectType } = require('graphql');
const { Sumario } = require('./sumario');
const { getSumario } = require('../fetchs');

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    sumario: {
      type: Sumario,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_root, args) => getSumario(args),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: Root,
});
