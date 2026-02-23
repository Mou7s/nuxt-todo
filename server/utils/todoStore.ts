import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

type TodoState = {
  todos: string[];
  dones: string[];
};

const DATA_FILE_PATH = resolve(process.cwd(), 'data', 'todos.json');

const DEFAULT_STATE: TodoState = {
  todos: [],
  dones: [],
};

const normalizeState = (state: unknown): TodoState => {
  if (!state || typeof state !== 'object') {
    return { ...DEFAULT_STATE };
  }

  const value = state as { todos?: unknown; dones?: unknown };

  const todos = Array.isArray(value.todos)
    ? value.todos.filter((item): item is string => typeof item === 'string')
    : [];

  const dones = Array.isArray(value.dones)
    ? value.dones.filter((item): item is string => typeof item === 'string')
    : [];

  return { todos, dones };
};

const ensureDataFile = async () => {
  await mkdir(dirname(DATA_FILE_PATH), { recursive: true });

  try {
    await readFile(DATA_FILE_PATH, 'utf-8');
  } catch {
    await writeFile(DATA_FILE_PATH, JSON.stringify(DEFAULT_STATE, null, 2), 'utf-8');
  }
};

export const readTodoState = async (): Promise<TodoState> => {
  await ensureDataFile();

  try {
    const content = await readFile(DATA_FILE_PATH, 'utf-8');
    return normalizeState(JSON.parse(content));
  } catch {
    return { ...DEFAULT_STATE };
  }
};

export const writeTodoState = async (nextState: TodoState): Promise<TodoState> => {
  await ensureDataFile();

  const normalized = normalizeState(nextState);

  await writeFile(DATA_FILE_PATH, JSON.stringify(normalized, null, 2), 'utf-8');

  return normalized;
};
