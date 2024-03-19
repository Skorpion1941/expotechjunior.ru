<script setup>
import { onMounted } from "vue";
import { inject, reactive, ref } from "vue";
import * as Yup from "yup";
import { defineProps } from "vue";
import { allDirections } from "~/util/useDirections";

const props = defineProps({
  role: String,
});
const supabase = useSupabaseClient();
const signIn = ref(false);
const loading = ref(false);
const createProjectValue = reactive({
  name: "",
  title_url: "default.png",
  tilda_url: "",
  team: [],
  direction: [],
});
const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно").email("@"),
  tilda_url: Yup.string().url().required("Это поле обязательно"),
});

const signUp = async () => {
  try {
    loading.value = true;
    const directionsJson = JSON.stringify(registerValue.directions);
    console.log(directionsJson);
    const { error } = await supabase.auth.signUp({
      email: registerValue.email,
      password: registerValue.password,
      options: {
        data: {
          name: registerValue.name,
          surname: registerValue.surname,
          patronymic: registerValue.patronymic,
          email: registerValue.email,
          password: registerValue.password,
          avatar_url: registerValue.avatar_url,
          post: registerValue.post,
          about_me: registerValue.about_me,
          directions: directionsJson,
          organization_id: registerValue.organization[0],
          role: props.role,
        },
      },
    });
    signIn;
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      console.log(error);
    }
  } finally {
    loading.value = false;
    signIn.value = true;
  }
};
</script>
<template>
  <div v-if="!signIn">
    <Form @submit="signUp()" :validation-schema="schema" v-slot="{ errors }">
      <div class="photo">
        <UiPhoto
          v-model:path="createProjectValue.title_url"
          size="27"
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
      ></UiInput>
      <UiInput
        label="Сылка на проект:"
        name="tilda_url"
        type="url"
        placeholder="Введите должность"
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
  <div v-if="signIn" class="notification">
    <h3>
      Вам на почту {{ registerValue.email }} было отправленно письмо для
      подтверждения регистрации <NuxtLink to="/">на главную</NuxtLink>
    </h3>
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
    p {
      color: red;
      margin: 0px;
    }
  }

  p {
    font-size: 16px;
  }
  a {
    text-decoration: underline;
    color: #02c9af;
  }
  textarea {
    width: 100%;
    max-width: 380px;
    min-height: 100px;
    padding: 10px;
    border-radius: 20px;
    font-size: 14px;
  }
  textarea::-webkit-scrollbar {
    width: 12px;
  }
  textarea::-webkit-scrollbar-track {
    background: $second-color;
    border-radius: 0 20px 20px 0;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: $first-color;
    border-radius: 20px;
  }
}
.notification {
  width: 100%;
  h3 {
    margin: 30px 50px;
    text-align: center;
  }
}
</style>
