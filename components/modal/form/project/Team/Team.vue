<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";

interface Team {
  id: number;
  surname: string;
  name: string;
}
const props = defineProps(["modelValue", "label"]);
const isListVisible = ref(false);
const { modelValue } = toRefs(props);
const array = ref<Team[]>([]);

const team = ref<Team>({ id: 0, surname: "", name: "" });
const teamId = ref(0);
const emit = defineEmits(["update:modelValue"]);
const errorMassage = ref("");
const generateId = () => {
  teamId.value++;
  return teamId.value;
};

if (modelValue?.value != null) {
  isListVisible.value = true;
  array.value = modelValue?.value;
}
const addTeam = () => {
  errorMassage.value = "";
  if (team.value.surname == "" || team.value.name == "") {
    errorMassage.value =
      "Для добавления нового члена команды заполните поле фамилия и/или имя";
    return;
  }
  if (array.value?.length > 4) {
    errorMassage.value = "Максимальное число членов команды 5 человек";
    return;
  }
  array.value?.push({
    id: generateId(),
    surname: team.value.surname.trim(),
    name: team.value.name.trim(),
  });
  emit("update:modelValue", array.value);
  team.value.name = "";
  team.value.surname = "";
};
const removeTeam = (item: any) => {
  array.value.splice(array.value.indexOf(item), 1);
};
</script>
<template>
  <div>
    <label class="title" v-if="label">{{ label }}</label>
    <div class="selector">
      <div class="select-fields">
        <div>
          <input
            style="border-radius: 20px 0 0 20px"
            :class="{ input_show: isListVisible }"
            v-model="team.surname"
            placeholder="Фамилия"
            type="text"
          />
          <input v-model="team.name" placeholder="Имя" type="text" />
        </div>
        <div>
          <Icon
            class="icon"
            @click="addTeam"
            name="pajamas:plus"
            size="25px"
          ></Icon>
        </div>
      </div>

      <div class="list" v-if="array?.length > 0">
        <ModalFormProjectTeamList
          :array="array"
          @remove-team="removeTeam"
        ></ModalFormProjectTeamList>
      </div>
    </div>
    <p>{{ errorMassage }}</p>
  </div>
</template>
<style scoped lang="scss">
.selector {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
  .select-fields {
    width: 100%;
    display: flex;
    padding: 0 !important;
    input {
      padding: 10px 20px;
      max-width: 157px;
      border: none;
      &:first-child {
        border-right: 1px solid #ccc;
      }
    }
    .icon {
      width: 30px;
    }
    div {
      &:first-child {
        width: 100%;
        display: flex;
      }
      &:last-child {
        border-left: 1px solid #ccc;
        width: 9%;

        padding: 7px 0 0 2px;
        cursor: pointer;
      }
    }
  }
}
.input_show {
  border-radius: 20px 0 0 0 !important;
}
p {
  color: red;
  margin: 0px;
}
.list {
  width: 100%;
  background: white;
  box-shadow: 0 30px 60px rgb(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0 0 20px 20px;
}
@media screen and (max-width: 1280px) {
  .selector {
    .select-fields {
      input {
        padding: 7px 7px;
        max-width: 128px;
        &:first-child {
          border-right: 1px solid #ccc;
        }
      }
      .icon {
        width: 20px;

        margin-top: -6px;
      }
    }
  }
}
</style>
