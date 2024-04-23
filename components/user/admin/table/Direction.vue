<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { openModal } from "~/components/modal/useModal";
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

const tableSizeColumns = "60px 500px 300px 585px 120px 340px ";

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
const filtersDirections = () => {
  directions.value = allDirections.value;

  if (search.value != "") {
    directions.value = Object.values(directions.value).filter((item: any) => {
      return item.name.lastIndexOf(search.value) != -1;
    });
  }
};
onMounted(() => {
  filtersDirections();
});
watch(search, () => {
  filtersDirections();
});
watch(allDirections, () => {
  filtersDirections();
});
</script>

<template>
  <UiTableBase
    width="400px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
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
          <button
            @click="
              () => {
                openModal(
                  'directionUpdate',
                  'Изменить направление',
                  false,
                  arr
                );
              }
            "
          >
            <h3>Изменить</h3>
          </button>
          <button><h3>Удалить</h3></button>
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
.block-color {
  width: 100px;
  height: 100px;
}
</style>
