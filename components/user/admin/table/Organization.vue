<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { allDirections } from "~/util/useDirections";
import { allOrganizations } from "~/util/useOrganizations";

const props = defineProps(["search"]);
const { search } = toRefs(props);
const tableHeads = [
  { name: "№", select: false },
  { name: "Наизвание", select: false },
  { name: "Город", select: false },
  { name: "", select: false },
];

const tableSizeColumns = "60px 400px 300px 240px";

const organizations = ref();
organizations.value = allOrganizations.value;
const indexs = ref([
  {
    id: 0,
    name: "id",
    image: false,
  },
  {
    id: 1,
    name: "name",
    image: false,
  },
  {
    id: 2,
    name: "city",
    image: false,
  },
]);
const filtersOrganizations = () => {
  organizations.value = allOrganizations.value;

  if (search.value != "") {
    organizations.value = Object.values(organizations.value).filter(
      (item: any) => {
        return item.name.lastIndexOf(search.value) != -1;
      }
    );
  }
  console.log(organizations.value);
};
onMounted(() => {
  filtersOrganizations();
});
watch(search, () => {
  filtersOrganizations();
});
watch(allOrganizations, () => {
  filtersOrganizations();
});
</script>

<template>
  <UiTableBase
    width="400px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
    <UiTableRow
      v-for="arr in organizations"
      :key="arr.id"
      :columnTemplates="tableSizeColumns"
    >
      <UiTableColumn
        v-for="index in indexs"
        :key="index.id"
        :columnTitle="index.name"
        :image="index.image"
      >
        {{ arr[`${index.name}`] }}
      </UiTableColumn>

      <UiTableColumn>
        <div class="btn">
          <button>Изменить</button>
          <button>Удалить</button>
        </div>
      </UiTableColumn>
    </UiTableRow>
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
