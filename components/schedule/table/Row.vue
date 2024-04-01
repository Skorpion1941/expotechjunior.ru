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
});
</script>
<template>
  <div
    class="table-row"
    :style="{
      'grid-template-columns': columnTemplates,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.table-row {
  border-bottom: 3px solid $third-color;
  position: relative;
  display: grid;
  background-color: white;
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
