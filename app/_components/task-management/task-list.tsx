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

  const toggleMutation = useMutation({
    mutationFn: async ({ id, completed }: ToggleVariables) => {
      setTogglingIds((prev) => [...prev, id]);
      const response = await toggleTask(id, completed);
      setTogglingIds((prev) => prev.filter((toggleId) => toggleId !== id));
      return response;
    },
    onMutate: async (variables: ToggleVariables) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) ?? [];

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) =>
          task.id === variables.id
            ? { ...task, completed: variables.completed }
            : task,
        ),
      );

      return { previousTasks };
    },
    onError: (
      _err,
      _variables,
      context: { previousTasks: Task[] } | undefined,
    ) => {
      if (context) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      setDeletingIds((prev) => [...prev, id]);
      const response = await deleteTask(id);
      setDeletingIds((prev) => prev.filter((deleteId) => deleteId !== id));
      return response;
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) ?? [];

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((task) => task.id !== id),
      );

      return { previousTasks };
    },
    onError: (
      _err,
      _variables,
      context: { previousTasks: Task[] } | undefined,
    ) => {
      if (context) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
  });

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      createMutation.mutate(newTask);
      setNewTask("");
    }
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
          <Button type="submit" loading={createMutation.isPending}>
            Add
          </Button>
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
