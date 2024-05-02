<script setup lang="ts">
import { fetchDirections } from "~/util/useDirections";
import { fetchForms } from "~/util/useForm";
import { fetchProjects } from "~/util/useProjects";
import { fetchSchedules } from "~/util/useSchedules";

const supabase = useSupabaseClient();
const { modal, close, open } = useModalStore();
const deleteItem = async () => {
  try {
    await supabase
      .from(modal.tableDelete as never)
      .delete()
      .eq("id", modal.item?.id);
    close();
    switch (modal.tableDelete) {
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
    <h5>Вы уверены, что хотите удалить {{ modal.textDelete }}</h5>
    <div class="btn flex">
      <button @click="close()"><h3>Отменить</h3></button>

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
