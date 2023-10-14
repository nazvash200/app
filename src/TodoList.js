import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import { useState } from "react";

const TodoList = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (text.trim()) {
      setTasks((l) => [
        ...l,
        { text, status: false, createdAt: Date.now(), updatedAt: Date.now() },
      ]);
    }
    setText("");
    toast(`${text} was added`, {
      type: "success",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };
  const removeTask = (i) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks((l) => {
          const help = [...l];
          help.splice(i, 1);
          return [...help];
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const changeStatus = (i) => {
    setTasks((l) => {
      const help = [...l];
      help[i].status = !help[i].status;
      help[i].updatedAt = Date.now();
      return [...help];
    });
  };
  const showDate = () => {
    const diff = Date.now() - 1347953138000;
    return Math.floor(diff / (24 * 3600 * 1000 * 31));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex justify-center my-4 gap-2"
      >
        <input
          autoFocus
          type="text"
          placeholder="enter your task"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="border-2 border-blue-700 rounded focus:outline-none px-1 placeholder:text-blue-200 text-blue-500"
        />
        <button
          onClick={addTask}
          type="submit"
          className="text-white bg-purple-700 p-1 rounded hover:bg-white hover:text-purple-700"
        >
          add
        </button>
      </form>
      <div className="myclass dark">
        {tasks.map((item, index) => (
          <div
            key={index}
            className={`w-32 h-40 ${
              item.status ? "bg-green-300" : "bg-red-300"
            } rounded relative flex flex-col justify-between py-3 px-2 shadow-xl shadow-stone-500`}
          >
            <span className="dark:text-white">{item.text}</span>
            <span>{item.text}</span>

            <div className="flex justify-between items-baseline">
              <button onClick={() => changeStatus(index)}>
                {item.status ? "undone" : "done"}
              </button>
              <span className="text-[8px]">
                {showDate(item.createdAt)} days ago
              </span>
            </div>

            <button
              type="submit"
              onClick={() => removeTask(index)}
              className="absolute top-1 right-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoList;
