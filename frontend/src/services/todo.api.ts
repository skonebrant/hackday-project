import ITodo from "../todo.type";

const apiBaseUrl = "http://localhost:8080/api/todos";

export const GET = async () => {
  const response = await fetch(apiBaseUrl);
  const json = (await response.json()) as ITodo;
  return json;
};

export const POST = async (todo: Partial<ITodo>) => {
  const response = await fetch(apiBaseUrl, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await response.json()) as { todo: ITodo };
  return json;
};

export const DELETE = async (todoId: string) => {
  const response = await fetch(apiBaseUrl + `/${todoId}`, {
    method: "DELETE",
  });
  const json = (await response.json()) as { todo: ITodo };
  return json;
};
