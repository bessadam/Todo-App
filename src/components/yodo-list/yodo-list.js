import React from 'react';

import YodoListItem from '../yodo-list-item';
import './yodo-list.css';

const YodoList = ({ yodos, onDeleted, onToggleImportant, onToggleDone }) => {

  const elements = yodos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <YodoListItem 
        {...itemProps } 
        onDeleted={()=>onDeleted(id)}
        onToggleImportant={()=>onToggleImportant(id)}
        onToggleDone={()=> onToggleDone(id)}/>
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default YodoList;