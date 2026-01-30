import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Task {
  id: string; // Because we use crypto uuid so it has to be the string
  task: string;
  status: "completed" | "uncompleted";
}

function MainContent() {
  const [todos, setTodos] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null); // task id that is editing
  const [editInput, setEditInput] = useState<string>(""); //new task that edit

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);

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

  // idea of edit[we have 2 state]
  // 1. know which id is editing
  // 2. keep editing value

  const handleEdit = (task: Task) => {
    setEditId(task.id);
    setEditInput(task.task);
  };

  const submitEdit = () => {
    if (!editId) return;

    setTodos((prev) =>
      prev.map((task) =>
        task.id === editId ? { ...task, task: editInput } : task,
      ),
    );
    setEditId(null);
    setEditInput("");
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === "completed" ? "uncompleted" : "completed",
            }
          : todo,
      ),
    );
  };

  return (
    <div className="bg-white px-5 py-6 max-w-3xl w-1/4 rounded-2xl">
      <h1 className="text-3xl font-bold mb-5 text-center">ToDoList</h1>

      {/* Search bar and Add Task button */}
      <div className="flex gap-2 py-2 mb-3">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="px-2 border text-sm rounded-full w-full bg-green-lightest"
        />
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => setIsVisible(true)}
          className="px-1 py-1.5 rounded-full border bg-green hover:bg-green-lighter transition duration-150 delay-100"
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
            className="px-2.5 py-1.5 text-sm text-center bg-brown text-white hover:bg-amber-300  transition ease-in-out duration-300 delay-100"
          />
        </div>
      )}

      {/* Task container */}
      {todos
        .filter((items) => {
          return search.toLowerCase() === ""
            ? items
            : items.task.toLowerCase().includes(search);
        })
        .map((tasks) => (
          <div
            key={tasks.id}
            className={`flex justify-between px-2 py-3 bg-brown items-center mb-2.5 rounded-sm cursor-pointer ${editId === tasks.id ? "bg-transparent" : "bg-brown"} ${tasks.status === "completed" ? "line-through decoration-2 decoration-gray-500" : "no-underline"}`}
          >
            {editId === tasks.id ? (
              <input
                type="text"
                value={editInput}
                placeholder="Edit your task"
                onChange={(e) => setEditInput(e.target.value)}
                onBlur={submitEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitEdit();
                  if (e.key === "Escape") {
                    setEditId(null);
                    setEditInput("");
                  }
                }}
                className="py-2.5 px-2 text-sm w-full border-2 border-beige bg-beige-lighter rounded-sm"
              />
            ) : (
              <div className="flex justify-between items-center w-full">
                <p
                  className={`text-sm ${tasks.status === "completed" ? "text-gray-500" : "text-white"}`}
                  onClick={() => toggleComplete(tasks.id)}
                >
                  {tasks.task}
                </p>

                <div className="flex gap-1">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(tasks)}
                    className="text-black hover:text-white transition ease-in-out duration-150 delay-100"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-black hover:text-white transition ease-in-out duration-150 delay-100"
                    onClick={() => {
                      setTodos((prev) => prev.filter((a) => a.id !== tasks.id));
                      localStorage.removeItem("tasks");
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default MainContent;
