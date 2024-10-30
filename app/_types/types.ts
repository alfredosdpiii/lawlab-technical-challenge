export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export type TaskListProps = Task[];
