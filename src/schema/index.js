const { GraphQLSchema, GraphQLInt, GraphQLObjectType } = require('graphql');
const { SumarioType } = require('./sumario');
const { getSumario } = require('../fetchs');

const RootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    sumario: {
      type: SumarioType,
      args: {
        date: { type: GraphQLInt },
      },
      resolve: (_root, args) => getSumario(args),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootType,
});
