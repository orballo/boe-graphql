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

const Nota = new GraphQLObjectType({
  name: 'Nota',
  fields: {
    texto: {
      type: GraphQLString,
      resolve: nota => nota.texto || null,
    },
    codigo: {
      type: GraphQLString,
      resolve: nota => nota.codigo || null,
    },
    orden: {
      type: GraphQLString,
      resolve: nota => nota.orden || null,
    },
  },
});

const Materia = new GraphQLObjectType({
  name: 'Materia',
  fields: {
    nombre: {
      type: GraphQLString,
      resolve: materia => materia.nombre || null,
    },
    codigo: {
      type: GraphQLString,
      resolve: materia => materia.codigo || null,
    },
    orden: {
      type: GraphQLString,
      resolve: materia => materia.orden || null,
    },
  },
});

const Alerta = new GraphQLObjectType({
  name: 'Alerta',
  fields: {
    nombre: {
      type: GraphQLString,
      resolve: alerta => alerta.nombre || null,
    },
    codigo: {
      type: GraphQLString,
      resolve: alerta => alerta.codigo || null,
    },
    orden: {
      type: GraphQLString,
      resolve: alerta => alerta.orden || null,
    },
  },
});

const ReferenciaAnterior = new GraphQLObjectType({
  name: 'ReferenciaAnterior',
  fields: {
    referencia: {
      type: GraphQLString,
      resolve: referencia => referencia.referencia || null,
    },
    orden: {
      type: GraphQLString,
      resolve: referencia => referencia.orden || null,
    },
    tipo: {
      type: GraphQLString,
      resolve: referencia => referencia.tipo || null,
    },
    codigo: {
      type: GraphQLString,
      resolve: referencia => referencia.codigo || null,
    },
    texto: {
      type: GraphQLString,
      resolve: referencia => referencia.texto || null,
    },
  },
});

const ReferenciaPosterior = new GraphQLObjectType({
  name: 'ReferenciaPosterior',
  fields: {
    referencia: {
      type: GraphQLString,
      resolve: referencia => referencia.referencia || null,
    },
    orden: {
      type: GraphQLString,
      resolve: referencia => referencia.orden || null,
    },
    tipo: {
      type: GraphQLString,
      resolve: referencia => referencia.tipo || null,
    },
    codigo: {
      type: GraphQLString,
      resolve: referencia => referencia.codigo || null,
    },
    texto: {
      type: GraphQLString,
      resolve: referencia => referencia.texto || null,
    },
  },
});

const Referencias = new GraphQLObjectType({
  name: 'Referencias',
  fields: {
    anteriores: {
      type: new GraphQLList(ReferenciaAnterior),
      resolve: referencias =>
        referencias.anteriores.some(referencia => referencia)
          ? referencias.anteriores
          : null,
    },
    posteriores: {
      type: new GraphQLList(ReferenciaPosterior),
      resolve: referencias =>
        referencias.posteriores.some(referencia => referencia)
          ? referencias.posteriores
          : null,
    },
  },
});

const Analisis = new GraphQLObjectType({
  name: 'Analisis',
  fields: {
    notas: {
      type: new GraphQLList(Nota),
      resolve: analisis =>
        analisis.notas.reduce(
          (result, current) =>
            result.concat(
              current.nota.map(nota => ({
                texto: nota._,
                codigo: nota.$.codigo,
                orden: nota.$.orden,
              }))
            ),
          []
        ),
    },
    materias: {
      type: new GraphQLList(Materia),
      resolve: analisis =>
        analisis.materias.reduce(
          (result, current) =>
            result.concat(
              current.materia.map(materia => ({
                nombre: materia._,
                codigo: materia.$.codigo,
                orden: materia.$.orden,
              }))
            ),
          []
        ),
    },
    alertas: {
      type: new GraphQLList(Alerta),
      resolve: analisis =>
        analisis.alertas.some(alerta => alerta)
          ? analisis.alertas.reduce(
              (result, current) =>
                result.concat(
                  current.alerta.map(alerta => ({
                    nombre: alerta._,
                    codigo: alerta.$.codigo,
                    orden: alerta.$.orden,
                  }))
                ),
              []
            )
          : null,
    },
    referencias: {
      type: Referencias,
      resolve: analisis =>
        analisis.referencias.reduce(
          (result, current) => ({
            anteriores: result.anteriores.concat(
              current.anteriores.reduce(
                (result, current) =>
                  current.anterior &&
                  result.concat(
                    current.anterior.map(anterior => ({
                      referencia: anterior.$.referencia,
                      orden: anterior.$.orden,
                      tipo: anterior.palabra[0]._,
                      codigo: anterior.palabra[0].$.codigo,
                      texto: anterior.texto[0],
                    }))
                  ),
                []
              )
            ),
            posteriores: result.posteriores.concat(
              current.posteriores.reduce(
                (result, current) =>
                  current.posterior &&
                  result.concat(
                    current.posterior.map(posterior => ({
                      referencia: posterior.$.referencia,
                      orden: posterior.$.orden,
                      tipo: posterior.palabra[0]._,
                      codigo: posterior.palabra[0].$.codigo,
                      texto: posterior.texto[0],
                    }))
                  ),
                []
              )
            ),
          }),
          { anteriores: [], posteriores: [] }
        ),
    },
  },
});

const Articulo = new GraphQLObjectType({
  name: 'Articulo',
  fields: {
    numero: {
      type: GraphQLString,
      resolve: articulo => articulo.numero && articulo.numero[0],
    },
    texto: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: articulo => articulo.texto,
    },
  },
});

const Contenido = new GraphQLObjectType({
  name: 'Contenido',
  fields: {
    texto: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: contenido => contenido.texto,
    },
    articulos: {
      type: new GraphQLList(Articulo),
      resolve: contenido => contenido.articulos,
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
    analisis: {
      type: new GraphQLNonNull(Analisis),
      resolve: documento => documento.analisis[0],
    },
    contenido: {
      type: new GraphQLNonNull(Contenido),
      resolve: documento => ({
        texto: documento.texto[0].p.map(p => p._),
        articulos: documento.texto[0].p
          .filter(p => p.$.class === 'articulo')
          .map(p => ({
            numero: p._.match(/\d+/),
            texto: p._,
          })),
      }),
    },
  },
});

module.exports = Disposicion;
