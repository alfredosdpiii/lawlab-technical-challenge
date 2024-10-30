import getTasks from "@/actions/task-actions";
import React from "react";

async function Tasks() {
  const tasks = await getTasks();
  return (
    <div>
      {tasks.map((task: any) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}

export default Tasks;
