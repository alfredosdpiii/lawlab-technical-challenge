"use client";
import React, { useState } from "react";
import { Box, TextInput, Button, Group, Stack } from "@mantine/core";
import { TaskItem } from "@/components/task-management/task-item";
import { Task } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/actions/task-actions";

function TaskList() {
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => await getTasks(),
  });
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    return;
  };
  const toggleTask = () => {
    return;
  };
  const deleteTask = () => {
    return;
  };
  return (
    <Box maw={400} mx="auto" p="md">
      <form onSubmit={addTask}>
        <Group gap="sm">
          <TextInput
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button type="submit">Add</Button>
        </Group>
      </form>

      <Stack mt="md">
        {tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default TaskList;
