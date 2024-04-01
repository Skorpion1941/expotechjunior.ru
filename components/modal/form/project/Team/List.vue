<script setup>
const props = defineProps({
  array: Array,
});

const emit = defineEmits(["removeTeam"]);
</script>
<template>
  <ModalFormProjectTeamMember
    v-for="item in array"
    :key="item.id"
    :surname="item.surname"
    :name="item.name"
    :on-click-minus="() => emit('removeTeam', item)"
  >
  </ModalFormProjectTeamMember>
</template>
<style scoped lang="scss">
div {
  display: flex;
}
</style>
