import getTasks from "@/actions/task-actions";
import TaskList from "@/components/task-management/task-list";
import React from "react";

async function Tasks() {
  const tasks = await getTasks();
  return (
    <div>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default Tasks;
