<script setup>
useHead({
  title: 'Nuxt todo',
  meta: [
    {
      name: 'google-site-verification',
      content: 'uMb53AX2NHoWvhBjQGUPiU2EvzBs2pWg90HYPMkcMP4',
    },
  ],
});

useSeoMeta({
  title: 'Nuxt todo',
  ogTitle: 'Nuxt todo',
  description: 'A todo application built with nuxt deploy on netlify',
  ogDescription: 'A todo application built with nuxt deploy on netlify',
});

const colorMode = useColorMode();
const date = useState('date', () => new Date());

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const label = computed(() =>
  date.value.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
);

const todos = useState('todos', () => []);
const todo = useState('todo', () => '');
const dones = useState('dones', () => []);
const isSyncing = ref(false);
const syncError = ref('');

const fetchTodos = async () => {
  try {
    const data = await $fetch('/api/todos');
    todos.value = data.todos;
    dones.value = data.dones;
    syncError.value = '';
  } catch {
    syncError.value = 'Failed to load shared todos.';
  }
};

onMounted(() => {
  fetchTodos();
});

const saveTodos = async () => {
  isSyncing.value = true;
  try {
    await $fetch('/api/todos', {
      method: 'PUT',
      body: {
        todos: todos.value,
        dones: dones.value,
      },
    });
    syncError.value = '';
  } catch {
    syncError.value = 'Failed to sync shared todos.';
  } finally {
    isSyncing.value = false;
  }
};

const addTodo = async () => {
  const value = todo.value.trim();
  if (value !== '') {
    todos.value.push(value);
    todo.value = '';
  }

  await saveTodos();
};

const doneTodo = async (index) => {
  // 将 'todos' 中的值移动到 'dones'
  dones.value.push(todos.value[index]);
  // 从 'todos' 中删除特定索引的值
  todos.value.splice(index, 1);

  await saveTodos();
};

const editTodo = async (index) => {
  const edited = prompt('Edit todo', todos.value[index]);
  if (edited === null) {
    return;
  }

  todos.value[index] = edited.trim();
  await saveTodos();
};

const clearAllTodos = async () => {
  if (confirm('Are you sure to clear all shared todos?')) {
    todos.value = [];
    dones.value = [];
    await saveTodos();
  }
};
</script>

<template>
  <UContainer>
    <p class="text-center text-8xl font-serif">todos</p>

    <UCard class="mt-10">
      <div class="flex gap-4 justify-between items-center">
        <UButton
          class="hidden sm:inline-flex"
          icon="i-heroicons-calendar-days-20-solid"
          :label="label"
        />
        <UInput
          v-model="todo"
          placeholder="press Enter to add a todo"
          @keyup.enter="addTodo"
          class="w-full"
        >
        </UInput>
        <div>
          <ClientOnly>
            <UButton
              :icon="
                isDark
                  ? 'i-heroicons-moon-20-solid'
                  : 'i-heroicons-sun-20-solid'
              "
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            >
            </UButton>
          </ClientOnly>
        </div>
      </div>
    </UCard>

    <UCard class="mt-10">
      <div class="font-bold text-center">
        <UIcon name="i-mdi-calendar-today-outline"></UIcon>
        <p>ongoing</p>
      </div>

      <div v-for="(todo, index) of todos" :key="index" class="text-center">
        <ul>
          <li class="m-2">
            {{ todo }}
            <UButton @click="doneTodo(index)" class="mx-2">
              <UIcon name="i-mdi-checkbox-multiple-marked-circle-outline">
              </UIcon>
            </UButton>

            <UButton @click="editTodo(index)">
              <UIcon name="i-mdi-pencil"></UIcon>
            </UButton>
          </li>
        </ul>
      </div>
    </UCard>

    <UCard class="mt-10">
      <div class="font-bold text-center">
        <UIcon name="i-mdi-checkbox-multiple-marked-circle-outline"></UIcon>
        <p>done</p>
      </div>

      <div v-for="(done, index) of dones" :key="index" class="text-center">
        <p class="m-2">
          {{ done }}
        </p>
      </div>
      <div class="grid place-content-center grid-flow-col gap-4 mt-10">
        <UButton @click="clearAllTodos"><p>clear shared todos</p></UButton>
        <ULink><UIcon name="i-mdi-github" /> </ULink>
      </div>
    </UCard>
    <p v-if="isSyncing" class="text-center mt-4 text-sm opacity-70">syncing...</p>
    <p v-if="syncError" class="text-center mt-4 text-sm text-red-500">
      {{ syncError }}
    </p>
  </UContainer>
</template>
