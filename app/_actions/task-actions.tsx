"use server";

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
export async function getTasks() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1",
  );

  const json = await response.json();

  return json;
}

// POST create task
export async function createTask() {
  const response = fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
  });
}

// PATCH edit task
export async function patchTask() {
  const response = fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
  });
}
