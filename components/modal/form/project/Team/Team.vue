<script lang="ts" setup>
import { onMounted } from "vue";
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
array.value = modelValue.value;
const team = ref<Team>({ id: 0, surname: "", name: "" });
const teamId = ref(0);
const emit = defineEmits(["update:modelValue"]);
const errorMassage = ref("");
const generateId = () => {
  teamId.value++;
  return teamId.value;
};

const toggleList = () => {};
const addTeam = () => {
  errorMassage.value = "";
  if (team.value.surname == "" || team.value.name == "") {
    errorMassage.value =
      "Для добавления нового члена команда заполните поля фамилии и имени";
    return;
  }
  if (array.value.length > 4) {
    errorMassage.value = "Максимальное число сленов команда 5 человек";
    return;
  }
  array.value.push({
    id: generateId(),
    surname: team.value.surname.trim(),
    name: team.value.name.trim(),
  });
  emit("update:modelValue", array.value);
};
const removeTeam = (item: any) => {
  array.value.splice(array.value.indexOf(item), 1);
};
</script>
<template>
  <div class="multi-selector">
    <label class="title" v-if="label">{{ label }}</label>
    <div class="selector" :class="{ select_show: isListVisible }">
      <div class="select-fields">
        <div>
          <input v-model="team.surname" placeholder="Фамилия" type="text" />
          <input v-model="team.name" placeholder="Имя" type="text" />
        </div>
        <div>
          <Icon
            @click="addTeam"
            name="pajamas:plus"
            color="black"
            size="25px"
          ></Icon>
        </div>
      </div>

      <div class="list" v-if="array.length > 0">
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
.multi-selector {
  .title {
    font-size: 20px;
  }
}
.selector {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 20px;
  .select-fields {
    width: 100%;
    display: flex;
    padding: 0 !important;
    input {
      padding: 10px 20px;
      max-width: 157px;
      font-size: 16px;
      border: none;
      &:first-child {
        border-radius: 20px 0 0 20px;
        border-right: 1px solid #ccc;
      }
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

p {
  color: red;
  margin: 0px;
  font-size: 16px;
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
.select_show {
  border-radius: 20px 20px 0 0;
}
.show {
  display: none;
}
.rotate180 {
  transform: rotate(-60deg);
}
</style>
