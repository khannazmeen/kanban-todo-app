export const fetchTasks = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};