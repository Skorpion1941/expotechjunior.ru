<script setup lang="ts">
import { openModal } from "../modal/useModal";

const { user } = useAuthStore();
defineProps({
  array: Array,
});

const expertDirections = ref();
if (user.role != "") {
  expertDirections.value = Object.values(user.directions).map(
    (item: any) => item.id
  );
}

onMounted(() => {
  if (user.role != "") {
    expertDirections.value = Object.values(user.directions).map(
      (item: any) => item.id
    );
  }
});
watch(user, () => {
  if (user.role != "") {
    expertDirections.value = Object.values(user.directions).map(
      (item: any) => item.id
    );
  }
});
</script>
<template>
  <ProjectCard
    v-for="item in array"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    :title_photo="item.title_photo"
    :tilda_url="item.tilda_url"
    :direction="item.directions"
    :role="user.role"
    :on-click-card="() => openModal('project', 'Карта проекта', false, item)"
    :expert-directions="expertDirections"
  ></ProjectCard>
</template>
<style lang="scss" scoped></style>
