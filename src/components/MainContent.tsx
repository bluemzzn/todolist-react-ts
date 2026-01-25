import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Task {
  id: string;
  task: string;
  status: "completed" | "uncompleted";
}

function MainContent() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      task: taskInput,
      status: "uncompleted",
    };

    setTodos((prev) => [...prev, newTask]);
    setTaskInput("");
    setIsVisible(false);
  };

  return (
    <div className="bg-white px-5 py-6 max-w-3xl w-1/4 rounded-2xl">
      <h1 className="text-3xl font-bold mb-5 text-center">ToDoList</h1>

      {/* Search bar and Add Task button */}
      <div className="flex gap-2 py-2 mb-3">
        <input
          type="text"
          placeholder="Search"
          className="px-2 border text-sm rounded-full w-full bg-green-lightest"
        />
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => setIsVisible(true)}
          className="px-1 py-1.5 rounded-full border bg-green hover:bg-green-lighter transition duration-200 delay-150"
        />
      </div>

      {/* Add Task container */}
      {isVisible && (
        <div className="flex mb-4">
          <input
            type="text"
            value={taskInput}
            placeholder="What is your task today?"
            onChange={(e) => handleChange(e)}
            className="py-1 px-2 text-sm w-full  border-2 border-beige bg-beige-lighter"
          />
          <input
            type="submit"
            value="Submit"
            onClick={handleAddTask}
            className="px-2.5 py-1.5 text-sm text-center bg-brown text-white hover:bg-amber-300  transition ease-in-out duration-300 delay-150"
          />
        </div>
      )}

      {/* Task container */}
      {todos.map((tasks) => (
        <div
          key={tasks.id}
          className="flex justify-between px-2 py-3 bg-brown items-center mb-2.5 rounded-sm"
        >
          <p className="text-sm text-white">{tasks.task}</p>
          <div className="flex gap-1">
            <FontAwesomeIcon
              icon={faEdit}
              className="text-black hover:text-white transition ease-in-out duration-200 delay-150"
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="text-black hover:text-white transition ease-in-out duration-200 delay-150"
              onClick={() => {
                setTodos((prev) => prev.filter(a => a.id !== tasks.id));
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainContent;
