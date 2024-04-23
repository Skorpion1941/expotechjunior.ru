<script setup>
const props = defineProps({
  id: Number,
  name: String,
  option: { type: Boolean, default: false },
  onClickOption: Function,
});
</script>
<template>
  <label class="task" @click="onClickOption" :class="{ select: option }">
    <label>{{ props.name }}</label>
  </label>
</template>
<style scoped lang="scss">
.task {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ccc;
  &:hover {
    background: $second-color;
  }
  label {
    align-items: center;
    padding: 10px;
    user-select: none;
  }
}
input {
  padding: 5px;
  margin: 10px;
}
.select {
  background: $second-color;
}
</style>
