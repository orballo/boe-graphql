const { buildSchema } = require('graphql');

const schema = buildSchema(/* GraphQL */ `
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => 'Hello World!',
};

module.exports = { schema, rootValue };
