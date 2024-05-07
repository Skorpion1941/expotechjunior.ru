<script lang="ts" setup>
const { modal } = useModalStore();
</script>

<template>
  <!-- Пользователь -->
  <ModalFormUserLogin v-if="modal.name == 'login'"></ModalFormUserLogin>
  <ModalFormUserRegister v-if="modal.name == 'register'" role="user">
  </ModalFormUserRegister>
  <ModalFormUserRegister v-if="modal.name == 'registerExpert'" role="expert">
  </ModalFormUserRegister>
  <ModalFormUserEmailConfirm v-if="modal.name == 'emailConfirm'">
  </ModalFormUserEmailConfirm>
  <ModalFormUserRecoverPassword v-if="modal.name == 'recoverPassword'">
  </ModalFormUserRecoverPassword>
  <ModalFormUserCreate v-if="modal.name == 'userCreate'"></ModalFormUserCreate>
  <ModalFormUserUpdate v-if="modal.name == 'userUpdate'" role="user">
  </ModalFormUserUpdate>
  <ModalFormUserUpdate v-if="modal.name == 'expertUpdate'" role="expert">
  </ModalFormUserUpdate>

  <!-- Проект -->
  <ModalFormProjectCreate v-if="modal.name == 'projectCreate'">
  </ModalFormProjectCreate>
  <ModalFormProjectUpdate v-if="modal.name == 'projectUpdate'">
  </ModalFormProjectUpdate>
  <ModalFormProject v-if="modal.name == 'project'"></ModalFormProject>
  <!-- Расписание -->
  <ModalFormScheduleCreate v-if="modal.name == 'scheduleCreate'">
  </ModalFormScheduleCreate>
  <ModalFormScheduleUpdate v-if="modal.name == 'scheduleUpdate'">
  </ModalFormScheduleUpdate>
  <!-- Направления -->
  <ModalFormDirectionCreate v-if="modal.name == 'directionCreate'">
  </ModalFormDirectionCreate>
  <ModalFormDirectionUpdate v-if="modal.name == 'directionUpdate'">
  </ModalFormDirectionUpdate>
  <!-- Яндекс формы -->
  <ModalFormYandexformCreate v-if="modal.name == 'formCreate'">
  </ModalFormYandexformCreate
  ><ModalFormYandexformUpdate v-if="modal.name == 'formUpdate'">
  </ModalFormYandexformUpdate>
  <ModalFormDelete v-if="modal.name == 'delete'"> </ModalFormDelete>
  <ModalFormNotice v-if="modal.name == 'notice'"></ModalFormNotice>
</template>

<style scoped lang="scss"></style>
