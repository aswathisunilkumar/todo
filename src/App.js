import './App.css';
import { useState } from 'react';
import {v4} from 'uuid';

const item = {
  id: v4(),
  name: "Clean the house"
}

const item2 = {
  id: v4(),
  name: "Wash the car"
}


function App() {
  const [text, setText] = useState("");
  const [todoState, setTodoState] = useState({
    "todo": {
      title: "Todo",
      items: [item]
    },
    "doing": {
      title: "In Progress",
      items: [item2]
    },
    "done": {
      title: "Completed",
      items: []
    }
  })
  // const [todo, setTodo] = useState([]);
  // const [doing, setDoing] = useState([]);

  const addTodo = () => {
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
    e.dataTransfer.setData("id", key);
    e.dataTransfer.setData("task",JSON.stringify(item));
    e.dataTransfer.setData("status",status);
  }

  
  const onDrop = (e, destStatus) => {
    let taskIndex= e.dataTransfer.getData("id");
    // let task = JSON.parse(e.dataTransfer.getData("task"));
    let sourceStatus = e.dataTransfer.getData("status");
    const task = {...todoState[sourceStatus].items[taskIndex]};
    setTodoState(prevState =>{
      prevState = {...prevState};
      prevState[sourceStatus].items.splice(taskIndex, 1);
      prevState[destStatus].items.splice(prevState[destStatus].items.length, 0, task);
      // console.log(prevState);
      return prevState;
    })
  }
  return (
    <div className="App">
      <div className="todo-form">
        <input type="text" value={text} onChange={(e)=> setText(e.target.value)}/>
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="todos">
        <div className="task-container"
          onDragOver={(e) => onDragOver(e)}
          onDrop = {(e) => onDrop(e, "todo")}>
          {
          todoState.todo.items.map((item,key) => {
            return (
              <div  key={key}
                onDragStart = {(e) => onDragStart(e, key, item, "todo")} draggable className="draggable">
                    {item.name}
              </div>
            ) 
          })
        }
        </div>
        <div className="droppable in-progress" 
          onDragOver={(e) => onDragOver(e)}
          onDrop = {(e) => onDrop(e, "doing")}>
          {
            todoState.doing.items.map((item,key) => {
              return (
                <div key={key}
                  onDragStart = {(e) => onDragStart(e, key, item, "doing")} draggable className="draggable">
                      {item.name}
                </div>
              )
          })
          }
        </div>
        <div className="droppable done" 
          onDragOver={(e) => onDragOver(e)}
          onDrop = {(e) => onDrop(e, "done")}>
          {
            todoState.done.items.map((item,key) => {
              return (
                <div key={key}
                  onDragStart = {(e) => onDragStart(e, key, item, "done")} draggable className="draggable">
                      {item.name}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
