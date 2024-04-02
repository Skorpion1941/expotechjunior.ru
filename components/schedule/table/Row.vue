<script setup>
const props = defineProps({
  columnTemplates: {
    type: String,
    required: false,
  },
  bgRow: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div
    class="table-row"
    :style="{
      'grid-template-columns': columnTemplates,
      fontSize: props.size,
      color: props.color,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.table-row {
  border-bottom: 3px solid;
  position: relative;
  display: grid;
  align-items: center;
  @media screen and (max-width: 767px) {
    display: block;
  }
  &:last-child {
    border-bottom: none;
  }
  &--items-center {
    justify-items: center;
  }
}
</style>
