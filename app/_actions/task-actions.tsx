export default async function getTasks() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  const json = await response.json();

  return json;
}
