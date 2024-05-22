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
const roles = ref([
  { name: "Пользователь", code: "user" },
  { name: "Эксперт", code: "expert" },
  { name: "Админ", code: "admin" },
]);
const role = ref();
role.value = { code: [props.role] };

const createValue = reactive({
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
    .oneOf([Yup.ref("password")], "Пароль должен совпадать")
    .required("Это поле обязательно"),
});
const errorMessage = reactive({
  directions: "",
});
const createUser = async () => {
  errorMessage.directions = "";
  if (createValue.directions.length == 0 && role.value == "expert") {
    errorMessage.directions = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    const { error } = await supabase.auth.signUp({
      email: createValue.email,
      password: createValue.password,
      options: {
        data: {
          name: createValue.name,
          surname: createValue.surname,
          patronymic: createValue.patronymic,
          email: createValue.email,
          avatar_url: createValue.avatar_url,
          post: createValue.post,
          about_me: createValue.about_me,
          directions: JSON.stringify(createValue.directions),
          organization: createValue.organization,
          city: createValue.city,
          role: role.value.code[1],
        },
      },
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  } finally {
    loading.value = false;
    signIn.value = true;
  }
};
</script>
<template>
  <div v-if="!signIn" class="form">
    <Form
      @submit="createUser()"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <UiSelect
        v-model:model-value="role.code"
        :array="roles"
        label="Роль"
        :name="0"
        placeholder="Выберите роль"
      ></UiSelect>
      <div class="avatar-fio">
        <div class="avatar">
          <UiAvatar
            v-model:path="createValue.avatar_url"
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
            v-model:model-value="createValue.name"
            :errors="errors.name"
          ></UiInput>
          <UiInput
            label="Фамилия:"
            name="surname"
            type="text"
            placeholder="Введите фамилию"
            v-model:model-value="createValue.surname"
            :errors="errors.surname"
          ></UiInput>
          <UiInput
            label="Отчество:"
            name="patronymic"
            type="text"
            placeholder="Введите отчество"
            v-model:model-value="createValue.patronymic"
            :errors="errors.patronymic"
          ></UiInput>
        </div>
      </div>

      <UiInput
        label="Email:"
        name="email"
        type="email"
        placeholder="Введите Email"
        v-model:model-value="createValue.email"
        :errors="errors.email"
      ></UiInput
      ><UiInput
        label="Город:"
        name="city"
        type="text"
        placeholder="Введите город"
        v-model:model-value="createValue.city"
        :errors="errors.city"
      ></UiInput>
      <UiInput
        label="Организация:"
        name="organization"
        type="text"
        placeholder="Введите организацию"
        v-model:model-value="createValue.organization"
        :errors="errors.organization"
      ></UiInput>
      <UiInput
        label="Должность:"
        name="post"
        type="text"
        placeholder="Введите должность"
        v-model:model-value="createValue.post"
        :errors="errors.post"
      ></UiInput
      ><UiSelectMultiple
        v-if="role.name == 'expert'"
        v-model:model-value="createValue.directions"
        :array="allDirections"
        style="z-index: 5"
      ></UiSelectMultiple>
      <p>{{ errorMessage.directions }}</p>

      <UiInput
        label="Пароль:"
        name="password"
        type="password"
        placeholder="Введите пароль"
        v-model:model-value="createValue.password"
        :errors="errors.password"
      ></UiInput>
      <UiInput
        label="Повтор пароля:"
        name="password_repeat"
        type="password"
        placeholder="Повтирите пароль"
        v-model:model-value="createValue.password_repeat"
        :errors="errors.password_repeat"
      ></UiInput>

      <div>
        <label>О себе:</label>
        <textarea maxlength="500" v-model="createValue.about_me"></textarea>
      </div>

      <div>
        <button type="submit" :disabled="loading">
          <h3>{{ loading ? "Загрузка..." : "Зарегистрироваться" }}</h3>
        </button>
      </div>
    </Form>
  </div>
  <div v-if="signIn && role.name == 'expert'" class="notification">
    <h5>
      На почту {{ createValue.email }} было отправленно письмо для подтверждения
      регистрации
    </h5>
  </div>
</template>
<style scoped lang="scss">
form {
  width: 90%;

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
