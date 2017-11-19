const {
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
      type: GraphQLInt,
      resolve: pdf => pdf.$.szBytes,
    },
    sizeKBytes: {
      type: GraphQLInt,
      resolve: pdf => pdf.$.szKBytes,
    },
    pages: {
      type: GraphQLInt,
      resolve: pdf => pdf.$.numPag,
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: pdf => `https://boe.es${pdf._}`,
    },
  }),
});

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.$.id,
    },
    titulo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.titulo[0],
    },
    pdf: {
      type: PDFType,
      resolve: item => item.urlPdf[0],
    },
  }),
});

const EpigrafeType = new GraphQLObjectType({
  name: 'Epigrafe',
  fields: () => ({
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: epigrafe => epigrafe.$.nombre,
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve: epigrafe => epigrafe.item,
    },
  }),
});

const DepartamentoType = new GraphQLObjectType({
  name: 'Departamento',
  fields: () => ({
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: departamento => departamento.$.nombre,
    },
    epigrafes: {
      type: new GraphQLList(EpigrafeType),
      resolve: departamento => departamento.epigrafe,
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve: epigrafe => epigrafe.item,
    },
  }),
});

const SeccionType = new GraphQLObjectType({
  name: 'Seccion',
  fields: () => ({
    num: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: seccion => seccion.$.num,
    },
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: seccion => seccion.$.nombre,
    },
    departamentos: {
      type: new GraphQLList(DepartamentoType),
      resolve: seccion => seccion.departamento,
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
    secciones: {
      type: new GraphQLList(SeccionType),
      resolve: diario => diario.seccion,
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
    diarios: {
      type: new GraphQLList(DiarioType),
      resolve: sumario => sumario.diario,
    },
  }),
});

module.exports = { SumarioType };
