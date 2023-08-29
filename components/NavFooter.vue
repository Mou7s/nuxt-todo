<script setup lang="ts">
let completed = ref(1);
let all = ref(3);
</script>

<template>
  <div>
    <div>Completed:{{ completed }} All:{{ all }}</div>
    <button v-if="completed > 0">delete completed</button>
  </div>
</template>
