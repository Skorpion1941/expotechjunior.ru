<script lang="ts" setup>
const modalValue = ref();
</script>

<template>
  <UserAdminTable></UserAdminTable>
</template>

<style scoped lang="scss">
.main-admin {
  display: flex;
  width: 100%;
  justify-content: space-around;
  div {
    padding: 10px;
    width: 100%;
    text-align: center;
    border: 2px solid $first-color;
    background-color: $first-color;
    color: white;
    transition: background-color 0.5s ease-in-out;
    &:hover {
      background-color: $second-color;
      border-color: white;
    }
  }
  .click {
    background-color: $second-color;
    border-color: white;
  }
}
</style>
