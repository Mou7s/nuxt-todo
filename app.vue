<script setup>
onMounted(() => {
  if (localStorage.getItem('todos') !== null) {
    todos.value = localStorage.getItem('todos').split(',');
  }
  if (localStorage.getItem('dones') !== null) {
    dones.value = localStorage.getItem('dones').split(',');
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
</script>

<template>
  <UContainer>
    <p class="text-center text-8xl">todos</p>
    <UCard class="mt-10 grid place-content-center">
      <UInput
        v-model="todo"
        placeholder="What needs to be done?"
        class="w-48"
        @keyup.enter="addTodo"
      ></UInput>
    </UCard>

    <UCard class="mt-10">
      <p class="font-bold text-center">ongoing</p>

      <div v-for="(todo, index) of todos" :key="index" class="text-center">
        <p class="m-2">
          {{ todo }} <UButton @click="doneTodo(index)">Del</UButton>
        </p>
      </div></UCard
    >
    <UCard class="mt-10">
      <p class="font-bold text-center">done</p>

      <div v-for="(done, index) of dones" :key="index" class="text-center">
        <p class="m-2">
          {{ done }}
        </p>
      </div>
    </UCard>
  </UContainer>
</template>
