<script setup>
const props = defineProps({
  id: Number,
  name: String,
  checked: { type: Boolean, default: false },
  onClickOption: Function,
});
</script>
<template>
  <label class="task">
    <input type="checkbox" @change="onClickOption" name="" :checked="checked" />
    <label>{{ props.name }}</label>
  </label>
</template>
<style scoped lang="scss">
.task {
  display: flex;
  margin: 5px 0px;
}
input {
  padding: 5px;
  margin: 10px;
}
label {
  align-items: center;
}
</style>
