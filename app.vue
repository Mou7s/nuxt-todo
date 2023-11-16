<script setup>
const todos = ref([]);

const addTodo = (todo) => {
  todos.value.push(todo);
};
</script>

<template>
  <UContainer>
    <UCard class="mt-10"> <p class="font-bold text-center">ongoing</p></UCard>
    <UCard class="mt-10"> <p class="font-bold text-center">done</p></UCard>
  </UContainer>
</template>
