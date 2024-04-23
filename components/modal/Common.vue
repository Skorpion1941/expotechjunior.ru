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
            class="icon"
            name="fluent:arrow-left-28-filled"
            color="white"
            size="35px"
          ></Icon>
        </button>
        <button class="close" @click="closeModal">
          <Icon
            class="icon"
            name="akar-icons:cross"
            color="white"
            size="35px"
          ></Icon>
        </button>
        <h2>
          <b>{{ title }}</b>
        </h2>
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
  z-index: 10;
  width: 100%;
  height: 100%;
  .modals {
    position: relative;
    background-color: #fefefe;
    margin: 50px auto;
    border: 1px solid #888;
    width: 550px;
    min-height: 100px;
    border-radius: 20px;
    overflow: hidden;

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
    padding: 20px 0;
    color: $text-color;
  }
}
@media screen and (max-width: 1280px) {
  .modal {
    .modals {
      margin: 20px auto;
      width: 400px;
      .form {
        max-height: 480px;
      }
    }
  }
}
</style>
