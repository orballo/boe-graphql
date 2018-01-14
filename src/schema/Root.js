const { GraphQLString, GraphQLObjectType } = require('graphql');
const { getSummary, getRegulation } = require('../fetchs');
const Summary = require('./Summary');
const Regulation = require('./Regulation');

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    summary: {
      type: Summary,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_root, args) => getSummary(args),
    },
    regulation: {
      type: Regulation,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_root, args) => getRegulation(args),
    },
  },
});

module.exports = Root;
