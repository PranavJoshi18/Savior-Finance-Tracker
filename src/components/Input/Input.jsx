import React from 'react';
import "./Input.css";
function Input(props) {
  return (
    <div className='input'>
        <p>{props.label}</p>
        <input type={props.type} placeholder={props.placeholder} value={props.state} onChange={(e)=>props.setState(e.target.value)}/>
    </div>
  )
}

export default Input