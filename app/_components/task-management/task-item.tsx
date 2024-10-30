import React from "react";
import { Box, Checkbox, Paper, Group, ActionIcon, Loader } from "@mantine/core";
import { Trash } from "lucide-react";
import { TaskItemProps } from "@/types/types";

export const TaskItem = ({
  task,
  onToggle,
  onDelete,
  isToggling = false,
  isDeleting = false,
}: TaskItemProps) => (
  <Paper shadow="xs" p="md" withBorder>
    <Group justify="space-between" align="start">
      <Group align="start" style={{ flex: 1 }}>
        <Box pt={2}>
          {isToggling ? (
            <Loader size="xs" />
          ) : (
            <Checkbox
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label="Toggle task"
            />
          )}
        </Box>
        <Box
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "gray" : "inherit",
            wordBreak: "break-word",
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
