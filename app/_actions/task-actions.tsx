"use server";
import { Task } from "@/types/types";

// This is how I would filter
// if the api did not have it built in
// export default async function getTasks() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//
//   const json = await response.json();
//
//   const userTasks = json.filter((task: any) => task.userId === 1);
//
//   return userTasks;
// }

// GET tasks
// filter in url params
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1",
  );

  const json = await response.json();

  return json;
}

// POST create task
export async function createTask(title: string): Promise<Task> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      completed: false,
      userId: 1,
    }),
  });
  const json = await response.json();
  console.log(json);
  return json;
}

// PATCH edit task
export async function toggleTask(
  id: number,
  completed: boolean,
): Promise<Task> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    },
  );
  const json = await response.json();
  return json;
}

// DELETE delete task
export async function deleteTask(id: number): Promise<void> {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
}
