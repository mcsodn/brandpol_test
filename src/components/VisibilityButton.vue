<script setup>
import { ref } from "vue";

const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};
</script>

<style scoped>
img {
  cursor: pointer;
}
</style>

<template>
  <img src="./../assets/icons/ext_icon.svg" @click="toggle" />
  <Popover ref="op">
    <Button
      label="Скрыть виджет"
      severity="contrast"
      variant="text"
      icon="pi pi-eye-slash"
      iconPos="Left"
      class="w-full justify-between!"
    />
  </Popover>
</template>
