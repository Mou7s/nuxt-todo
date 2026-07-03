import { readBody } from 'h3';
import { writeTodoState } from '../../utils/todoStore';

type TodoPayload = {
  todos?: unknown;
  dones?: unknown;
};

export default defineEventHandler(async (event) => {
  const payload = await readBody<TodoPayload>(event);

  return await writeTodoState({
    todos: Array.isArray(payload?.todos)
      ? payload.todos.filter((item): item is string => typeof item === 'string')
      : [],
    dones: Array.isArray(payload?.dones)
      ? payload.dones.filter((item): item is string => typeof item === 'string')
      : [],
  });
});
