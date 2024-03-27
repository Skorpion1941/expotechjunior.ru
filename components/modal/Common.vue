<script lang="ts" setup>
import { defineProps } from "vue";
import { closeModal, openModal } from "./useModal";

interface Modal {
  title: string;
  nameForm: string;
  backShow: boolean;
  fromTitleModal: string;
  fromNameModal: string;
}
const props = defineProps<Modal>();
</script>

<template>
  <div class="modal">
    <div class="modals">
      <div class="title">
        <button
          v-if="backShow"
          @click="openModal(fromNameModal, fromTitleModal, backShow)"
          class="back"
        >
          <Icon
            name="fluent:arrow-left-28-filled"
            color="white"
            size="35px"
          ></Icon>
        </button>
        <button class="close" @click="closeModal">
          <Icon name="akar-icons:cross" color="white" size="35px"></Icon>
        </button>
        <h1>
          <b>{{ title }}</b>
        </h1>
      </div>
      <div class="form" v-auto-animate>
        <ModalMainForm :name="nameForm"></ModalMainForm>
      </div>
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
  .modals {
    position: relative;
    background-color: #fefefe;
    margin: 5% auto;
    border: 1px solid #888;
    width: 550px;
    min-height: 100px;
    border-radius: 20px;

    .form {
      max-height: 700px;
      overflow: auto;
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
  }
}
.back {
  position: absolute;
  color: white;
  border: none;
  background: none;
  left: 10px;
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
