<script lang="ts" setup></script>

<template>
  <div class="modal">
    <div class="title">
      <button class="close">
        <Icon name="akar-icons:cross" color="white" size="30px"></Icon>
      </button>
      <h1>
        <b>Регистрация </b>
      </h1>
    </div>
    <ModalFormUserRegister role="expert"></ModalFormUserRegister>
  </div>
</template>

<style scoped lang="scss">
.modal {
  max-width: 35%;
  min-width: 500px;
  margin: 100px auto;
  border: 2px solid $second-color;
  border-radius: 17px;

  background-color: white;
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
