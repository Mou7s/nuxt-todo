import { readTodoState } from '../../utils/todoStore';

export default defineEventHandler(async () => {
  return await readTodoState();
});
