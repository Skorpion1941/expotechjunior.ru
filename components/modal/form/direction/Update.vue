<script setup>
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { closeModal, itemValue } from "../../useModal";
import { fetchDirections, updateDirection } from "~/util/useDirections";
const loading = ref(false);
const updateDirectionValue = reactive({
  name: itemValue.value.name,
  short_name: itemValue.value.short_name,
  description: itemValue.value.description,
  color: itemValue.value.color,
  photo: itemValue.value.photo,
});

const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  short_name: Yup.string().required("Это поле обязательно"),
  description: Yup.string().required("Это поле обязательно"),
  color: Yup.string().required("Это поле обязательно"),
});

const update = async () => {
  loading.value = true;
  updateDirection({
    id: itemValue.value.id,
    name: updateDirectionValue.name,
    short_name: updateDirectionValue.short_name,
    description: updateDirectionValue.description,
    color: updateDirectionValue.color,
    photo: updateDirectionValue.photo,
  });

  await fetchDirections();
  closeModal();
  loading.value = false;
};
</script>
<template>
  <div>
    <Form @submit="update()" :validation-schema="schema" v-slot="{ errors }">
      <div class="photo">
        <UiDirectionPhoto
          v-model:path="updateDirectionValue.photo"
          width="50%"
          height="300px"
          :update="true"
        >
        </UiDirectionPhoto>
      </div>

      <UiInput
        label="Название направления:"
        name="name"
        type="text"
        placeholder="Введите направлнеие"
        v-model:model-value="updateDirectionValue.name"
        :errors="errors.name"
      ></UiInput>
      <UiInput
        label="Аббревиатура:"
        name="short_name"
        type="text"
        placeholder="Введите аббревиатуру"
        v-model:model-value="updateDirectionValue.short_name"
        :errors="errors.short_name"
      ></UiInput>
      <UiInput
        label="Описание направления:"
        name="description"
        type="text"
        placeholder="Введите описание"
        v-model:model-value="updateDirectionValue.description"
        :errors="errors.description"
      ></UiInput>
      <div class="flex full-w">
        <UiInput
          label="Цвет направления:"
          name="color"
          type="text"
          placeholder="Выбирите цвет"
          v-model:model-value="updateDirectionValue.color"
          :errors="errors.color"
        ></UiInput>
        <div
          class="color"
          :style="{
            background: updateDirectionValue.color,
          }"
        ></div>
      </div>

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
