<script setup>
import { ref } from "vue";
import { allDirections } from "~/util/useDirections";

const props = defineProps(["search"]);
const { search } = toRefs(props);
const tableHeads = [
  { name: "№", select: false },
  { name: "Название", select: false },
  { name: "Аббревиатура", select: false },
  { name: "Описание", select: false },
  { name: "Цвет", select: false },
  { name: "", select: false },
];

const tableSizeColumns = "60px 300px 300px 400px 110px 240px ";

const modelValue = ref(["Все", "Все", "Все", "Все", "Все"]);
const directions = ref();
directions.value = allDirections.value;

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
    name: "short_name",
    image: false,
  },
  {
    id: 3,
    name: "description",
    image: false,
  },
]);
const filtersProject = () => {
  directions.value = allDirections.value;

  if (search.value != "") {
    directions.value = Object.values(directions.value).filter((item) => {
      return item.name.lastIndexOf(search.value) != -1;
    });
  }
};
onMounted(() => {
  filtersProject();
});
watch(search, () => {
  filtersProject();
});
</script>

<template>
  <UiTableBase
    width="400px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
    <div class="tables">
      <UiTableRow
        v-for="arr in directions"
        :key="arr.id"
        :columnTemplates="tableSizeColumns"
        bgRow="black"
      >
        <UiTableColumn
          v-for="index in indexs"
          :key="index.id"
          :columnTitle="index.name"
          :image="index.image"
          :src-image="arr.photo"
        >
          {{ arr[`${index.name}`] }}
        </UiTableColumn>
        <UiTableColumn>
          <div class="block-color" :style="{ background: arr.color }"></div>
        </UiTableColumn>
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
.block-color {
  width: 100px;
  height: 100px;
}
</style>
