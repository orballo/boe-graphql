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
    pub: { type: new GraphQLNonNull(GraphQLString) },
    fecha: { type: new GraphQLNonNull(GraphQLString) },
    fechaAnt: { type: new GraphQLNonNull(GraphQLString) },
    fechaSig: { type: GraphQLString },
  }),
});

const DiarioType = new GraphQLObjectType({
  name: 'Diario',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    num: { type: new GraphQLNonNull(GraphQLInt) },
    pdf: { type: PDFType },
  }),
});

const PDFType = new GraphQLObjectType({
  name: 'PDF',
  fields: () => ({
    sizeBytes: new GraphQLNonNull(GraphQLInt),
    sizeKBytes: new GraphQLNonNull(GraphQLInt),
    url: new GraphQLNonNull(GraphQLString),
  }),
});

const SumarioType = new GraphQLObjectType({
  name: 'Sumario',
  fields: () => ({
    meta: { type: MetaType },
    diario: { type: new GraphQLList(DiarioType) },
  }),
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    sumarios: new GraphQLList(SumarioType),
  }),
});

module.exports = schema;
