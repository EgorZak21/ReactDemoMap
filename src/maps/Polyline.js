export  default  function(ymaps,points,line){
  if(!ymaps) return;
  let newLine = new ymaps.api.Polyline(points.map((point)=>{
    return point.cords;
  }),{},{
    strokeColor: "#1e98ff",
    strokeWidth: 4,
    strokeOpacity: 1
  });
  if(line) line.setParent(null);
  ymaps.map.geoObjects.add(newLine);
  return newLine;
}