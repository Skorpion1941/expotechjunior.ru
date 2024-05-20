<script setup lang="ts">
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { allDirections } from "~/util/useDirections";
import { fetchProjects, updateProject } from "~/util/useProjects";

const { modal, close } = useModalStore();
const loading = ref(false);

const direction = ref();
direction.value = Object.values(allDirections.value).find(
  (item: any) => item.id == modal.item?.direction_id
);
const directionMain = ref([
  modal.item?.direction_id,
  "",
  "",
  "",
  direction.value?.name,
]);

const updateProjectValue = reactive({
  name: modal.item?.name,
  title_photo: modal.item?.title_photo,
  tilda_url: modal.item?.tilda_url,
  description: modal.item?.description,
  team: Object.values(modal.item?.team),
  direction: directionMain.value,
});

const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  tilda_url: Yup.string().url().required("Это поле обязательно"),
});
const errorMessage = reactive({
  direction: "",
  team: "",
});
const update = async () => {
  errorMessage.direction = "";
  if (updateProjectValue.direction.length == 0) {
    errorMessage.direction = "Это поле обязательно";
    return;
  }
  if (updateProjectValue.team.length == 0) {
    errorMessage.team = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    await updateProject({
      id: modal.item?.id,
      name: updateProjectValue.name,
      team: updateProjectValue.team,
      tilda_url: updateProjectValue.tilda_url,
      description: updateProjectValue.description,
      title_photo: updateProjectValue.title_photo,
      direction_id: updateProjectValue.direction[0],
    });

    await fetchProjects();
    close();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div>
    <Form @submit="update()" :validation-schema="schema" v-slot="{ errors }">
      <div class="photo">
        <UiPhoto
          v-model:path="updateProjectValue.title_photo"
          width="100%"
          height="100%"
          :update="true"
        >
        </UiPhoto>
      </div>

      <UiInput
        label="Название проекта:"
        name="name"
        type="text"
        placeholder="Введите название"
        v-model:model-value="updateProjectValue.name"
        :errors="errors.name"
      >
      </UiInput>
      <div>
        <div class="flex" style="gap: 5px; flex-direction: row">
          <label>Описание проекта:</label>
          <p style="color: red">*</p>
        </div>
        <textarea v-model="updateProjectValue.description"></textarea>
      </div>
      <UiSelect
        v-model:model-value="updateProjectValue.direction"
        :array="allDirections"
        label="Напрвление проекта:"
        :name="4"
        placeholder="Выберите направление"
      ></UiSelect>

      <p>{{ errorMessage.direction }}</p>
      <ModalFormProjectTeam
        v-model:model-value="updateProjectValue.team"
        label="Команда проекта:"
      ></ModalFormProjectTeam>
      <p>{{ errorMessage.team }}</p>
      <UiInput
        label="Сылка на проект:"
        name="tilda_url"
        type="url"
        placeholder="https://"
        v-model:model-value="updateProjectValue.tilda_url"
        :errors="errors.tilda_url"
      ></UiInput>

      <div>
        <button type="submit" :disabled="loading">
          <h3>{{ loading ? "Загрузка..." : "Изменить" }}</h3>
        </button>
      </div>
    </Form>
  </div>
</template>
<style scoped lang="scss">
form {
  width: 80%;
  margin: 20px auto;
  button {
    margin-top: 10px;
  }
  .photo {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
  }
  div {
    display: flex;
    gap: 5px;
    margin: 5px 0;
    flex-direction: column;
    input {
      padding: 12px 20px;
      border: 1px solid #ccc;
      border-radius: 20px;
    }
  }

  p {
    color: red;
    margin: 0px;
  }
  a {
    text-decoration: underline;
    color: #02c9af;
  }
  textarea {
    max-width: 96%;
    min-width: 96%;
    min-height: 60px;
    max-height: 300px;
    padding: 10px;
    border-radius: 15px;
    font-size: 14px;

    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $first-color;
      border-radius: 15px;
    }
  }
}
@media screen and (max-width: 1280px) {
  form {
    .photo {
      height: 300px;
    }
  }
}
</style>
