import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import YodoList from '../yodo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId=100;

state={
  yodoData:[
    this.createYodoItem('Do homework'),
    this.createYodoItem('Music lesson'),
    this.createYodoItem('Play with sister'),
    ],
    term: '',
    filter: 'all'// active, all, done
};

createYodoItem(label){
  return{
    label,
    important: false,
    done: false,
    id: this.maxId++
  }
}

deleteItem=(id)=>{
  this.setState(({yodoData})=>{
    const idx = yodoData.findIndex((el)=>el.id===id);

  const newArray= [
      ...yodoData.slice(0, idx),
      ...yodoData.slice(idx+1)
    ];
    
      return{yodoData:newArray};
  });
};

  addItem=(text)=>{
    const newItem=this.createYodoItem(text);

    this.setState(({ yodoData })=>{
      const newArr=[
        ...yodoData,
        newItem
      ];

      return {
        yodoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName){
    const idx = arr.findIndex((el)=>el.id===id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
    [propName]: !oldItem[propName]
      };

  return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx+1)
    ];

 
  }

  onToggleDone=(id)=>{
    this.setState(({yodoData})=>{
     return{
        yodoData: this.toggleProperty(yodoData, id, 'done')
      };
    });
    
  };

  onToggleImportant=(id)=>{
    this.setState(({yodoData})=>{
      return{
      yodoData: this.toggleProperty(yodoData, id, 'important')
    };
  });
};

onSearchChange=(term)=>{
  this.setState({term});
};

onFilterChange=(filter)=>{
  this.setState({filter});
};

search(items,term){
  if(term.length===0){
    return items;
  }

  return items.filter((item)=>{
    return item.label
    .toLowerCase()
    .indexOf(term.toLowerCase())> -1;
  });
};

filter(items,filter){
  switch(filter){
    case 'all': return items;
    case 'active': return items.filter((item)=>!item.done);
    case 'done': return items.filter((item)=>item.done);
      default: return items;
  }
}

   render(){
    const {yodoData, term, filter} = this.state;
    const visibleItems=this.filter(
      this.search(yodoData, term),
      filter);
    const doneCount= yodoData.filter((el)=>el.done).length;
    const yodoCount = yodoData.length - doneCount;

    return (
      <div className="yodo-app">
        <AppHeader yoDo={yodoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
          onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
          filter= {filter} 
          onFilterChange={this.onFilterChange}/>
        </div>
  
        <YodoList
        yodos = {visibleItems} 
        onDeleted={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}/>
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
   }
};

