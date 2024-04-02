<script setup>
const props = defineProps({
  image: {
    type: Boolean,
    required: false,
  },
  srcImage: {
    type: String,
    required: false,
  },
  columnTitle: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div class="table-column">
    <span class="table-column__title" v-if="columnTitle"
      >{{ columnTitle }}:
    </span>
    <slot v-if="!image"></slot>
    <UiPhoto v-else :path="srcImage" height="120px" width="180px"></UiPhoto>
  </div>
</template>

<style lang="scss" scoped>
.table-column {
  position: relative;
  padding: 5px 10px;
  &-image {
    max-width: 100%;
    @media screen and (max-width: 767px) {
      max-width: 200px;
    }
  }
  &__title {
    margin-right: 5px;
    display: none;
    @media screen and (max-width: 767px) {
      display: inline-block;
    }
  }
}
</style>
