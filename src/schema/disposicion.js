const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql');
const getUrl = require('../utils/getUrl');

const Rango = new GraphQLObjectType({
  name: 'Rango',
  fields: {
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: rango => rango.nombre,
    },
    codigo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: rango => rango.codigo,
    },
  },
});

const DepartamentoDisposicion = new GraphQLObjectType({
  name: 'DepartamentoDisposicion',
  fields: {
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: departamento => departamento.nombre,
    },
    codigo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: departamento => departamento.codigo,
    },
  },
});

const Publicacion = new GraphQLObjectType({
  name: 'Publicacion',
  fields: {
    codigo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: publicacion => publicacion.codigo,
    },
    diario: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: publicacion => publicacion.diario,
    },
    seccion: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: publicacion => publicacion.seccion,
    },
    subseccion: {
      type: GraphQLString,
      resolve: publicacion => publicacion.subseccion || null,
    },
    departamento: {
      type: new GraphQLNonNull(DepartamentoDisposicion),
      resolve: publicacion => publicacion.departamento,
    },
    rango: {
      type: new GraphQLNonNull(Rango),
      resolve: publicacion => publicacion.rango,
    },
  },
});

const Fecha = new GraphQLObjectType({
  name: 'Fecha',
  fields: {
    disposicion: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: fecha => fecha.disposicion,
    },
    publicacion: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: fecha => fecha.publicacion,
    },
    vigencia: {
      type: GraphQLString,
      resolve: fecha => fecha.vigencia || null,
    },
    derogacion: {
      type: GraphQLString,
      resolve: fecha => fecha.derogacion || null,
    },
    actualizacion: {
      type: GraphQLString,
      resolve: fecha => fecha.actualizacion || null,
    },
  },
});

const OrigenLegislativo = new GraphQLObjectType({
  name: 'OrigenLegislativo',
  fields: {
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: origenLegislativo => origenLegislativo.nombre,
    },
    codigo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: origenLegislativo => origenLegislativo.codigo,
    },
  },
});

const EstadoConsolidacion = new GraphQLObjectType({
  name: 'EstadoConsolidacion',
  fields: {
    nombre: {
      type: GraphQLString,
      resolve: estadoConsolidacion => estadoConsolidacion.nombre || null,
    },
    codigo: {
      type: GraphQLString,
      resolve: estadoConsolidacion => estadoConsolidacion.codigo || null,
    },
  },
});

const MetaDisposicion = new GraphQLObjectType({
  name: 'MetaDisposicion',
  fields: {
    publicacion: {
      type: new GraphQLNonNull(Publicacion),
      resolve: meta => meta.publicacion,
    },
    fecha: {
      type: new GraphQLNonNull(Fecha),
      resolve: meta => meta.fecha,
    },
    estatusLegislativo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.estatusLegislativo,
    },
    origenLegislativo: {
      type: new GraphQLNonNull(OrigenLegislativo),
      resolve: meta => meta.origenLegislativo,
    },
    estadoConsolidacion: {
      type: new GraphQLNonNull(EstadoConsolidacion),
      resolve: meta => meta.estadoConsolidacion,
    },
    judicialmenteAnulada: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.judicialmenteAnulada,
    },
    vigenciaAgotada: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.vigenciaAgotada,
    },
    estatusDerogacion: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: meta => meta.estatusDerogacion,
    },
  },
});

const PDFDisposicion = new GraphQLObjectType({
  name: 'PDFDisposicion',
  fields: {
    espanol: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: pdf => pdf.espanol,
    },
    catalan: {
      type: GraphQLString,
      resolve: pdf => pdf.catalan || null,
    },
    gallego: {
      type: GraphQLString,
      resolve: pdf => pdf.gallego || null,
    },
    euskera: {
      type: GraphQLString,
      resolve: pdf => pdf.euskera || null,
    },
    valenciano: {
      type: GraphQLString,
      resolve: pdf => pdf.valenciano || null,
    },
  },
});

const Disposicion = new GraphQLObjectType({
  name: 'Disposicion',
  fields: {
    meta: {
      type: new GraphQLNonNull(MetaDisposicion),
      resolve: documento => ({
        publicacion: {
          codigo: documento.metadatos[0].diario[0].$.codigo,
          diario: documento.metadatos[0].diario_numero[0],
          seccion: documento.metadatos[0].seccion[0],
          subseccion: documento.metadatos[0].subseccion[0],
          departamento: {
            nombre: documento.metadatos[0].departamento[0]._,
            codigo: documento.metadatos[0].departamento[0].$.codigo,
          },
          rango: {
            nombre: documento.metadatos[0].rango[0]._,
            codigo: documento.metadatos[0].rango[0].$.codigo,
          },
        },
        fecha: {
          disposicion: documento.metadatos[0].fecha_disposicion[0],
          publicacion: documento.metadatos[0].fecha_publicacion[0],
          vigencia: documento.metadatos[0].fecha_vigencia[0],
          derogacion: documento.metadatos[0].fecha_derogacion[0],
          actualizacion: documento.$.fecha_actualizacion,
        },
        estatusLegislativo: documento.metadatos[0].estatus_legislativo[0],
        origenLegislativo: {
          nombre: documento.metadatos[0].origen_legislativo[0]._,
          codigo: documento.metadatos[0].origen_legislativo[0].$.codigo,
        },
        estadoConsolidacion: {
          nombre: documento.metadatos[0].estado_consolidacion[0]._,
          codigo: documento.metadatos[0].estado_consolidacion[0].$.codigo,
        },
        judicialmenteAnulada: documento.metadatos[0].judicialmente_anulada[0],
        vigenciaAgotada: documento.metadatos[0].vigencia_agotada[0],
        estatusDerogacion: documento.metadatos[0].estatus_derogacion[0],
      }),
    },
    // analisis: {
    //   type: new GraphQLNonNull(Analisis),
    //   resolve: documento => documento.analisis,
    // },
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: documento => documento.metadatos[0].identificador[0],
    },
    titulo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: documento => documento.metadatos[0].titulo[0],
    },
    epub: {
      type: GraphQLString,
      resolve: documento => getUrl(documento.metadatos[0].url_epub[0]) || null,
    },
    pdf: {
      type: new GraphQLNonNull(PDFDisposicion),
      resolve: documento => ({
        espanol: getUrl(documento.metadatos[0].url_pdf[0]),
        catalan: getUrl(documento.metadatos[0].url_pdf_catalan[0]),
        gallego: getUrl(documento.metadatos[0].url_pdf_gallego[0]),
        euskera: getUrl(documento.metadatos[0].url_pdf_euskera[0]),
        valenciano: getUrl(documento.metadatos[0].url_pdf_valenciano[0]),
      }),
    },
  },
});

module.exports = Disposicion;
