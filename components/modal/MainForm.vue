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
  <!-- Добавление проекта -->
  <ModalFormProjectCreate v-if="name == 'projectCreate'">
  </ModalFormProjectCreate>
  <ModalFormUserUpdate v-if="name == 'userUpdate'" role="user">
  </ModalFormUserUpdate>

  <ModalFormUserUpdate v-if="name == 'expertUpdate'" role="expert">
  </ModalFormUserUpdate>
</template>

<style scoped lang="scss"></style>
