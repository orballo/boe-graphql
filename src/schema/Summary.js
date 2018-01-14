const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql');
const getUrl = require('../utils/getUrl');

const MetaSummary = new GraphQLObjectType({
  name: 'MetaSummary',
  fields: {
    publicacion: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.pub[0],
    },
    fecha: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.fecha[0],
    },
    fechaAnterior: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.fechaAnt[0],
    },
    fechaSiguiente: {
      type: GraphQLString,
      resolve: meta => meta.fechaSig[0] || null,
    },
  },
});

const PDFSummary = new GraphQLObjectType({
  name: 'PDFSummary',
  fields: {
    sizeBytes: {
      type: GraphQLInt,
      resolve: pdf => pdf.$.szBytes || null,
    },
    sizeKBytes: {
      type: GraphQLInt,
      resolve: pdf => pdf.$.szKBytes || null,
    },
    pages: {
      type: GraphQLInt,
      resolve: pdf => pdf.$.numPag || null,
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: pdf => getUrl(pdf._) || null,
    },
  },
});

const Item = new GraphQLObjectType({
  name: 'Item',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.$.id,
    },
    epigrafe: {
      type: GraphQLString,
      resolve: item => item.epigrafe || null,
    },
    titulo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.titulo[0],
    },
    pdf: {
      type: new GraphQLNonNull(PDFSummary),
      resolve: item => item.urlPdf[0],
    },
  },
});

const Departamento = new GraphQLObjectType({
  name: 'Departamento',
  fields: {
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
            }),
          );
        }, []),
    },
  },
});

const Seccion = new GraphQLObjectType({
  name: 'Seccion',
  fields: {
    num: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: seccion => seccion.$.num,
    },
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: seccion => seccion.$.nombre,
    },
    departamentos: {
      type: new GraphQLNonNull(new GraphQLList(Departamento)),
      resolve: seccion => seccion.departamento,
    },
  },
});

const Diario = new GraphQLObjectType({
  name: 'Diario',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: diario => diario.sumario_nbo[0].$.id,
    },
    num: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: diario => diario.$.nbo,
    },
    pdf: {
      type: new GraphQLNonNull(PDFSummary),
      resolve: diario => diario.sumario_nbo[0].urlPdf[0],
    },
    secciones: {
      type: new GraphQLNonNull(new GraphQLList(Seccion)),
      resolve: diario => diario.seccion,
    },
  },
});

const Summary = new GraphQLObjectType({
  name: 'Summary',
  fields: {
    meta: {
      type: new GraphQLNonNull(MetaSummary),
      resolve: sumario => sumario.meta[0],
    },
    diarios: {
      type: new GraphQLNonNull(new GraphQLList(Diario)),
      resolve: sumario => sumario.diario,
    },
  },
});

module.exports = Summary;
