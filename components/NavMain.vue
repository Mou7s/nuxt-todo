<template>
  <div
    v-for="(item, index) in list"
    :key="index"
    class="relative group hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
  >
    <input type="checkbox" v-model="item.completed" />
    {{ item.title }}
    <button
      @click="del(item, index)"
      class="absolute right-1 opacity-0 group-hover:opacity-100"
    >
      delete
    </button>
  </div>
</template>

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

let del = (item: object, index: number) => {
  console.log(item);
  console.log(index);
};
</script>
