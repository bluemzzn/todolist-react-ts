import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface Task{
    id : number;
    title : string;
    status : 'completed' | 'uncompleted'
}

function MainContent() {

    const [todos, setTodos] = useState<Task[]>([]);

    const newTask = (todo:Task) =>{
        setTodos([...todos, {id : todo.id, title : todo.title, status : 'uncompleted' }]);
    }

    


    return (
        <div className="bg-white px-5 py-6 max-w-3xl w-1/4 rounded-2xl">
            <h1 className="text-3xl font-bold mb-5 text-center">ToDoList</h1>

            {/* Search bar and Add Task button */}
            <div className="flex gap-2 py-2 mb-3">
                <input type="text" placeholder="Search" className="px-2 border text-sm rounded-full w-full" />
                <FontAwesomeIcon icon={faPlus} className="px-1 py-1.5 rounded-full border bg-green" />
            </div>

            {/* Add Task container */}
            <div className="flex mb-4">
                <input type="text" name="add_task" id="add_task" placeholder="What is your task today?" className=" py-1 px-2 text-sm w-full  border-2 border-beige bg-beige-lighter"/>
                <input type="submit" value="Submit" className="px-2.5 py-1.5 text-sm text-center bg-brown text-white"/>
            </div>

            {/* Task container */}
            <div className="flex justify-between px-2 py-3 bg-brown items-center mb-2.5 rounded-sm">
                <p className="text-sm text-white">Practice keyboard</p>
                <div className="flex gap-1">
                    <FontAwesomeIcon icon={faEdit} className="" />
                    <FontAwesomeIcon icon={faTrash} className="" />
                </div>
            </div>
          

        </div>
    )
}

export default MainContent
