import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Paper,
  Group,
  ActionIcon,
  TextInput,
  Loader,
} from "@mantine/core";
import { Trash, Edit, Check, X } from "lucide-react";
import { TaskItemProps } from "@/types/types";

export const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  isToggling = false,
  isDeleting = false,
  isEditing = false,
}: TaskItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleSubmit = () => {
    if (editValue.trim() !== task.title) {
      onEdit(editValue.trim(), task.id);
    }
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditMode(false);
  };

  return (
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
          {isEditMode ? (
            <TextInput
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              style={{ flex: 1 }}
              disabled={isEditing}
            />
          ) : (
            <Box
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "inherit",
                wordBreak: "break-word",
              }}
            >
              {task.title}
            </Box>
          )}
        </Group>
        <Group gap="xs">
          {isEditMode ? (
            <>
              <ActionIcon
                color="green"
                onClick={handleSubmit}
                variant="subtle"
                disabled={isEditing}
              >
                {isEditing ? <Loader size="xs" /> : <Check size={12} />}
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={handleCancel}
                variant="subtle"
                disabled={isEditing}
              >
                <X size={12} />
              </ActionIcon>
            </>
          ) : (
            <>
              <ActionIcon
                color="blue"
                onClick={() => setIsEditMode(true)}
                variant="subtle"
              >
                <Edit size={12} />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={() => onDelete(task.id)}
                variant="subtle"
                disabled={isDeleting}
              >
                {isDeleting ? <Loader size="xs" /> : <Trash size={12} />}
              </ActionIcon>
            </>
          )}
        </Group>
      </Group>
    </Paper>
  );
};
