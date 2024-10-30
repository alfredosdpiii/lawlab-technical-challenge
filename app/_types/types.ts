export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (title: string, taskId: number) => void;
  isToggling?: boolean;
  isDeleting?: boolean;
  isEditing?: boolean;
}

export type TaskListProps = Task[];
