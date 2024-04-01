<script setup>
const props = defineProps({
  id: Number,
  surname: String,
  name: String,
  onClickMinus: Function,
});
</script>
<template>
  <div class="member">
    <div>
      <label>{{ surname }}</label>
      <label>{{ name }}</label>
    </div>
    <div>
      <Icon
        style="cursor: pointer"
        @click="onClickMinus"
        name="tabler:minus"
        color="black"
        size="30px"
      ></Icon>
    </div>
  </div>
</template>
<style scoped lang="scss">
.member {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ccc;
  div {
    align-self: center;
    &:first-child {
      width: 91.5%;
      font-size: 18px;
      display: flex;
      justify-content: space-around;
    }
    &:last-child {
      width: 8.5%;
      border-left: 1px solid #ccc;
      background: #f5f5f5;
    }
  }
}
</style>
