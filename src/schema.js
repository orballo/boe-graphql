const { getSumario } = require('./fetchs');
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql');

const MetaType = new GraphQLObjectType({
  name: 'Meta',
  fields: () => ({
    pub: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.pub[0],
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.fecha[0],
    },
    previousDate: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.fechaAnt[0],
    },
    nextDate: {
      type: GraphQLString,
      resolve: meta => meta.fechaSig[0],
    },
  }),
});

const PDFType = new GraphQLObjectType({
  name: 'PDF',
  fields: () => ({
    sizeBytes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: pdf => pdf.$.szBytes,
    },
    sizeKBytes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: pdf => pdf.$.szKBytes,
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: pdf => `https://boe.es${pdf._}`,
    },
  }),
});

const DiarioType = new GraphQLObjectType({
  name: 'Diario',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: diario => diario.sumario_nbo[0].$.id,
    },
    num: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: diario => diario.$.nbo,
    },
    pdf: {
      type: PDFType,
      resolve: diario => diario.sumario_nbo[0].urlPdf[0],
    },
  }),
});

const SumarioType = new GraphQLObjectType({
  name: 'Sumario',
  fields: () => ({
    meta: {
      type: MetaType,
      resolve: sumario => sumario.meta[0],
    },
    diario: {
      type: new GraphQLList(DiarioType),
      resolve: sumario => sumario.diario,
    },
  }),
});

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

const Schema = new GraphQLSchema({
  query: RootType,
});

module.exports = Schema;
