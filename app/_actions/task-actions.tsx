export default async function getTasks() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  const json = await response.json();

  const userTasks = json.filter((task: any) => task.userId === 1);

  return userTasks;
}
