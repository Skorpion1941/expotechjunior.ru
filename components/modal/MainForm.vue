<script lang="ts" setup>
import { defineProps } from "vue";

interface MailForm {
  name: string;
}
const posts = defineProps<MailForm>();
</script>

<template>
  <!-- Вход -->
  <ModalFormUserLogin v-if="name == 'login'"></ModalFormUserLogin>
  <!-- Регистрация пользователя -->
  <ModalFormUserRegister
    v-if="name == 'register'"
    role="user"
  ></ModalFormUserRegister>
  <!-- Регистрация эксперта -->
  <ModalFormUserRegister
    v-if="name == 'registerExpert'"
    role="expert"
  ></ModalFormUserRegister>
  <!-- Проверка почты -->
  <ModalFormUserRecoverPassword
    v-if="name == 'confirmEmail'"
    :confirm="true"
  ></ModalFormUserRecoverPassword>
  <!-- Востановление пароля -->
  <ModalFormUserRecoverPassword
    v-if="name == 'recoverPassword'"
    :confirm="false"
  ></ModalFormUserRecoverPassword>
  <ModalFormProjectCreate v-if="name == 'projectCreate'">
  </ModalFormProjectCreate>
</template>

<style scoped lang="scss"></style>
