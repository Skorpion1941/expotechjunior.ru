<script setup>
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { defineProps } from "vue";
import { allOrganizations } from "~/util/useOrganizations";
import { allDirections } from "~/util/useDirections";
import { openModal } from "../../useModal";

const props = defineProps({
  role: String,
});
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const signIn = ref(false);
const loading = ref(false);
const roles = ref([{ name: "user" }, { name: "expert" }, { name: "admin" }]);
const role = ref();
role.value = { name: [props.role] };
const errorMessage = reactive({
  directions: "",
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
  organization: "",
  city: "",
});
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Это поле обязательно")
    .email("Введите существующий адрес эл. почты"),
  password: Yup.string()
    .required("Это поле обязательно")
    .min(6, "Минимум 6 символов")
    .max(20, "Максимум 20 символов"),
  name: Yup.string().required("Это поле обязательно"),
  surname: Yup.string().required("Это поле обязательно"),
  patronymic: Yup.string().required("Это поле обязательно"),
  organization: Yup.string().required("Это поле обязательно"),
  city: Yup.string().required("Это поле обязательно"),
  post: Yup.string().required("Это поле обязательно"),
  password_repeat: Yup.string()
    .oneOf([Yup.ref("password")], "Пароль в обоих полях должен совпадать")
    .required("Это поле обязательно"),
});

const signUp = async () => {
  errorMessage.directions = "";
  if (registerValue.directions.length == 0 && role.value == "expert") {
    errorMessage.directions = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    const directionsJson = JSON.stringify(registerValue.directions);
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
          directions: directionsJson,
          organization: registerValue.organization,
          city: registerValue.city,
          role: role.value.name[0],
        },
      },
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      console.log(error);
    }
  } finally {
    loading.value = false;
    if (props.role == "user") {
      openModal("login", "Вход");
      return;
    }
    signIn.value = true;
  }
};
</script>
<template>
  <div v-if="!signIn" class="form">
    <Form @submit="signUp()" :validation-schema="schema" v-slot="{ errors }">
      <UiSelect
        v-if="user.role == 'admin'"
        v-model:model-value="role.name"
        :array="roles"
        label="Роль"
        :name="0"
      ></UiSelect>
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
        label="Город:"
        name="city"
        type="text"
        placeholder="Введите город"
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
        v-if="role.name == 'expert'"
        v-model:model-value="registerValue.directions"
        :array="allDirections"
        style="z-index: 5"
      ></UiSelectMultiple>
      <p>{{ errorMessage.directions }}</p>

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
          <h3>{{ loading ? "Загрузка..." : "Зарегистрироваться" }}</h3>
        </button>
      </div>
    </Form>
  </div>
  <div v-if="signIn && role.name == 'expert'" class="notification">
    <h3>
      Вам на почту {{ registerValue.email }} было отправленно письмо для
      подтверждения регистрации <NuxtLink to="/">на главную</NuxtLink>
    </h3>
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
  h3 {
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
  }
}
</style>
