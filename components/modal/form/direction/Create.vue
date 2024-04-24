<script setup>
import { reactive, ref, onMounted } from "vue";
import * as Yup from "yup";
import { fetchDirections } from "~/util/useDirections";
import { closeModal } from "../../useModal";
const supabase = useSupabaseClient();
const loading = ref(false);
const createDirectionValue = reactive({
  name: "",
  short_name: "",
  description: "",
  color: "black",
  photo: "default.png",
});

const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  short_name: Yup.string().required("Это поле обязательно"),
  description: Yup.string().required("Это поле обязательно"),
  color: Yup.string().required("Это поле обязательно"),
});

const createDirection = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.from("directions").insert({
      name: createProjectValue.name,
      short_name: createProjectValue.short_name,
      description: createProjectValue.description,
      color: createProjectValue.color,
      photo: createProjectValue.photo,
    });
    await fetchDirections();
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
      @submit="createDirection()"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <div class="photo">
        <UiDirectionPhoto
          v-model:path="createDirectionValue.photo"
          width="100%"
          height="400px"
          :update="true"
        >
        </UiDirectionPhoto>
      </div>

      <UiInput
        label="Название направления:"
        name="name"
        type="text"
        placeholder="Введите направлнеие"
        v-model:model-value="createDirectionValue.name"
        :errors="errors.name"
      ></UiInput>
      <UiInput
        label="Аббревиатура:"
        name="short_name"
        type="text"
        placeholder="Введите аббревиатуру"
        v-model:model-value="createDirectionValue.short_name"
        :errors="errors.short_name"
      ></UiInput>
      <UiInput
        label="Описание направления:"
        name="description"
        type="text"
        placeholder="Введите описание"
        v-model:model-value="createDirectionValue.description"
        :errors="errors.description"
      ></UiInput>
      <div class="flex full-w">
        <UiInput
          label="Цвет направления:"
          name="color"
          type="text"
          placeholder="Выбирите цвет"
          v-model:model-value="createDirectionValue.color"
          :errors="errors.color"
        ></UiInput>
        <div
          class="color"
          :style="{
            background: createDirectionValue.color,
          }"
        ></div>
      </div>

      <div>
        <button type="submit" :disabled="loading">
          <h3>{{ loading ? "Загрузка..." : "Добавить" }}</h3>
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
    .color {
      width: 100px;
      height: 100px;
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
}
</style>
