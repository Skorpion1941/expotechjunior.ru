<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  array: Object,
});

const emit = defineEmits(["selectTable"]);
</script>

<template>
  <table>
    <tr>
      <th
        v-for="item in array"
        :key="item.name"
        @click="
          () => {
            emit('selectTable', item);
          }
        "
        :class="{ click: item.select }"
      >
        <h2>{{ item.name }}</h2>
      </th>
    </tr>
  </table>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  th {
    height: 70px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border: 3px solid $first-color;
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
    border: none;
  }
}
</style>
