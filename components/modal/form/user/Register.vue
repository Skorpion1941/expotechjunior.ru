<script setup>
import { onMounted } from "vue";
import { inject, reactive, ref } from "vue";
import * as Yup from "yup";
import { defineProps } from "vue";
import { fetchOrganizations, allOrganizations } from "~/util/useOrganizations";
import { allDirections } from "~/util/useDirections";

const props = defineProps({
  role: String,
});
const supabase = useSupabaseClient();
const signIn = ref(false);
const loading = ref(false);
const errorMessage = reactive({
  directions: "",
  organization: "",
});
const registerValue = reactive({
  name: "",
  surname: "",
  patronymic: "",
  email: "",
  password: "",
  password_repeat: "",
  avatar_url: "default.png",
  post: "",
  about_me: "",
  directions: [],
  organization: [],
});
const schema = Yup.object().shape({
  email: Yup.string().required("Это поле обязательно").email("@"),
  password: Yup.string().required("Это поле обязательно").min(6, "Миним 6"),
  name: Yup.string().required("Это поле обязательно"),
  surname: Yup.string().required("Это поле обязательно"),
  patronymic: Yup.string().required("Это поле обязательно"),
  post: Yup.string().required("Это поле обязательно"),
  password_repeat: Yup.string()
    .oneOf([Yup.ref("password")], "Неверный пароль")
    .required("Это поле обязательно"),
});

const signUp = async () => {
  errorMessage.directions = "";
  errorMessage.organization = "";
  if (registerValue.organization.length == 0) {
    errorMessage.organization = "Это поле обязательно";
    return;
  }
  if (registerValue.directions.length == 0) {
    errorMessage.directions = "Это поле обязательно";
    return;
  }
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

    console.log(registerValue);

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
onMounted(async () => {
  await fetchOrganizations();
});
</script>
<template>
  <div v-if="!signIn">
    <Form @submit="signUp()" :validation-schema="schema" v-slot="{ errors }">
      <div class="avatar-fio">
        <div>
          <UiAvatar
            v-model:path="registerValue.avatar_url"
            size="14"
            :update="true"
          ></UiAvatar>
        </div>
        <div class="fio">
          <UiInput
            label="Имя:"
            name="name"
            type="text"
            placeholder="Введите имя"
            v-model:model-value="registerValue.name"
            :errors="errors.name"
          ></UiInput>
          <UiInput
            label="Фамилия:"
            name="surname"
            type="text"
            placeholder="Введите фамилию"
            v-model:model-value="registerValue.surname"
            :errors="errors.surname"
          ></UiInput>
          <UiInput
            label="Отчество:"
            name="patronymic"
            type="text"
            placeholder="Введите отчество"
            v-model:model-value="registerValue.patronymic"
            :errors="errors.patronymic"
          ></UiInput>
        </div>
      </div>

      <UiSelectMultiple
        v-if="props.role == 'expert'"
        v-model:model-value="registerValue.directions"
        :array="allDirections"
        style="z-index: 5"
      ></UiSelectMultiple>
      <p>{{ errorMessage.directions }}</p>
      <UiSelect
        v-model:model-value="registerValue.organization"
        :array="allOrganizations"
        label="Организация"
        :name="2"
      ></UiSelect>
      <p>{{ errorMessage.organization }}</p>
      <UiInput
        label="Должность:"
        name="post"
        type="text"
        placeholder="Введите должность"
        v-model:model-value="registerValue.post"
        :errors="errors.post"
      ></UiInput>
      <UiInput
        label="Email:"
        name="email"
        type="email"
        placeholder="Введите Email"
        v-model:model-value="registerValue.email"
        :errors="errors.email"
      ></UiInput>
      <UiInput
        label="Пароль:"
        name="password"
        type="password"
        placeholder="Введите пароль"
        v-model:model-value="registerValue.password"
        :errors="errors.password"
      ></UiInput>
      <UiInput
        label="Повтор пароля:"
        name="password_repeat"
        type="password"
        placeholder="Повтирите пароль"
        v-model:model-value="registerValue.password_repeat"
        :errors="errors.password_repeat"
      ></UiInput>

      <div>
        <label>О себе:</label>
        <textarea maxlength="500" v-model="registerValue.about_me"></textarea>
      </div>

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
  .avatar-fio {
    width: 100%;
    gap: 25px;
    display: flex;
    flex-direction: row;
    .fio {
      width: 60%;
    }
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
