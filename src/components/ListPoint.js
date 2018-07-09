import React from 'react';
import  Point from './Point';
import {SortableContainer} from 'react-sortable-hoc';


const ListPoint = SortableContainer(props => {
  let content = props.points.map((point,index)=>{
    return(
      <Point adress = {point.name} index = {index} i={index} key = {index} remove = {props.onRemove}/>
    );
  });
  return(
    <div className="ListPoint">
      {content}
    </div>
  );
});

export  default  ListPoint;