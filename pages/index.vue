<template>
  <div
    class="grid place-content-center min-h-screen dark:bg-neutral-950 dark:text-neutral-50"
  >
    <section>
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keydown.enter="addTodo"
        />
      </header>
    </section>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  todos.value = todoStorage.fetch();
});

// app initial state
var STORAGE_KEY = 'todos-vuejs';
let todoStorage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save: function (todos: object) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

const todos = ref(todoStorage.fetch());
const newTodo = ref('');

// watch todos change for localStorage persistence
watch(
  todos,
  (newTodos) => {
    todoStorage.save(newTodos);
  },
  { deep: true }
);

const addTodo = () => {
  const value = newTodo.value.trim();
  if (!value) {
    return;
  }
  // TODO: Use a proper UUID instead of `Date.now()`.
  todos.value.push({ id: Date.now(), title: value, completed: false });
  newTodo.value = '';
};
</script>
