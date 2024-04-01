<script setup>
import { onMounted } from "vue";
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { defineProps } from "vue";
import { allOrganizations } from "~/util/useOrganizations";
import { updateProfile } from "~/util/useProfiles";
const user = useSupabaseUser();

const props = defineProps({
  role: String,
});
const supabase = useSupabaseClient();
const authStore = useAuthStore();
const loading = ref(false);
const updateValue = reactive({
  name: authStore.user.name,
  surname: authStore.user.surname,
  patronymic: authStore.user.patronymic,
  avatar_url: authStore.user.avatar_url,
  post: authStore.user.post,
  about_me: authStore.user.about_me,
  directions: authStore.user.directions,
  organization: authStore.user.organization,
});
const schema = Yup.object().shape({
  password: Yup.string().required("Это поле обязательно").min(6, "Миним 6"),
  name: Yup.string().required("Это поле обязательно"),
  surname: Yup.string().required("Это поле обязательно"),
  patronymic: Yup.string().required("Это поле обязательно"),
  post: Yup.string().required("Это поле обязательно"),
});

const updateUser = async () => {
  try {
    const directionsJson = JSON.stringify(updateValue.directions);

    const { data, error } = await supabase.auth.updateUser({
      data: {
        name: updateValue.name,
        surname: updateValue.surname,
        patronymic: updateValue.patronymic,
        avatar_url: updateValue.avatar_url,
        post: updateValue.post,
        about_me: updateValue.about_me,
        directions: directionsJson,
        organization_id: updateValue.organization[0],
      },
    });
    updateProfile({
      id: authStore.user.id,
      name: updateValue.name,
      surname: updateValue.surname,
      patronymic: updateValue.patronymic,
      avatar_url: updateValue.avatar_url,
      post: updateValue.post,
      about_me: updateValue.about_me,
      directions: directionsJson,
      organization_id: updateValue.organization[0],
    });
    authStore.set({
      id: authStore.user.id,
      email: authStore.user.email,
      name: updateValue.name,
      surname: updateValue.surname,
      patronymic: updateValue.patronymic,
      avatar_url: updateValue.avatar_url,
      post: updateValue.post,
      about_me: updateValue.about_me,
      directions: directionsJson,
      organization: updateValue.directions,
      role: authStore.user.role,
      status: true,
    });
    if (error) throw error;
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
    <Form :validation-schema="schema" v-slot="{ errors }">
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

      <UiSelectMultiple
        v-if="props.role == 'expert'"
        v-model:model-value="updateValue.directions"
        array=""
      ></UiSelectMultiple>
      <UiSelect
        v-model:model-value="updateValue.organization"
        :array="allOrganizations"
        label="Организация"
        :name="2"
      ></UiSelect>
      <UiInput
        label="Должность:"
        name="post"
        type="text"
        placeholder="Введите должность"
        v-model:model-value="updateValue.post"
        :errors="errors.post"
      ></UiInput>

      <div>
        <label>О себе:</label>
        <textarea maxlength="500" v-model="updateValue.about_me"></textarea>
      </div>

      <div>
        <button @click="updateUser()" type="submit" :disabled="loading">
          {{ loading ? "Загрузка..." : "Обнавить" }}
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
  .avatar-fio {
    width: 100%;
    gap: 25px;
    display: flex;
    flex-direction: row;
    .avatar {
      width: 50%;
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
    max-width: 96%;
    min-height: 50px;
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
