import React, { Component } from 'react';
import './App.css';
import AddressInput from './components/AddressInput';
import Message from './components/Message';
import ListPoint from './components/ListPoint';
import {arrayMove} from 'react-sortable-hoc';
import Maps from './components/Maps';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      points: [],
      toAdd: []
    };
  }

  addPoint = adress => {
    this.setState(prev => {
      prev.toAdd.push(adress);
      return(prev);
    });
  };

  removePoint = index => {
    this.setState(prev => {
      prev.points =  prev.points.filter((point,i)=>{
        if(i===index) point.remove();
        return(i!==index);
      });
      return(prev);
    });
  };

  handleError = () =>{
    this.setState(prev =>{
      prev.message = 'Вы ввели пустое название';
      return(prev);
    });
    setTimeout(()=>{
      this.setState(prev=>{
        prev.message = '';
        return(prev);
      });
    },3000)
  };

  onDragEnd = ({oldIndex, newIndex})=>{
    this.setState(prev => {
      prev.points = arrayMove(this.state.points, oldIndex, newIndex)
      return prev;
    });
  };

  onNewMapPoint = (point)=>{
    this.setState(prev => {
      prev.points.push(point);
      return(prev);
    });
  };

  onMove = () =>{
    this.setState(props =>{
      return props;
    });
  };

  render() {
    return (
      <div className="container App">
        <div className="row">
          <div className="col-md-6 col-12">
            <h1>React App</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <AddressInput onAdd = {this.addPoint} onError = {this.handleError}/>
            <Message message={this.state.message}/>
            <ListPoint points = {this.state.points} remove = {this.removePoint} onSortEnd={this.onDragEnd}/>
          </div>
          <div className="col-md-6 col-12 ">
            <div id="map">
              <Maps toAdd = {this.state.toAdd} onNewMapPoint = {this.onNewMapPoint} points = {this.state.points} onMove = {this.onMove}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
