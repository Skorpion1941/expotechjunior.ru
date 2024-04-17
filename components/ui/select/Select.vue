<script setup>
const props = defineProps([
  "array",
  "modelValue",
  "label",
  "placeholder",
  "name",
]);
const isListVisible = ref(false);
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const toggleList = () => {
  isListVisible.value = !isListVisible.value;
};
const addOption = (item) => {
  emit("update:modelValue", Object.values(item));
};
</script>
<template>
  <div class="multi-selector">
    <label class="title" v-if="label">{{ label }}</label>
    <div class="selector" :class="{ select_show: isListVisible }">
      <div class="select-fields">
        <div>
          <h4 v-if="modelValue != ''">{{ modelValue[props.name] }}</h4>
          <h4 class="placeholder" v-else>{{ props.placeholder }}</h4>
        </div>
        <div>
          <span
            class="down-arrow"
            @click="toggleList"
            :class="{ rotate180: isListVisible }"
            >&blacktriangledown;</span
          >
        </div>
      </div>
      <!---------List of checkboxes and options----------->

      <div class="list" :class="{ show: !isListVisible }">
        <UiSelectOptionList
          :array="props.array"
          :modelValue="modelValue"
          @add-option="addOption"
        ></UiSelectOptionList>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.multi-selector {
  position: relative;
}
.selector {
  width: 100%;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 20px;
  min-width: 300px;
  height: 42px;
  .select-fields {
    width: 100%;
    display: flex;
    padding: 0 !important;
    h4 {
      padding: 10px 20px;
    }
    .placeholder {
      font-weight: 100;
      color: #979797;
    }
    div {
      &:first-child {
        width: 100%;
        display: flex;
      }
      &:last-child {
        border-left: 1px solid #ccc;
        width: 40px;
        height: 42px;
        .down-arrow {
          font-size: 1.5rem;
          margin: 5px 0 0 5px;
          display: inline-block;
          cursor: pointer;
          transition: 0.2s linear;
        }
      }
    }
  }
}

.list {
  width: 100%;
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
</style>
