const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql');

const Meta = new GraphQLObjectType({
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

const PDF = new GraphQLObjectType({
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

const Item = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.$.id,
    },
    epigrafe: {
      type: GraphQLString,
      resolve: item => item.epigrafe,
    },
    titulo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.titulo[0],
    },
    pdf: {
      type: new GraphQLNonNull(PDF),
      resolve: item => item.urlPdf[0],
    },
  }),
});

const Departamento = new GraphQLObjectType({
  name: 'Departamento',
  fields: () => ({
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: departamento => departamento.$.nombre,
    },
    items: {
      type: new GraphQLList(Item),
      // If item does not exist maps item from each epigrafe.
      resolve: departamento =>
        departamento.item ||
        departamento.epigrafe.reduce((result, epigrafe) => {
          return result.concat(
            epigrafe.item.map(item => {
              item.epigrafe = epigrafe.$.nombre;
              return item;
            })
          );
        }, []),
    },
  }),
});

const Seccion = new GraphQLObjectType({
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
      type: new GraphQLList(Departamento),
      resolve: seccion => seccion.departamento,
    },
  }),
});

const Diario = new GraphQLObjectType({
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
      type: PDF,
      resolve: diario => diario.sumario_nbo[0].urlPdf[0],
    },
    secciones: {
      type: new GraphQLList(Seccion),
      resolve: diario => diario.seccion,
    },
  }),
});

const Sumario = new GraphQLObjectType({
  name: 'Sumario',
  fields: () => ({
    meta: {
      type: new GraphQLNonNull(Meta),
      resolve: sumario => sumario.meta[0],
    },
    diarios: {
      type: new GraphQLNonNull(new GraphQLList(Diario)),
      resolve: sumario => sumario.diario,
    },
  }),
});

module.exports = { Sumario };
