<template>
  <div
    class="group grid grid-flow-col place-content-between hover:bg-neutral-700"
  >
    <div>
      {{ text }}
    </div>
    <div>
      <button
        @click="buttonClick"
        class="cursor-pointer rounded-full opacity-0 group-hover:opacity-100"
      >
        delete
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['text']);
const emit = defineEmits(['deleteItem']);

const buttonClick = () => {
  emit('deleteItem');
};
</script>

<style></style>
