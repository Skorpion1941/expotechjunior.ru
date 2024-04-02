<script lang="ts" setup>
import { defineProps } from "vue";

interface MailForm {
  name: string;
}
const posts = defineProps<MailForm>();
</script>

<template>
  <!-- Пользователь -->
  <ModalFormUserLogin v-if="name == 'login'"></ModalFormUserLogin>
  <ModalFormUserRegister
    v-if="name == 'register'"
    role="user"
  ></ModalFormUserRegister>
  <ModalFormUserRegister
    v-if="name == 'registerExpert'"
    role="expert"
  ></ModalFormUserRegister>
  <ModalFormUserRecoverPassword
    v-if="name == 'confirmEmail'"
    :confirm="true"
  ></ModalFormUserRecoverPassword>
  <ModalFormUserRecoverPassword
    v-if="name == 'recoverPassword'"
    :confirm="false"
  ></ModalFormUserRecoverPassword
  ><ModalFormUserUpdate v-if="name == 'userUpdate'" role="user">
  </ModalFormUserUpdate>
  <ModalFormUserUpdate v-if="name == 'expertUpdate'" role="expert">
  </ModalFormUserUpdate>

  <!-- Проект -->
  <ModalFormProjectCreate v-if="name == 'projectCreate'">
  </ModalFormProjectCreate>
  <ModalFormProjectUpdate v-if="name == 'projectUpdate'">
  </ModalFormProjectUpdate>
  <ModalFormScheduleCreate
    v-if="name == 'scheduleCreate'"
  ></ModalFormScheduleCreate>
  <ModalFormDirectionCreate
    v-if="name == 'directionCreate'"
  ></ModalFormDirectionCreate>
  <ModalFormOrganizationCreate v-if="name == 'organizationCreate'">
  </ModalFormOrganizationCreate>
</template>

<style scoped lang="scss"></style>
