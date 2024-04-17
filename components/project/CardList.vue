<script setup>
import { openModal } from "../modal/useModal";
import { openComment } from "../drawer/useDrawer";

const props = defineProps({
  array: Array,
  role: String,
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
    :role="role"
    :on-click-card="() => openModal('project', 'Карта проекта', false, item)"
    :on-click-comment="() => openComment(item)"
  ></ProjectCard>
</template>
<style lang="scss" scoped></style>
