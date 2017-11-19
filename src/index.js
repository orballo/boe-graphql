const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.get('/', (req, res) => res.send('BOE GraphQL'));

app.listen(3000, () => {
  console.info('BOE GraphQL - Listening to http://localhost:3000/graphql');
});
