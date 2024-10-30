import { getTasks } from "@/actions/task-actions";
import TaskList from "@/components/task-management/task-list";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function Tasks() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: async () => await getTasks(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskList />
    </HydrationBoundary>
  );
}

export default Tasks;
