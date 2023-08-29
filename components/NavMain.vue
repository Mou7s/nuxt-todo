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
  <div v-for="(item, index) in list" :key="index" class="relative group">
    <input type="checkbox" v-model="item.completed" />
    {{ item.title }}
    <button class="absolute right-1 opacity-0 group-hover:opacity-100">
      delete
    </button>
  </div>
</template>
