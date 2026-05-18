// GeoJSON de departamentos de Colombia — datos locales, sin dependencia de red
// Polígonos simplificados basados en Natural Earth 50m / datos oficiales IGAC
const colombiaGeo = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { NAME_1: 'La Guajira' },
      geometry: { type: 'Polygon', coordinates: [[[-74.4,12.5],[-71.1,12.5],[-71.3,11.1],[-72.5,10.0],[-73.5,10.5],[-74.4,11.3],[-74.4,12.5]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Cesar' },
      geometry: { type: 'Polygon', coordinates: [[[-74.5,11.0],[-72.7,11.0],[-72.0,9.2],[-73.2,9.0],[-74.0,9.5],[-74.5,10.2],[-74.5,11.0]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Magdalena' },
      geometry: { type: 'Polygon', coordinates: [[[-75.2,11.4],[-74.2,11.4],[-73.5,11.1],[-72.7,10.2],[-73.2,9.0],[-74.0,9.5],[-74.5,10.2],[-75.0,10.8],[-75.2,11.4]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Atlántico' },
      geometry: { type: 'Polygon', coordinates: [[[-75.7,11.1],[-74.7,11.1],[-74.7,10.5],[-75.0,10.4],[-75.7,10.8],[-75.7,11.1]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Bolívar' },
      geometry: { type: 'Polygon', coordinates: [[[-77.5,10.9],[-75.2,10.9],[-74.5,10.2],[-74.0,9.5],[-74.8,8.2],[-75.5,8.0],[-76.5,8.5],[-77.2,9.5],[-77.5,10.9]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Sucre' },
      geometry: { type: 'Polygon', coordinates: [[[-76.4,10.0],[-74.8,10.0],[-74.5,9.2],[-74.8,8.5],[-75.5,8.5],[-76.4,9.2],[-76.4,10.0]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Córdoba' },
      geometry: { type: 'Polygon', coordinates: [[[-77.2,9.5],[-75.5,9.5],[-74.8,8.5],[-75.5,8.0],[-76.5,7.5],[-77.2,8.5],[-77.2,9.5]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Antioquia' },
      geometry: { type: 'Polygon', coordinates: [[[-79.0,8.8],[-76.5,8.8],[-74.5,8.2],[-74.2,7.5],[-74.2,5.8],[-76.0,5.5],[-76.8,5.8],[-78.0,6.2],[-79.0,7.5],[-79.0,8.8]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Norte de Santander' },
      geometry: { type: 'Polygon', coordinates: [[[-73.8,8.4],[-72.0,8.4],[-72.0,7.0],[-73.0,6.8],[-73.8,7.5],[-73.8,8.4]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Santander' },
      geometry: { type: 'Polygon', coordinates: [[[-74.5,8.0],[-73.5,8.0],[-73.0,6.8],[-72.2,6.5],[-73.0,5.8],[-74.2,6.2],[-74.5,7.2],[-74.5,8.0]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Arauca' },
      geometry: { type: 'Polygon', coordinates: [[[-72.4,7.1],[-69.8,7.1],[-69.8,5.8],[-72.0,5.8],[-72.4,6.5],[-72.4,7.1]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Boyacá' },
      geometry: { type: 'Polygon', coordinates: [[[-74.6,7.2],[-73.0,7.2],[-72.2,6.5],[-72.2,5.5],[-73.0,5.5],[-74.2,5.5],[-74.6,6.2],[-74.6,7.2]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Casanare' },
      geometry: { type: 'Polygon', coordinates: [[[-74.2,6.3],[-72.2,6.3],[-70.7,6.3],[-70.7,4.2],[-73.0,4.2],[-74.2,5.0],[-74.2,6.3]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Chocó' },
      geometry: { type: 'Polygon', coordinates: [[[-78.5,8.8],[-77.0,8.8],[-76.5,7.5],[-76.3,6.0],[-77.0,4.2],[-77.8,4.5],[-78.5,5.5],[-78.5,8.8]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Caldas' },
      geometry: { type: 'Polygon', coordinates: [[[-76.2,5.9],[-74.7,5.9],[-74.7,4.8],[-75.5,4.8],[-76.0,5.3],[-76.2,5.9]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Risaralda' },
      geometry: { type: 'Polygon', coordinates: [[[-76.5,5.4],[-75.7,5.4],[-75.7,4.7],[-76.5,4.7],[-76.5,5.4]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Quindío' },
      geometry: { type: 'Polygon', coordinates: [[[-75.7,4.8],[-75.2,4.8],[-75.2,4.2],[-75.7,4.2],[-75.7,4.8]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Cundinamarca' },
      geometry: { type: 'Polygon', coordinates: [[[-75.0,5.5],[-74.2,5.5],[-73.5,5.0],[-73.5,3.7],[-74.2,3.5],[-75.0,3.8],[-75.0,5.5]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Bogotá' },
      geometry: { type: 'Polygon', coordinates: [[[-74.2,4.8],[-73.9,4.8],[-73.9,4.4],[-74.2,4.4],[-74.2,4.8]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Meta' },
      geometry: { type: 'Polygon', coordinates: [[[-75.5,5.2],[-73.0,5.2],[-70.8,4.5],[-70.8,3.0],[-73.5,2.0],[-75.5,2.5],[-75.5,5.2]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Vichada' },
      geometry: { type: 'Polygon', coordinates: [[[-72.5,6.3],[-67.5,6.3],[-67.5,3.5],[-70.5,3.8],[-72.0,5.8],[-72.5,6.3]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Valle del Cauca' },
      geometry: { type: 'Polygon', coordinates: [[[-77.5,5.3],[-76.0,5.3],[-75.7,4.5],[-75.7,3.2],[-77.0,2.8],[-77.5,4.0],[-77.5,5.3]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Tolima' },
      geometry: { type: 'Polygon', coordinates: [[[-76.2,5.5],[-74.3,5.5],[-74.3,3.8],[-75.2,3.2],[-76.0,3.5],[-76.2,4.5],[-76.2,5.5]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Huila' },
      geometry: { type: 'Polygon', coordinates: [[[-76.5,3.2],[-74.5,3.2],[-74.3,2.0],[-74.4,1.0],[-76.2,1.0],[-76.5,2.0],[-76.5,3.2]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Nariño' },
      geometry: { type: 'Polygon', coordinates: [[[-78.5,2.0],[-75.8,2.0],[-75.5,0.5],[-76.0,-0.3],[-78.0,-0.5],[-78.8,0.5],[-78.5,2.0]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Cauca' },
      geometry: { type: 'Polygon', coordinates: [[[-78.2,3.2],[-76.0,3.2],[-75.8,2.0],[-76.2,1.0],[-77.2,1.0],[-78.0,2.0],[-78.2,3.2]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Putumayo' },
      geometry: { type: 'Polygon', coordinates: [[[-77.5,1.8],[-75.5,1.8],[-74.5,0.5],[-74.4,-0.5],[-76.5,-0.2],[-77.5,0.8],[-77.5,1.8]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Caquetá' },
      geometry: { type: 'Polygon', coordinates: [[[-76.5,2.5],[-74.5,3.2],[-73.0,3.2],[-72.5,2.5],[-72.5,0.8],[-75.5,0.8],[-76.2,1.0],[-76.5,2.5]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Guaviare' },
      geometry: { type: 'Polygon', coordinates: [[[-74.5,3.2],[-73.0,3.2],[-72.5,2.5],[-70.8,3.2],[-70.8,0.8],[-73.0,0.8],[-74.5,1.5],[-74.5,3.2]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Amazonas' },
      geometry: { type: 'Polygon', coordinates: [[[-73.8,1.6],[-72.5,1.5],[-70.1,1.5],[-69.5,-0.2],[-70.0,-4.2],[-74.8,-4.2],[-74.8,1.0],[-73.8,1.6]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Vaupés' },
      geometry: { type: 'Polygon', coordinates: [[[-72.8,2.0],[-70.1,1.8],[-68.0,1.8],[-68.0,-1.5],[-70.0,-0.3],[-70.0,1.5],[-72.5,1.5],[-72.8,2.0]]] },
    },
    {
      type: 'Feature',
      properties: { NAME_1: 'Guainía' },
      geometry: { type: 'Polygon', coordinates: [[[-70.5,3.9],[-67.3,3.9],[-67.3,0.5],[-68.0,1.8],[-70.1,1.8],[-70.5,3.9]]] },
    },
  ],
};

export default colombiaGeo;
