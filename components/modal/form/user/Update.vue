<script setup>
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { defineProps } from "vue";
import { updateProfile } from "~/util/useProfiles";
import { closeModal } from "../../useModal";
import { allDirections } from "~/util/useDirections";

const props = defineProps({
  role: String,
});
const supabase = useSupabaseClient();
const { user, set } = useAuthStore();
const { close } = useModalStore();

const loading = ref(false);
const directionsSelect = ref();

const updateValue = reactive({
  name: user.name,
  surname: user.surname,
  patronymic: user.patronymic,
  avatar_url: user.avatar_url,
  post: user.post,
  about_me: user.about_me,
  directions: Object.values(user.directions),
  organization: user.organization,
  city: user.city,
});
const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  surname: Yup.string().required("Это поле обязательно"),
  patronymic: Yup.string().required("Это поле обязательно"),
  organization: Yup.string().required("Это поле обязательно"),
  city: Yup.string().required("Это поле обязательно"),
  post: Yup.string().required("Это поле обязательно"),
});
const errorMessage = reactive({
  directions: "",
});
const selectDirections = async () => {
  const selectId = Object.values(user.directions).map((item) => item.id);
  directionsSelect.value = Object.values(allDirections.value).map((item) => {
    if (selectId.includes(item.id)) {
      return {
        ...item,
        checked: true,
      };
    }
    return { ...item };
  });
  console.log(directionsSelect.value);
  console.log(selectId.includes(1));
};
const updateUser = async () => {
  errorMessage.directions = "";
  if (updateValue.directions.length == 0 && role.value == "expert") {
    errorMessage.directions = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.updateUser({
      data: {
        name: updateValue.name,
        surname: updateValue.surname,
        patronymic: updateValue.patronymic,
        avatar_url: updateValue.avatar_url,
        post: updateValue.post,
        about_me: updateValue.about_me,
        directions: updateValue.directions,
        organization: updateValue.organization,
        city: updateValue.city,
      },
    });
    updateProfile({
      id: user.id,
      name: updateValue.name,
      surname: updateValue.surname,
      patronymic: updateValue.patronymic,
      avatar_url: updateValue.avatar_url,
      post: updateValue.post,
      about_me: updateValue.about_me,
      directions: updateValue.directions,
      organization: updateValue.organization,
      city: updateValue.city,
    });
    set({
      id: user.id,
      email: user.email,
      name: updateValue.name,
      surname: updateValue.surname,
      patronymic: updateValue.patronymic,
      avatar_url: updateValue.avatar_url,
      post: updateValue.post,
      about_me: updateValue.about_me,
      directions: updateValue.directions,
      organization: updateValue.organization,
      city: updateValue.city,
      role: user.role,
      status: true,
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  } finally {
    loading.value = false;
    close();
  }
};
onMounted(() => {
  selectDirections();
});
watch(updateValue, () => {
  console.log(updateValue.directions);
});
</script>
<template>
  <div>
    <Form
      @submit="updateUser()"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <div class="avatar-fio">
        <div class="avatar">
          <UiAvatar
            v-model:path="updateValue.avatar_url"
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
            v-model:model-value="updateValue.name"
            :errors="errors.name"
          ></UiInput>
          <UiInput
            label="Фамилия:"
            name="surname"
            type="text"
            placeholder="Введите фамилию"
            v-model:model-value="updateValue.surname"
            :errors="errors.surname"
          ></UiInput>
          <UiInput
            label="Отчество:"
            name="patronymic"
            type="text"
            placeholder="Введите отчество"
            v-model:model-value="updateValue.patronymic"
            :errors="errors.patronymic"
          ></UiInput>
        </div>
      </div>
      <UiInput
        label="Город:"
        name="city"
        type="text"
        placeholder="Введите город"
        v-model:model-value="updateValue.city"
        :errors="errors.city"
      ></UiInput>
      <UiInput
        label="Организация:"
        name="organization"
        type="text"
        placeholder="Введите организацию"
        v-model:model-value="updateValue.organization"
        :errors="errors.organization"
      ></UiInput>
      <UiInput
        label="Должность:"
        name="post"
        type="text"
        placeholder="Введите должность"
        v-model:model-value="updateValue.post"
        :errors="errors.post"
      ></UiInput>
      <UiSelectMultiple
        v-if="user.role == 'expert'"
        v-model:model-value="updateValue.directions"
        :array="directionsSelect"
        style="z-index: 5"
      ></UiSelectMultiple>

      <p>{{ errorMessage.directions }}</p>

      <div>
        <label>О себе:</label>
        <textarea maxlength="500" v-model="updateValue.about_me"></textarea>
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
  .avatar-fio {
    width: 100%;
    gap: 25px;
    display: flex;
    flex-direction: row;
    .avatar {
      width: 50%;
      height: 290px;
    }
    .fio {
      width: 50%;
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
    p {
      color: red;
      margin: 0px;
    }
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
        width: 230px;
        min-width: 150px;
        height: 210px;
      }
    }
  }
}
</style>
