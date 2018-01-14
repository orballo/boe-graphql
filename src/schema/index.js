const { GraphQLSchema } = require('graphql');
const Root = require('./Root');

module.exports = new GraphQLSchema({
  query: Root,
});
