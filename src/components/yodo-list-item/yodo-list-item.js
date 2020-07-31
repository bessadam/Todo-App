import React, {Component} from 'react';

import './yodo-list-item.css';

export default class YodoListItem extends Component{


state = {
    done: false,
    important: false
  };


    render(){
    const { label, onDeleted, onToggleImportant, onToggleDone, important, done } = this.props;


      let classNames = 'yodo-list-item';
      if (done) {
        classNames += ' done';// отступ обязателен
      
      }

if(important){
  classNames+= ' important';// отступ обязателен
}
  
    return (
      <span className= {classNames}>
        <span
          className="yodo-list-item-label"
          onClick={onToggleDone}>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick = {onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  };
}



