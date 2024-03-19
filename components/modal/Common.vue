<script lang="ts" setup>
import { defineProps } from "vue";
import { closeModal } from "./useModal";

interface Modal {
  title: string;
  nameForm: string;
}
const props = defineProps<Modal>();
</script>

<template>
  <div class="modal">
    <div class="modals">
      <div class="title">
        <button class="close" @click="closeModal">
          <Icon name="akar-icons:cross" color="white" size="30px"></Icon>
        </button>
        <h1>
          <b>{{ title }}</b>
        </h1>
      </div>
      <ModalMainForm :name="nameForm"></ModalMainForm>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
  .modals {
    position: relative;
    overflow: hidden;
    background-color: #fefefe;
    margin: 5% auto;
    border: 1px solid #888;
    width: 550px;
    min-height: 100px;
    border-radius: 20px;
  }
}
.close {
  position: absolute;
  color: white;
  border: none;
  background: none;
  right: 10px;
}
.title {
  width: 100%;
  background-color: $second-color;
  text-align: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  h1,
  h2 {
    margin: 0px;
    font-size: 28px;
    padding: 20px 0;
    color: $text-color;
  }
}
</style>
