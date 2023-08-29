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
        placeholder="type todo there"
        class="text-neutral-800 rounded mx-1 mt-5"
      />
    </form>

    <div v-for="a in arr">
      <Todo :text="a" @delete-item="delItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
const arr = ref([]);
const newTodo = ref('');

const addTodo = (e) => {
  if (newTodo.value !== '') {
    arr.value.push(newTodo.value);
    newTodo.value = '';
    console.log(arr.value);
  }
};

const delItem = (a) => {
  console.log(a);
  arr.value.splice(a, 1);
};
</script>

<style>
button {
  background-color: #7cacf8;
  border-radius: 0.25rem;
}
</style>
