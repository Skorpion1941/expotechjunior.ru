<script lang="ts" setup>
import { allForms } from "~/util/useForm";

defineProps(["search"]);

const { open } = useModalStore();
const modalStore = useModalStore();
const tableHeads = [
  { name: "№", select: false },
  { name: "Направлние", select: false },
  { name: "Яндекс форма", select: false },
  { name: "Максимальные баллы", select: false },
  { name: "", select: false },
];

const tableSizeColumns = "60px 400px 550px 250px 285px";

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
        {{ arr.max_scope }}
      </UiTableColumn>
      <UiTableColumn>
        <div class="btn">
          <button
            @click="
              open({
                name: 'formUpdate',
                title: 'Изменить форму',
                item: arr,
              })
            "
          >
            <h3>Изменить</h3>
          </button>
          <button
            @click="
              open({
                name: 'delete',
                title: 'Удалить форму',
                item: arr,
                tableDelete: 'forms',
                textDelete: 'форму',
              })
            "
          >
            <h3>Удалить</h3>
          </button>
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
