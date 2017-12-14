const { GraphQLSchema, GraphQLString, GraphQLObjectType } = require("graphql");
const { getSumario, getDisposicion } = require("../fetchs");
const Sumario = require("./sumario");
const Disposicion = require("./disposicion");

const Root = new GraphQLObjectType({
  name: "Root",
  fields: () => ({
    sumario: {
      type: Sumario,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_root, args) => await getSumario(args),
    },
    disposicion: {
      type: Disposicion,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_root, args) => await getDisposicion(args),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: Root,
});
