<script setup>
useSeoMeta({
  title: 'Nuxt todo',
  ogTitle: 'Nuxt todo',
  description: 'a todo app powered by nuxt3 and nuxt ui',
  ogDescription: 'a todo app powered by nuxt3 and nuxt ui',
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

onMounted(() => {
  if (localStorage.getItem('todos') !== null) {
    todos.value = JSON.parse(localStorage.getItem('todos'));
  }
  if (localStorage.getItem('dones') !== null) {
    dones.value = JSON.parse(localStorage.getItem('dones'));
  }
});

const todos = useState('todos', () => []);
const todo = useState('todo', () => '');
const dones = useState('dones', () => []);

const addTodo = () => {
  if (todo.value !== '') {
    todos.value.push(todo.value);
    todo.value = '';
  }

  updateLocalStorage();
};

const doneTodo = (index) => {
  // 将 'todos' 中的值移动到 'dones'
  dones.value.push(todos.value[index]);
  // 从 'todos' 中删除特定索引的值
  todos.value.splice(index, 1);

  updateLocalStorage();
};

const updateLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
  localStorage.setItem('dones', JSON.stringify(dones.value));
};

const clearLocalStorage = () => {
  if (confirm('Are you sure to clear LocalStorage?')) {
    localStorage.clear();
    window.location.reload();
  }
};
</script>

<template>
  <UContainer>
    <p class="text-center text-8xl font-serif">todos</p>

    <UCard class="mt-10">
      <div class="flex justify-between items-center gap-4">
        <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />
        <UInput
          v-model="todo"
          placeholder="press Enter to add a todo"
          @keyup.enter="addTodo"
          class="w-full"
        ></UInput>
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
            <UButton @click="doneTodo(index)">
              <UIcon
                name="i-mdi-checkbox-multiple-marked-circle-outline"
              ></UIcon>
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
        <UButton @click="clearLocalStorage"><p>clear LocalStorage</p></UButton>
        <ULink><UIcon name="i-mdi-github" /> </ULink>
      </div>
    </UCard>
  </UContainer>
</template>
