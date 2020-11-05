import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);

function TaskItem(props){
    const{id, onDragStart, item, deleteItem, status} =props;

    const setBgColor = () => {
        console.log('dsjkf')
        if (status === "todo"){
            return '4px solid #5b8df4';
        }
        if (status === "doing"){
            return '4px solid #f8942d';
        }
        if (status === "done"){
            return ' 4px solid #74be7e';
        }
    }

const color = '#74be7es'

    const style = {
        border: setBgColor()
    }
    
    return(
        <div id={id} style={style} onDragStart = {(e) => onDragStart(e, id, item, status)} draggable className="draggable">
                <h2>{item.name}</h2>
                <span>
                    <FontAwesomeIcon className="faicons" icon="trash" onClick={()=>deleteItem(item,status)}></FontAwesomeIcon>
                </span>
        </div>
    )

}

export default TaskItem;
