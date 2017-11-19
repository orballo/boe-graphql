const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const { getSumario } = require('./fetchs');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get('/api', async (req, res) => {
  const data = await getSumario({ date: 20171118 });
  res.json(data);
});

app.get('/', (req, res) => res.send('BOE GraphQL'));

app.listen(3000, () => {
  console.info('BOE GraphQL - Listening to http://localhost:3000/graphql');
});
