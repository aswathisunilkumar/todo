import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);

function TaskItem(props){
    const{id, onDragStart, item, deleteItem, status} =props;
    
    return(
        <div id={id} onDragStart = {(e) => onDragStart(e, id, item, status)} draggable className="draggable">
                {item.name}
                <span>
                    <FontAwesomeIcon className="faicons" icon="trash" onClick={()=>deleteItem(item,status)}></FontAwesomeIcon>
                </span>
        </div>
    )

}

export default TaskItem;