const { GraphQLSchema, GraphQLInt, GraphQLObjectType } = require('graphql');
const { Sumario } = require('./sumario');
const { getSumario } = require('../fetchs');

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    sumario: {
      type: Sumario,
      args: {
        date: { type: GraphQLInt },
      },
      resolve: (_root, args) => getSumario(args),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: Root,
});
