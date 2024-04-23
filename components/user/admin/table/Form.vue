<script lang="ts" setup>
import { openModal } from "~/components/modal/useModal";
import { allForms } from "~/util/useForm";

const props = defineProps(["search"]);
const { search } = toRefs(props);
const tableHeads = [
  { name: "№", select: false },
  { name: "Направлние", select: false },
  { name: "Яндекс форма", select: false },
  { name: "", select: false },
];

const tableSizeColumns = "60px 400px 550px 235px";

const forms = ref();
forms.value = allForms.value;
const openLink = (link: string) => {
  window.open(link);
};
onMounted(() => {
  forms.value = allForms.value;
});
watch(allForms, () => {
  forms.value = allForms.value;
});
</script>

<template>
  <UiTableBase
    width="400px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
    <UiTableRow
      v-for="arr in forms"
      :key="arr.id"
      :columnTemplates="tableSizeColumns"
    >
      <UiTableColumn>
        {{ arr.id }}
      </UiTableColumn>
      <UiTableColumn>
        {{ arr.directions.name }}
      </UiTableColumn>
      <UiTableColumn>
        <a @click="openLink(arr.url_form)" href="#">{{ arr.url_form }}</a>
      </UiTableColumn>
      <UiTableColumn>
        <div class="btn">
          <button
            @click="
              () => {
                openModal('formUpdate', 'Изменить проект', false, arr);
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
</style>
