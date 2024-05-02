<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { allProfiles } from "~/util/useProfiles";
import { allRoles } from "~/util/useRoles";

const props = defineProps(["search"]);
const { search } = toRefs(props);
const modalStore = useModalStore();
const tableHeads = [
  { name: "Аватар", select: false },
  { name: "ФИО", select: false },
  { name: "Организация", select: false },
  { name: "Город", select: false },
  { name: "Направление", select: false },
  { name: "Роль", select: true },
  { name: "O себе", select: false },
];

const tableSizeColumns = "120px 320px 350px 200px 355px 280px 400px";

const modelValue = ref(["Все", "Все", "Все", "Все"]);
const roles = ref();
const profiles = ref();

const findRoles = (name: string) => {
  const role = Object.values(allRoles.value).find(
    (role: any) => role.code == name
  );
  return `${role.name}`;
};
const filtersProfiles = () => {
  profiles.value = allProfiles.value;
  console.log(modelValue.value);
  if (modelValue.value.length > 0 && modelValue.value[3] != "Все") {
    profiles.value = Object.values(profiles.value).filter(
      (profile: any) => profile.role == modelValue.value[3]
    );
  }
  if (search.value != "") {
    profiles.value = Object.values(profiles.value).filter((item: any) => {
      return (
        item.name.lastIndexOf(search.value) != -1 ||
        item.surname.lastIndexOf(search.value) != -1 ||
        item.patronymic.lastIndexOf(search.value) != -1
      );
    });
  }
};

onMounted(() => {
  roles.value = Object.values(allRoles.value);
  roles.value.unshift({
    id: 0,
    createdAt: "",
    name: "Все",
    code: "Все",
  });
  filtersProfiles();
});
watch(modelValue, () => {
  filtersProfiles();
});
watch(search, () => {
  filtersProfiles();
});
watch(allProfiles, () => {
  filtersProfiles();
});
</script>

<template>
  <UiTableBase
    v-model:model-value="modelValue"
    :v-bind="modelValue"
    :array="roles"
    :name="2"
    width="280px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
    <UiTableRow
      v-for="item in profiles"
      :key="item.id"
      :columnTemplates="tableSizeColumns"
      bgRow="black"
    >
      <UiTableColumn>
        <UiAvatar
          style="margin: 10px 0"
          :path="item.avatar_url"
          width="100px"
          height="100px"
        ></UiAvatar>
      </UiTableColumn>
      <UiTableColumn>
        {{ item.surname }} {{ item.name }} {{ item.patronymic }}
      </UiTableColumn>
      <UiTableColumn>{{ item.organization }}</UiTableColumn>
      <UiTableColumn>{{ item.city }}</UiTableColumn>
      <UiTableColumn>
        <div
          style="display: flex"
          v-for="direction in item.directions"
          :key="direction.id"
        >
          <p>{{ direction.name }};</p>
        </div>
      </UiTableColumn>
      <UiTableColumn> {{ findRoles(item.role) }}</UiTableColumn>
      <UiTableColumn> {{ item.about_me }}</UiTableColumn>
    </UiTableRow>
  </UiTableBase>
</template>
<style scoped lang="scss">
.btn {
  display: flex;
  gap: 10px;
}
</style>
