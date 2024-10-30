"use client";
import React, { useState } from "react";
import { Box, TextInput, Button, Group, Stack } from "@mantine/core";
import { TaskItem } from "@/components/task-management/task-item";
import { Task } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from "@/actions/task-actions";

function TaskList() {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState("");
  const [togglingIds, setTogglingIds] = useState<number[]>([]);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) ?? [];

      const optimisticTask: Task = {
        id: Date.now(),
        title,
        completed: false,
        userId: 1,
      };

      queryClient.setQueryData<Task[]>(
        ["tasks"],
        [optimisticTask, ...previousTasks],
      );
      return { previousTasks };
    },
    onError: (
      _err,
      _newTodo,
      context: { previousTasks: Task[] } | undefined,
    ) => {
      if (context) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
  });
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
