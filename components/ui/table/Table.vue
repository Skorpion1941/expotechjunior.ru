<script setup>
import { ref, computed } from "vue";
import { allProjects } from "~/util/useProjects";

const props = defineProps({
  tableHeads: {
    type: String,
    required: false,
  },
  tableSizeColumns: {
    type: String,
    required: false,
  },
  array: {
    type: String,
    required: false,
  },
});

const tableHeads = [
  { name: "№", select: false },
  { name: "Название", select: false },
  { name: "Фото", select: false },
  { name: "Направление", select: true },
  { name: "", select: false },
];

const tableSizeColumns = "50px 200px 300px 300px 150px";

const sortField = ref("id");
const typeSort = ref("asc");
const array = ref();
array.value = allProjects.value;

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
    id: 3,
    name: "title_photo",
    image: true,
  },
]);

const booksSorting = computed(() => {
  return array.value.sort((a, b) => {
    let modifier = 1;
    if (typeSort.value === "desc") modifier = -1;
    if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
    if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
    return 0;
  });
});
</script>

<template>
  <h1 class="heading-1">Table</h1>
  <span>Sort Field: {{ sortField }}</span
  ><br />
  <span>Type Sort: {{ typeSort }}</span>
  <br />
  <UiTableBase :head="tableHeads" :columnTemplates="tableSizeColumns">
    <UiTableRow
      v-for="arr in array"
      :key="arr.id"
      :columnTemplates="tableSizeColumns"
      bgRow="black"
    >
      <UiTableColumn
        v-for="index in indexs"
        :key="index.id"
        :columnTitle="index.name"
        :image="index.image"
        :src-image="arr.title_photo"
      >
        {{ arr[`${index.name}`] }}
      </UiTableColumn>
      <UiTableColumn>
        {{ arr.directions.name }}
      </UiTableColumn>
      <UiTableColumn>
        <button>Просмотр</button>
      </UiTableColumn>
    </UiTableRow>
  </UiTableBase>
</template>
