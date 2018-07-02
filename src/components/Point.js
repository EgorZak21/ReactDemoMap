import React from 'react';
import close from './close1.png';
import {SortableElement} from 'react-sortable-hoc';

const Point = SortableElement( (props)=>
  <div  className="point">
    {props.i+1}. {props.adress}
    <button onClick={()=>props.remove(props.i)} className="point-remove" >
      <img src={close} alt=""/>
    </button>
  </div>);

export default Point;