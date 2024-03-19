<script setup>
const props = defineProps({
  id: Number,
  name: String,
  color: String,
});
</script>
<template>
  <div
    class="checked"
    :style="{ border: '2px solid ' + props.color, color: props.color }"
  >
    <h3>{{ props.name }}</h3>
  </div>
</template>
<style scoped lang="scss">
.checked {
  padding: 5px 10px;
  border-radius: 20px;
  text-align: center;
  align-self: center;
}
</style>
