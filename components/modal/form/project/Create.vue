<script setup>
import { inject, reactive, ref } from "vue";
import * as Yup from "yup";
import { defineProps } from "vue";
import { closeModal } from "../../useModal";
import { allDirections } from "~/util/useDirections";

const props = defineProps({
  role: String,
});
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const loading = ref(false);
const errorMessage = reactive({
  direction: "",
});
const createProjectValue = reactive({
  name: "",
  title_photo: "default.png",
  tilda_url: "",
  team: [],
  direction: [],
});

const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  tilda_url: Yup.string().url().required("Это поле обязательно"),
});

const createProject = async () => {
  errorMessage.direction = "";
  if (createProjectValue.direction.length == 0) {
    errorMessage.direction = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    const { error } = await supabase.from("projects").insert({
      name: createProjectValue.name,
      title_photo: createProjectValue.title_photo,
      tilda_url: createProjectValue.tilda_url,
      direction_id: createProjectValue.direction[0],
      user_id: user.id,
    });

    if (error) throw error;
    closeModal();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      console.log(error);
    }
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div>
    <Form
      @submit="createProject()"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <div class="photo">
        <UiPhoto
          v-model:path="createProjectValue.title_photo"
          width="100%"
          height="400px"
          :update="true"
        >
        </UiPhoto>
      </div>

      <UiInput
        label="Название проекта:"
        name="name"
        type="text"
        placeholder="Введите название"
        v-model:model-value="createProjectValue.name"
        :errors="errors.name"
      ></UiInput
      ><UiSelect
        v-model:model-value="createProjectValue.direction"
        :array="allDirections"
        label="Напрвление проекта"
        :name="4"
        placeholder="Выберите направление"
      ></UiSelect>
      <p>{{ errorMessage.direction }}</p>
      <UiInput
        label="Сылка на проект:"
        name="tilda_url"
        type="url"
        placeholder="https://"
        v-model:model-value="createProjectValue.tilda_url"
        :errors="errors.tilda_url"
      ></UiInput>

      <div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Загрузка..." : "Зарегистрироваться" }}
        </button>
      </div>
    </Form>
  </div>
</template>
<style scoped lang="scss">
form {
  width: 80%;
  margin: 40px auto;
  button {
    margin-top: 10px;
  }
  .photo {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  div {
    display: flex;
    gap: 5px;
    margin: 5px 0;
    flex-direction: column;

    label {
      font-size: 20px;
    }

    input {
      padding: 12px 20px;
      border: 1px solid #ccc;
      border-radius: 20px;
    }
  }

  p {
    color: red;
    margin: 0px;
    font-size: 16px;
  }
  a {
    text-decoration: underline;
    color: #02c9af;
  }
}
</style>
