import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState<string>("");

  const handleAdd = () => {
    axios
      .post("http://localhost:8000/add", { task: task })
      .then((result) => {
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
