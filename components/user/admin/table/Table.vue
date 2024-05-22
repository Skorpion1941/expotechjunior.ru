<script lang="ts" setup>
import { TABLE_DATA } from "../admin.data";

const { open } = useModalStore();

const table = ref();
table.value = TABLE_DATA.value;
const modelValue = ref({
  name: "Проекты",
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
    <div class="search">
      <button
        @click="
          open({
            name: modelValue.nameCreateModal,
            title: modelValue.titleCreateModal,
          })
        "
      >
        <h3>Добавить</h3>
      </button>
      <UiInput
        style="margin-top: 2px"
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
  <UserAdminTableDirection
    v-if="modelValue.table == 'direction'"
    :search="filters.searchQuery"
  ></UserAdminTableDirection>
  <UserAdminTableSchedule
    v-if="modelValue.table == 'schedule'"
    :search="filters.searchQuery"
  ></UserAdminTableSchedule>

  <UserAdminTableForm
    v-if="modelValue.table == 'form'"
    :search="filters.searchQuery"
  ></UserAdminTableForm>
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
  .search {
    display: flex;
    gap: 10px;
    align-self: center;
  }
}
</style>
