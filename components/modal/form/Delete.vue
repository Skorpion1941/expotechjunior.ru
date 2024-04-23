<script setup lang="ts">
import { fetchDirections } from "~/util/useDirections";
import { fetchForms } from "~/util/useForm";
import { fetchProjects } from "~/util/useProjects";
import { fetchSchedules } from "~/util/useSchedules";
import { closeModal, itemDeleteValue, itemValue } from "../useModal";

const supabase = useSupabaseClient();
const deleteItem = async () => {
  try {
    await supabase
      .from(itemDeleteValue.table)
      .delete()
      .eq("id", itemValue.value.id);
    closeModal();
    switch (itemDeleteValue.table) {
      case "projects":
        fetchProjects();
        break;
      case "forms":
        fetchForms();
        break;
      case "directions":
        fetchDirections();
        break;
      case "schedules":
        fetchSchedules();
        break;
    }
  } catch (error) {
    console.error("error", error);
  }
};
</script>
<template>
  <div class="delete">
    <h5>Вы уверены, что хотите удалить {{ itemDeleteValue?.text }}</h5>
    <div class="btn flex">
      <button @click="closeModal()"><h3>Отменить</h3></button>

      <button @click="deleteItem()"><h3>Подтвердить</h3></button>
    </div>
  </div>
</template>

<style lang="scss">
.delete {
  margin: 30px 0;
  width: 100%;
  text-align: center;
  .btn {
    margin-top: 40px;
    justify-content: space-around;
  }
}
</style>
