<script setup lang="ts">
const { modal } = useModalStore();
</script>
<template>
  <div class="nitice">
    <h5>{{ modal.textNotice }}</h5>
  </div>
</template>

<style lang="scss">
.delete {
  margin: 30px 0;
  width: 100%;
  text-align: center;
}
</style>
