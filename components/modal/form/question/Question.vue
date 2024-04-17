<script setup lang="ts">
const typeQuestion = ref(["Один вариант", "select"]);
const typesQuestion = ref([
  { name: "Один вариант", code: "select" },
  { name: "Множество вариантов", code: "multiSelect" },
  { name: "Короткий текст", code: "shortText" },
  { name: "Длинный текст", code: "text" },
]);
</script>
<template>
  <div class="question">
    <div>
      <UiSelect
        v-model:model-value="typeQuestion"
        :array="typesQuestion"
        :name="0"
        placeholder="Тип вопроса"
      ></UiSelect>
    </div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    background: black;
  }
}
</style>
