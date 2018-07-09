class Placemark{
  constructor(ymaps,name,onMove){
    this.name  = name;
    if(!ymaps) return;
    this.cords = ymaps.map.getCenter();
    this.address = ymaps.api.geocode(this.cords);
    this.placemark = new ymaps.api.Placemark(this.cords, {},{
      draggable: true,
      preset: 'islands#circleIcon'
    });

    ymaps.map.geoObjects.add(this.placemark);
    this.placemark.events.add('click',() =>
      this.address.then(res=>
        ymaps.map.balloon.open(this.cords, {
          contentHeader: name,
          contentBody: `<h6>${res.geoObjects.get(0).properties.get('name')}</h6>${res.geoObjects.get(0).properties.get('description')}`
        })
      )
    );

    this.placemark.events.add('drag',() =>{
      this.cords = this.placemark.geometry.getCoordinates();
      onMove();
    });

    this.placemark.events.add('dragend',() => this.address = ymaps.api.geocode(this.cords));
  }

  remove(){
    if(this.placemark)
      this.placemark.setParent(null);
  }
}

export default Placemark;
