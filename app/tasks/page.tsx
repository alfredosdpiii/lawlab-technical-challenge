// import { getTasks } from "@/actions/task-actions";
import TaskList from "@/components/task-management/task-list";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function Tasks() {
  const queryClient = new QueryClient();
  // uncommenting this will cause the getTasks to hydrate again
  // causing the tasks to go back to original state because
  // json placeholder cannot do crud
  // but this is how I would prefetch
  // await queryClient.prefetchQuery({
  //   queryKey: ["tasks"],
  //   queryFn: () => getTasks(),
  // });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskList />
    </HydrationBoundary>
  );
}

export default Tasks;
