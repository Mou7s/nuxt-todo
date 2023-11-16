<script setup>
const todos = ref(['789']);
const todo = ref('');
const dones = ref(['123', '456']);

const addTodo = () => {
  todos.value.push(todo.value);
  todo.value = '';
};

const doneTodo = (index) => {
  dones.value.push(todos.value[index]);
  todos.value.splice(index, 1);
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

      <div v-for="(todo, index) of todos" class="text-center">
        <p class="m-2">
          {{ todo }} <UButton @click="doneTodo(index)">Del</UButton>
        </p>
      </div></UCard
    >
    <UCard class="mt-10">
      <p class="font-bold text-center">done</p>

      <div v-for="(done, index) of dones" class="text-center">
        <p class="m-2">
          {{ done }}
        </p>
      </div>
    </UCard>
  </UContainer>
</template>
