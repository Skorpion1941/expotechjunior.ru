<script setup>
const props = defineProps([
  "modelValue",
  "head",
  "columnTemplates",
  "color",
  "size",
]);

const isListVisible = ref(false);
const { modelValue, head, columnTemplates } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const toggleList = () => {
  isListVisible.value = !isListVisible.value;
};
const addOption = (item) => {
  emit("update:modelValue", Object.values(item));
  console.log(modelValue.value);
};
</script>
<template>
  <div class="table-wrapper">
    <div class="table">
      <div
        class="table-head"
        :style="{ 'grid-template-columns': columnTemplates }"
      >
        <div
          class="table-head__name"
          :style="{ color: props.color }"
          v-for="(element, i) of head"
          :key="i"
        >
          <h3 class="name">
            {{ element.name }}
          </h3>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table {
  width: 100%;
  margin-bottom: 20px;

  &-wrapper {
    display: flex;
    justify-content: center;
  }
  &-head {
    width: 100%;
    padding-bottom: 10px;
    display: grid;
    align-items: center;
    &__name {
      width: 100%;
      height: 100%;
      border-bottom: 3px solid;
      .name {
        text-align: start;
        margin-left: 5px;
      }
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
}
</style>
