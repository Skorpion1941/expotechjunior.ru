<script setup>
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { defineProps } from "vue";
import { allDirections } from "~/util/useDirections";

const props = defineProps({
  role: String,
});
const supabase = useSupabaseClient();
const { user } = useAuthStore();
const { open } = useModalStore();

const signIn = ref(false);
const loading = ref(false);

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
  organization: "",
  city: "",
});
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Это поле обязательно")
    .email("Введите существующий адрес эл. почты"),
  password: Yup.string()
    .required("Пароль обязателен для заполнения")
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(20, "Пароль не должен превышать 20 символов")
    .matches(/[A-ZА-Я]/, "Пароль должен содержать минимум одну заглавную букву")
    .matches(/[0-9]/, "Пароль должен содержать минимум одну цифру"),
  name: Yup.string()
    .required("Это поле обязательно")
    .matches(
      /[А-Яа-я- ]/,
      "Пароль должен содержать только кириллицу, дефис и пробел"
    ),
  surname: Yup.string()
    .required("Это поле обязательно")
    .matches(
      /[А-Яа-я- ]/,
      "Пароль должен содержать только кириллицу, дефис и пробел"
    ),
  patronymic: Yup.string()
    .required("Это поле обязательно")
    .matches(
      /[А-Яа-я- ]/,
      "Пароль должен содержать только кириллицуы, дефис и пробел"
    ),
  organization: Yup.string().required("Это поле обязательно"),
  city: Yup.string().required("Это поле обязательно"),
  post: Yup.string().required("Это поле обязательно"),
  password_repeat: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должены совпадать в обоих полях")
    .required("Это поле обязательно"),
});
const errorMessage = reactive({
  directions: "",
  register: "",
});
const signUp = async () => {
  errorMessage.directions = "";
  if (registerValue.directions.length == 0 && role.value == "expert") {
    errorMessage.directions = "Это поле обязательно";
    return;
  }
  try {
    console.log(JSON.stringify(registerValue.directions));
    loading.value = true;
    const { error } = await supabase.auth.signUp({
      email: registerValue.email,
      password: registerValue.password,
      options: {
        data: {
          name: registerValue.name,
          surname: registerValue.surname,
          patronymic: registerValue.patronymic,
          email: registerValue.email,
          avatar_url: registerValue.avatar_url,
          post: registerValue.post,
          about_me: registerValue.about_me,
          directions: JSON.stringify(registerValue.directions),
          organization: registerValue.organization,
          city: registerValue.city,
          role: props.role,
        },
      },
    });
    if (error) throw error;
    signIn.value = true;
    if (props.role == "user") {
      open({ name: "login", title: "Вход" });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      errorMessage.register =
        "При регистрации произошла ошибка перезагрузите страницу и повторно заполните форму";
    }
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div v-if="!signIn" class="form">
    <Form @submit="signUp()" :validation-schema="schema" v-slot="{ errors }">
      <div class="avatar-fio">
        <div class="avatar">
          <UiAvatar
            v-model:path="registerValue.avatar_url"
            width="100%"
            height="100%"
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

      <UiInput
        label="Email:"
        name="email"
        type="email"
        placeholder="Введите Email"
        v-model:model-value="registerValue.email"
        :errors="errors.email"
      ></UiInput
      ><UiInput
        label="Место проживания:"
        name="city"
        type="text"
        placeholder="город Томск"
        v-model:model-value="registerValue.city"
        :errors="errors.city"
      ></UiInput>
      <UiInput
        label="Организация:"
        name="organization"
        type="text"
        placeholder="Введите организацию"
        v-model:model-value="registerValue.organization"
        :errors="errors.organization"
      ></UiInput>
      <UiInput
        label="Должность:"
        name="post"
        type="text"
        placeholder="Введите должность"
        v-model:model-value="registerValue.post"
        :errors="errors.post"
      ></UiInput
      ><UiSelectMultiple
        v-if="props.role == 'expert'"
        v-model:model-value="registerValue.directions"
        :array="allDirections"
        style="z-index: 5"
      ></UiSelectMultiple>
      <p>{{ errorMessage.directions }}</p>
      <div
        style="white-space: pre-line"
        class="password"
        data-name="Пароль должен: 
        &nbsp;&nbsp;&nbsp;&bull; иметь минимум 6 символов 
        &nbsp;&nbsp;&nbsp;&bull; не превышать 20 символов 
        &nbsp;&nbsp;&nbsp;&bull; содержать минимум одну заглавную букву 
        &nbsp;&nbsp;&nbsp;&bull; содержать минимум одну цифру"
      >
        <div class="flex" style="gap: 5px; flex-direction: row">
          <label>Пароль:</label>
          <p>*</p>
        </div>
        <Field
          v-model:model-value="registerValue.password"
          name="password"
          type="password"
          placeholder="Введите пароль"
        />
        <p v-if="errors.password">{{ errors.password }}</p>
      </div>
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
          <h3>{{ loading ? "Загрузка..." : "Зарегистрироваться" }}</h3>
        </button>
      </div>
      <p style="text-align: center">{{ errorMessage.register }}</p>
    </Form>
  </div>
  <div v-if="signIn && props.role == 'expert'" class="notification">
    <h5>
      На вашу почту {{ registerValue.email }} было отправленно письмо для
      подтверждения регистрации <NuxtLink to="/">на главную</NuxtLink>
    </h5>
  </div>
</template>
<style scoped lang="scss">
form {
  width: 80%;
  margin: 20px auto;
  button {
    margin-top: 10px;
  }
  .avatar-fio {
    width: 100%;
    gap: 25px;
    display: flex;
    flex-direction: row;
    .avatar {
      width: 400px;
      height: 300px;
    }
    .fio {
      width: 550px;
      height: 100%;
    }
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
  .password {
    position: relative;
    &:hover:after {
      content: attr(data-name);
      position: absolute;
      left: 0;
      top: -100px;
      background: white;
      border: 2px solid $first-color;
      border-radius: 15px;
      text-align: left;
      font-size: 14px;
      padding: 3px 0 3px 5px;
      width: 100%;
      z-index: 100;
    }
  }
  p {
    color: red;
    margin: 0px;
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
    max-height: 200px;
    padding: 10px;
    border-radius: 20px;
    font-size: 14px;
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-track {
      background: $second-color;
      border-radius: 0 20px 20px 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $first-color;
      border-radius: 20px;
    }
  }
}
.notification {
  width: 100%;
  h5 {
    margin: 30px 50px;
    text-align: center;
  }
}
@media screen and (max-width: 1280px) {
  form {
    .avatar-fio {
      .avatar {
        width: 250px;
        min-width: 150px;
        height: 230px;
      }
    }
    input {
      padding: 7px 7px;
      border-radius: 10px;
    }
  }
}
</style>
