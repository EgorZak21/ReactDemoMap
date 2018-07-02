import React, { Component } from 'react';

class Message extends  Component{
  render(){
    if(!this.props.message){
      return('');
    }
    return(
      <div className="message">
        {this.props.message}
      </div>
    );
  }
}

export default Message;