import React from "react";
import { Box, Checkbox, Paper, Group, ActionIcon } from "@mantine/core";
import { Trash } from "lucide-react";
import { Task } from "@/types/types";

export const TaskItem = ({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: any;
  onDelete: any;
}) => (
  <Paper shadow="xs" p="md" withBorder>
    <Group justify="space-between">
      <Group>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label="Toggle task"
        />
        <Box
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "gray" : "inherit",
          }}
        >
          {task.title}
        </Box>
      </Group>
      <ActionIcon
        color="red"
        onClick={() => onDelete(task.id)}
        variant="subtle"
      >
        <Trash size={12} />
      </ActionIcon>
    </Group>
  </Paper>
);
