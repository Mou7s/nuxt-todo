<script setup lang="ts">
let value = ref('');
let enter = () => {
  console.log(value.value);
};
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="task name?"
      v-model="value"
      @keydown.enter="enter"
    />
  </div>
</template>
