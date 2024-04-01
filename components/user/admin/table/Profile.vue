<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { allProfiles } from "~/util/useProfiles";
import { allOrganizations } from "~/util/useOrganizations";
import { allRoles } from "~/util/useRoles";

const props = defineProps(["search"]);
const { search } = toRefs(props);
const tableHeads = [
  { name: "Аватар", select: false },
  { name: "ФИО", select: false },
  { name: "Организация", select: false },
  { name: "Направление", select: false },
  { name: "Роли", select: true },
  { name: "O себе", select: false },
  { name: "", select: false },
];

const tableSizeColumns = "120px 300px 300px 350px 250px 300px 240px";

const modelValue = ref(["Все", "Все", "Все", "Все"]);
const role = ref();

const profiles = ref();

const filters = reactive({
  sortRole: [],
});
const findOrganization = (id: number) => {
  const organization = Object.values(allOrganizations.value).find(
    (org: any) => org.id == id
  );
  return `${organization.name}`;
};
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
  role.value = Object.values(allRoles.value);
  if (role.value[0].name != "Все")
    role.value.unshift({
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
    :array="role"
    :name="2"
    width="250px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
    <div class="tables">
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
        <UiTableColumn>
          {{ findOrganization(item.organization_id) }}</UiTableColumn
        >

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
        <UiTableColumn>
          <div class="btn">
            <button>Изменить</button>
            <button>Удалить</button>
          </div>
        </UiTableColumn>
      </UiTableRow>
    </div>
  </UiTableBase>
</template>
<style scoped lang="scss">
.tables {
  width: 100%;
  max-height: 900px;
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
.btn {
  display: flex;
  gap: 10px;
}
</style>
