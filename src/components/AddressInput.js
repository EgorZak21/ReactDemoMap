import React, { Component } from 'react';
import add from './add.svg';

class AddressInput extends Component{
  constructor(props){
    super(props);
    this.state = { value: ''};
  }

  handleChange = event =>{
    this.setState({value: event.target.value});
  };

  handleSubmit = event =>{
    if(this.state.value){
      this.setState({value:''});
      this.props.onPointAdd(this.state.value);
    }else{
      this.props.onError();
    }
    event.preventDefault();
  };

  render(){
    return(
      <form className="form" onSubmit={this.handleSubmit}>
        <input className="form-text" value={this.state.value} onChange={this.handleChange} type="text"/>
        <label className="form-label">
          <img src={add} alt=""/>
          <input className="form-submit" value="" type="submit"/>
        </label>
      </form>
    );
  }
}

export default AddressInput;