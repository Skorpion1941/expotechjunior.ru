<script setup>
import { onMounted } from "vue";
import { inject, ref } from "vue";

const props = defineProps(["array", "modelValue", "label", "name"]);
const isListVisible = ref(false);
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const toggleList = () => {
  isListVisible.value = !isListVisible.value;
};
const modal = ref([]);
const addOption = (item) => {
  emit("update:modelValue", Object.values(item));
  console.log(modelValue.value);
};
</script>
<template>
  <div class="multi-selector">
    <label class="title" v-if="label">{{ label }}</label>
    <div class="selector" :class="{ select_show: isListVisible }">
      <div class="select-fields">
        <div>
          <label>{{ modelValue[props.name] }}</label>
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
  .title {
    font-size: 20px;
  }
}
.selector {
  width: 100%;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 20px;
  .select-fields {
    width: 100%;
    display: flex;
    padding: 0 !important;
    label {
      padding: 10px 20px;
    }
    div {
      &:first-child {
        width: 100%;
        display: flex;
      }
      &:last-child {
        border-left: 1px solid #ccc;
        width: 7%;
        .down-arrow {
          font-size: 1.5rem;
          margin: 10px 0 0 5px;
          display: inline-block;
          cursor: pointer;
          transition: 0.2s linear;
        }
      }
    }
  }
}
.list::-webkit-scrollbar {
  width: 12px;
}
.list::-webkit-scrollbar-track {
  background: $second-color;
  border-radius: 0 0 20px 0;
}
.list::-webkit-scrollbar-thumb {
  background-color: $first-color;
  border-radius: 20px;
}
.list {
  width: 100%;
  height: 100px;
  overflow: auto;
  background: white;
  scrollbar-width: var(--scrollbarWidth);
  scrollbar-color: var(--scrollbarThumb) var(--scrollbarBg);
  box-shadow: 0 30px 60px rgb(0, 0, 0, 0.2);
  z-index: 4;
  display: flex;
  position: absolute;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0 0 20px 20px;
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
