<script setup lang="ts">
import { ref, defineProps } from "vue";
import { allProfiles } from "~/util/useProfiles";

const props = defineProps({
  comment: Object,
});
const profile = ref();
const avatar = ref("");
const findProfile = () => {
  const fio = props.comment?.fio_expert.split(" ");
  profile.value = Object.values(allProfiles.value).find((item: any) => {
    return (
      item.name.lastIndexOf(fio[1]) != -1 ||
      item.surname.lastIndexOf(fio[0]) != -1 ||
      item.patronymic.lastIndexOf(fio[2]) != -1
    );
  });
  avatar.value = profile.value.avatar_url;
};

onMounted(() => {
  findProfile();
});
</script>
<template>
  <div class="comment">
    <div class="expert">
      <h4>
        {{ profile?.surname }} {{ profile?.name }} {{ profile?.patronymic }}
      </h4>
      <div class="avatar">
        <UiAvatar path="default.png" width="100%" height="100%"></UiAvatar>
      </div>
    </div>
    <h6>
      {{ comment?.comment }}
    </h6>
  </div>
</template>
<style scoped lang="scss">
.comment {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .expert {
    display: flex;
    gap: 5px;
    justify-content: flex-end;
    h4 {
      align-self: center;
    }
    .avatar {
      width: 50px;
      height: 50px;
    }
  }
  h6 {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 15px;
  }
}
</style>
