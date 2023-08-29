<script setup lang="ts">
let list = ref([
  {
    title: 'lunching',
    completed: false,
  },
  {
    title: 'sleeping',
    completed: false,
  },
  {
    title: 'coding',
    completed: false,
  },
]);
</script>

<template>
  <div v-for="(item, index) in list" :key="index">
    <div>
      <input type="checkbox" name="" id="" v-model="item.completed" />
      {{ item.title }}
      <button>delete</button>
    </div>
  </div>
</template>
