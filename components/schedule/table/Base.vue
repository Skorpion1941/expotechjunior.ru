<script setup>
const props = defineProps(["modelValue", "head", "columnTemplates"]);

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
        <div class="table-head__name" v-for="(element, i) of head" :key="i">
          <h2 class="name">{{ element.name }}</h2>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table {
  background-color: #fff;
  width: 100%;
  margin-bottom: 20px;
  &-wrapper {
    display: flex;
    justify-content: center;
  }
  &-head {
    padding-bottom: 10px;
    border-bottom: 3px solid $third-color;
    display: grid;
    align-items: center;
    background: #fff;
    &__name {
      width: 100%;
      height: 100%;
      .name {
        text-align: center;
        color: $third-color;
      }
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
}
</style>
