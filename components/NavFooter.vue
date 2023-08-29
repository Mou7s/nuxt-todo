<script setup lang="ts">
let completed = ref(1);
let all = ref(3);

let clear = () => {
  console.log('clear');
};
</script>

<template>
  <div class="grid grid-flow-col gap-2">
    <div>Completed:{{ completed }} All:{{ all }}</div>
    <button @click="clear" v-if="completed > 0">delete completed</button>
  </div>
</template>
