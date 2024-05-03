<script setup lang="ts">
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { allDirections } from "~/util/useDirections";
import { allForms, fetchForms, updateForm } from "~/util/useForm";

const { modal, close } = useModalStore();
const loading = ref(false);
const errorMessage = reactive({
  direction: "",
});
const directions = ref();
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
const updateFormValue = reactive({
  url_form: modal.item?.url_form,
  direction: directionMain.value,
});

const schema = Yup.object().shape({
  url_form: Yup.string().url().required("Это поле обязательно"),
});

const update = async () => {
  errorMessage.direction = "";
  if (updateFormValue.direction.length == 0) {
    errorMessage.direction = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    await updateForm({
      id: modal.item?.id,
      direction_id: updateFormValue.direction[0],
      url_form: updateFormValue.url_form,
    });
    await fetchForms();
    close();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      console.log(error);
    }
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  const forms = Object.values(allForms.value).map(
    (item: any) => item.direction_id
  );

  directions.value = Object.values(allDirections.value).filter(
    (direction: any) => !forms.includes(direction.id)
  );
});
</script>
<template>
  <div>
    <Form @submit="update()" :validation-schema="schema" v-slot="{ errors }"
      ><UiSelect
        v-model:model-value="updateFormValue.direction"
        :array="directions"
        label="Напрвление проекта"
        :name="4"
        placeholder="Выберите направление"
      ></UiSelect>

      <p>{{ errorMessage.direction }}</p>

      <UiInput
        label="Сылка на YandexForm:"
        name="url_form"
        type="url"
        placeholder="https://"
        v-model:model-value="updateFormValue.url_form"
        :errors="errors.url_form"
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
  margin: 40px auto;
  button {
    margin-top: 10px;
  }
  div {
    display: flex;
    gap: 5px;
    margin: 5px 0;
    flex-direction: column;
  }

  input {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
    color: $third-color;
  }
  p {
    color: red;
    margin: 0px;
  }
}
@media screen and (max-width: 1280px) {
  input {
    padding: 7px 7px;
    border-radius: 10px;
  }
}
</style>
