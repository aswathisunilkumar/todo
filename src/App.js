import './App.css';
import { useState } from 'react';
import {v4} from 'uuid';
import TaskItem from './components/TaskItem';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);

function App() {
  const [text, setText] = useState("");
  const [todoState, setTodoState] = useState({
    "todo": {
      title: "Todo",
      items: []
    },
    "doing": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  const addTodo = () => {
    if(text==="") {
      return;
    }
    setTodoState(prev => {
      return {
        ...prev,
        todo : {
          title : "Todo",
          items : [
            {
              id : v4(),
              name: text
            },
        
          ...prev.todo.items,
        ],
        }
      }   
    }) 

    setText("");
  }

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDragStart = (e, key, item, status) => {
    e.dataTransfer.setData("task",JSON.stringify(item));
    e.dataTransfer.setData("status",status);
  }

  const onDrop = (e, destStatus) => {
    let task = JSON.parse(e.dataTransfer.getData("task"));
    let sourceStatus = e.dataTransfer.getData("status");
    if (destStatus === sourceStatus) {
      return;
    }
    const remainingTask = todoState[sourceStatus].items.filter((eachTask)=>eachTask.id!==task.id)
    setTodoState(prev => ({
        ...prev,
        [sourceStatus] : {
          items :[...remainingTask],
        },
        [destStatus] : {
          items :  [...prev[destStatus].items, task]
        }
      }))
  }
  const deleteItem =(item,status) => {
    const remainingItems=todoState[status].items.filter((eachItem)=>eachItem.id!==item.id)
    setTodoState(prev => (
      {
        ...prev,
        [status] : {
          items :[...remainingItems]
        } 
      }
    ))
  }
  return (
    <div className="App">
      <div className="header">YOUR TODOS</div>
      <div className="todo-form">
        <input className="input-container" placeholder="Add your todo here" type="text" value={text} onChange={(e)=> setText(e.target.value)} />
        <button className="button-class" onClick={addTodo}><span>Add Todo</span></button>
      </div>
      <div className="todos">
        <div className="task-container"
          onDragOver={(e) => onDragOver(e)}
          onDrop = {(e) => onDrop(e, "todo")}>
          <h2>TO-DO LIST</h2>
          {
          todoState.todo.items.map((item,id) => {
            return (
              <TaskItem key={id} onDragStart={onDragStart} status="todo" deleteItem={deleteItem} item={item}/>)})}
        </div>
        <div className="droppable in-progress" 
          onDragOver={(e) => onDragOver(e)}
          onDrop = {(e) => onDrop(e, "doing")}>
          <h2>DOING LIST</h2>
          {
            todoState.doing.items.map((item,id) => {
              return (
                <TaskItem key={id} onDragStart={onDragStart} status="doing" deleteItem={deleteItem} item={item}/>)})}
        </div>
        <div className="droppable done" 
          onDragOver={(e) => onDragOver(e)}
          onDrop = {(e) => onDrop(e, "done")}>
           <h2>DONE LIST</h2>
          {
            todoState.done.items.map((item,id) => {
              return (
                <TaskItem key={id} onDragStart={onDragStart} status="done" deleteItem={deleteItem} item={item}/>)})}
        </div>
      </div>
    </div>
  );
}

export default App;
