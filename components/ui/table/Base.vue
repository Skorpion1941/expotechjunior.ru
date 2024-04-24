<script setup>
const props = defineProps([
  "modelValue",
  "name",
  "array",
  "head",
  "columnTemplates",
  "width",
]);

const isListVisible = ref(false);
const { modelValue, array, head, columnTemplates } = toRefs(props);
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
          <div v-if="element.select" class="select">
            <div style="display: flex; justify-content: space-between">
              <h5 class="name">
                {{ element.name }} ({{ modelValue[props.name] }})
              </h5>

              <div>
                <span
                  class="down-arrow"
                  @click="toggleList"
                  :class="{ rotate180: isListVisible }"
                  >&blacktriangledown;</span
                >
              </div>
            </div>
            <div
              class="list"
              :style="{ width: props.width }"
              :class="{ show: !isListVisible }"
            >
              <UiSelectOptionList
                :array="array"
                :modelValue="modelValue"
                @add-option="addOption"
              ></UiSelectOptionList>
            </div>
          </div>
          <div class="name" v-else>
            <h5>{{ element.name }}</h5>
          </div>
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
  overflow: auto;
  margin-bottom: 40px;
  margin-top: 15px;
  min-height: 300px;
  border: 2px solid #eeeff4;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $first-color;
    border-radius: 20px;
  }
  &-wrapper {
    display: flex;
    justify-content: center;
  }
  &-head {
    display: grid;
    align-items: center;

    background: #fff;
    &__name {
      width: 100%;
      height: 100%;
      align-items: center;
      border-bottom: 2px solid #eeeff4;
      border-left: 2px solid #eeeff4;
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
}
.name {
  margin: 10px 5px;
}
.select {
  position: relative;
}
.down-arrow {
  font-size: 2rem;
  margin: 7px 0 0 5px;
  display: inline-block;
  cursor: pointer;
  transition: 0.2s linear;
}

.list {
  max-height: 150px;
  overflow: auto;
  background: white;
  box-shadow: 0 30px 60px rgb(0, 0, 0, 0.2);
  z-index: 4;
  display: flex;
  position: absolute;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0 0 20px 20px;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: white;
    border-radius: 0 0 20px 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $first-color;
    border-radius: 20px;
  }
}
.select_show {
  border-radius: 20px 20px 0 0;
}
.show {
  display: none;
}
.rotate180 {
  transform: rotate(-60deg);
}

@media screen and (max-width: 1280px) {
  .down-arrow {
    font-size: 1.5rem;
    margin: 5px 0 0 0;
  }
}
</style>
