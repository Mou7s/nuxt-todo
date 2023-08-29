<template>
  <div
    class="min-h-screen dark:text-neutral-50 dark:bg-neutral-800 grid gap-2 place-content-center"
  >
    <h1 class="text-3xl">Todolist</h1>

    <form @submit.prevent>
      <input
        @keyup.enter="addTodo"
        type="text"
        v-model="newTodo"
        placeholder="new todo"
        class="text-neutral-800 rounded mx-1 mt-5"
      />
    </form>

    <div v-for="(todo, index) in arr" :key="index">
      <Todo :text="todo" @delete-item="() => delItem(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const arr = ref([]);
const newTodo = ref();

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    arr.value.push(newTodo.value);
    newTodo.value = '';
    console.log(arr.value);
  }
};

const delItem = (index: number) => {
  console.log(index);
  arr.value.splice(index, 1);
};
</script>

<style>
button {
  border-radius: 0.25rem;
}
</style>
