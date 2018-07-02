class Placemark{
  constructor(api,map,cords,name,onMove){
    this.name = name;
    this.cords = cords;
    this.address = api.geocode(cords);
    this.placemark = new api.Placemark(cords, {},{
      draggable: true,
      preset: 'islands#circleIcon'
    });
    map.geoObjects.add(this.placemark);
    this.placemark.events.add('click',(e)=>{
      this.address.then(res=>{
        map.balloon.open(this.cords, {
          contentHeader: name,
          contentBody: `<h6>${res.geoObjects.get(0).properties.get('name')}</h6>${res.geoObjects.get(0).properties.get('description')}`
        });
      });
    });
    this.placemark.events.add('drag',(e)=>{
      this.cords = this.placemark.geometry.getCoordinates();
      onMove();
    });
    this.placemark.events.add('dragend',(e)=>{
      this.address = api.geocode(this.cords);
    });
  }

  remove(){
    this.placemark.setParent(null);
  }
}

export default Placemark;