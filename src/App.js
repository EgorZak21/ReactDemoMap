import React, { Component } from 'react';
import AddressInput from './components/AddressInput';
import Message from './components/Message';
import ListPoint from './components/ListPoint';
import {arrayMove} from 'react-sortable-hoc';
import maps from './maps/Map'
import Placemark from './maps/Placemark'
import polyline from './maps/Polyline'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      points: []
    };
    this.ymaps = maps('yamaps').catch(() => {
      this.setState(prev =>{
        prev.message = 'Не удалось загрузить карту';
        return(prev);
      });
    });
    this.line = null;
  }

  redrawPolyline = () =>
    this.ymaps.then(
      ymaps => this.line = polyline(ymaps,this.state.points,this.line)
    );

  handlePointAdd = name =>
    this.ymaps.then(ymaps => {
      this.setState(prev => {
        prev.points.push(new Placemark(ymaps,name,this.redrawPolyline));
        return(prev);
      });
    });

  handlePointRemove = index =>
    this.setState(prev => {
      prev.points.splice(index,1)[0].remove();
      return(prev);
    });

  handleError = () =>{
    this.setState(prev =>{
      prev.message = 'Вы ввели пустое название';
      return(prev);
    });
    setTimeout(()=>
      this.setState(prev=> {
        prev.message = '';
        return(prev);
      }),3000)
  };

  handleDragEnd = ({oldIndex, newIndex})=>
    this.setState(prev => {
      prev.points = arrayMove(this.state.points, oldIndex, newIndex);
      return prev;
    });

  render() {
    this.redrawPolyline();
    return (
      <div className="container App">
        <div className="row">
          <div className="col-md-6 col-12">
            <h1>React App</h1>
          </div>
        </div>
        <div className="row main">
          <div className="col-md-6 col-12">
            <AddressInput onPointAdd = {this.handlePointAdd} onError = {this.handleError}/>
            <Message message={this.state.message}/>
            <ListPoint points = {this.state.points} onRemove = {this.handlePointRemove} onSortEnd={this.handleDragEnd}/>
          </div>
          <div className="col-md-6 col-12 ">
            <div id="yamaps">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
