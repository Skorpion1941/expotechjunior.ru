<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { object } from "yup";
import { openModal } from "~/components/modal/useModal";
export interface TableData {
  name: string;
  table: string;
  select: boolean;
  nameCreateModal: string;
  titleCreateModal: string;
}
const TABLE_DATA = ref<TableData[]>([
  {
    name: "Пользователи",
    table: "profile",
    select: false,
    nameCreateModal: "projectCreate",
    titleCreateModal: "Добавить проект",
  },
  {
    name: "Проекты",
    table: "project",
    select: true,
    nameCreateModal: "projectCreate",
    titleCreateModal: "Добавить проект",
  },
  {
    name: "Направления",
    table: "direction",
    select: false,
    nameCreateModal: "projectCreate",
    titleCreateModal: "Добавить проект",
  },
  {
    name: "Организации",
    table: "organization",
    select: false,
    nameCreateModal: "projectCreate",
    titleCreateModal: "Добавить проект",
  },
  {
    name: "Рассписагие",
    table: "direction",
    select: false,
    nameCreateModal: "projectCreate",
    titleCreateModal: "Добавить проект",
  },
  {
    name: "Формы оценивания",
    table: "profile",
    select: false,
    nameCreateModal: "projectCreate",
    titleCreateModal: "Добавить проект",
  },
]);
const table = ref();
table.value = TABLE_DATA.value;
const modelValue = ref({
  name: "Таблица проекты",
  table: "project",
  select: true,
  nameCreateModal: "projectCreate",
  titleCreateModal: "Добавить проект",
});
const filters = reactive({ searchQuery: "" });

const selectTable = (item: any) => {
  table.value.forEach((obj: any) => {
    if (obj.name == item.name) {
      obj.select = true;
      return;
    }
    obj.select = false;
  });
  modelValue.value = item;
  console.log(modelValue.value);
};
</script>

<template>
  <UserAdminTableList :array="table" @select-table="selectTable">
  </UserAdminTableList>
  <section>
    <UiTitle class="title" :name="modelValue.name"></UiTitle>
    <div style="display: flex; gap: 10px">
      <button
        @click="
          openModal(
            modelValue.nameCreateModal,
            modelValue.titleCreateModal,
            false
          )
        "
      >
        Добавить
      </button>
      <UiInput
        name="search"
        type="url"
        placeholder="Поиск"
        v-model:model-value="filters.searchQuery"
      ></UiInput>
    </div>
  </section>
  <UserAdminTableProject
    v-if="modelValue.table == 'project'"
    :search="filters.searchQuery"
  ></UserAdminTableProject>
  <UserAdminTableProfile
    v-if="modelValue.table == 'profile'"
    :search="filters.searchQuery"
  ></UserAdminTableProfile>
  <UserAdminTableOrganization
    v-if="modelValue.table == 'organization'"
    :search="filters.searchQuery"
  ></UserAdminTableOrganization>
  <UserAdminTableDirection
    v-if="modelValue.table == 'direction'"
    :search="filters.searchQuery"
  ></UserAdminTableDirection>
</template>

<style scoped lang="scss">
section {
  width: 80%;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  .title {
    width: 500px;
  }
}
</style>
