import  { Component } from 'react';
import ymaps from 'ymaps';
import Placemark from './Placemark';

class Maps extends Component{
  constructor(props){
    super(props);
    this.api = ymaps.load();
    this.api.then(api=>{
      this.map = new api.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
      });
      this.setState({});
    });
  }
  render(){
    this.api.then(api=>{
      while(this.props.toAdd.length){
        this.props.onNewMapPoint(new Placemark(api,this.map,this.map.getCenter(),this.props.toAdd.pop(),this.props.onMove));
      }
      if(this.line) this.line.setParent(null);
      this.line = new api.Polyline(this.props.points.map((point)=>{
        return point.cords;
      }),{},{
        strokeColor: "#1e98ff",
        strokeWidth: 4,
        strokeOpacity: 1
      });
      this.map.geoObjects.add(this.line);
    });

    return('');
  }
}

export default Maps;