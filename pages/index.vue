<template>
  <div class="p-10 min-h-screen dark:bg-neutral-900 dark:text-neutral-50">
    <div class="grid place-content-center w-96 min-w-full">
      <h1 class="text-8xl">todos</h1>
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="What needs to be done?"
        class="h-12 rounded w"
      />
      <ul>
        <li v-for="(todo, index) in todos" :key="index" class="relative group">
          <input type="checkbox" v-model="todo.completed" />
          {{ todo.title }}
          <button
            @click="removeTodo(index)"
            class="right-0 absolute opacity-0 group-hover:opacity-100"
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const newTodo = ref('');
const todos = ref([]);

const addTodo = () => {
  if (newTodo.value.trim() === '') return;
  todos.value.push({ title: newTodo.value, completed: false });
  newTodo.value = '';
};

const removeTodo = (index: number) => {
  todos.value.splice(index, 1);
};
</script>
