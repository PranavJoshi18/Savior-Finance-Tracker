import React from 'react';
import './Card.css';
import Button from '../Button/Button';
function Card(props) {
  return (
    <div className='card'>
        <div className="h4"><h4>{props.title}</h4></div>
        <div className="p"><p style={props.loss ? {color:"coral"} : {color:"var(--white)"}}>&#8377; {props.amt}</p></div>
        <Button text={props.text} skyblue={true} onClick={props.onClick}/>
    </div>
  )
}

export default Card