<script setup lang="ts">
let arr = ref(['h', 'e', 'l', 'l', 'o']);
</script>

<template>
  <div
    class="min-h-screen dark:text-neutral-50 dark:bg-neutral-800 grid gap-1 place-content-center"
  >
    <NavHeader></NavHeader>
    <NavMain></NavMain>
    <NavFooter></NavFooter>
  </div>
</template>

<style>
button {
  background-color: #7cacf8;
  border-radius: 0.25rem;
}
</style>
