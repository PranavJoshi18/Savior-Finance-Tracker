import React from 'react';
import './Button.css';
function Button(props) {
  return (
    <div>
        <button disabled={props.disabled} className={props.skyblue ? "btn blue" : "btn"} onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

export default Button