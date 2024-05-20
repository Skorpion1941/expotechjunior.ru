<script setup>
import { onMounted } from "vue";
import { inject, ref } from "vue";

const props = defineProps(["array", "modelValue"]);
const isListVisible = ref(false);

const { modelValue, array } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const toggleList = () => {
  isListVisible.value = !isListVisible.value;
};
</script>
<template>
  <div class="multi-selector">
    <div class="flex" style="gap: 5px">
      <label class="title">Направления:</label>
      <p style="color: red">*</p>
    </div>
    <div class="selector" :class="{ select_show: isListVisible }">
      <div class="select-field">
        <div>
          <UiSelectCheckedList :array="modelValue"></UiSelectCheckedList>
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
        <UiSelectMultipleOptionList
          :directions="array"
          :array="modelValue"
        ></UiSelectMultipleOptionList>
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
  border-radius: 15px;
  .select-field {
    height: 49px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    div {
      &:first-child {
        margin-left: 5px;
        display: flex;
        gap: 5px;
        overflow: hidden;
      }
      &:last-child {
        border-left: 1px solid #ccc;
        width: 7%;
        height: 100%;
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

.list {
  width: 100%;
  background: white;
  box-shadow: 0 30px 60px rgb(0, 0, 0, 0.2);
  z-index: 4;
  display: flex;
  position: absolute;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0 0 15px 15px;
}
.select_show {
  border-radius: 15px 15px 0 0;
}
.show {
  display: none;
}
.rotate180 {
  transform: rotate(-60deg);
}
</style>
