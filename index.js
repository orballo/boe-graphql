const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(/* GraphQL */ `
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello World!',
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get('/', (req, res) => res.send('GraphQL API for BOE'));

app.listen(3000, () => {
  console.info('BOE GraphQL - Listening to http://localhost:3000/graphql');
});
