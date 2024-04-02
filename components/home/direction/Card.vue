<script setup lang="ts">
const supabase = useSupabaseClient();

const props = defineProps(["name", "imgUrl"]);
const { name, imgUrl } = toRefs(props);
const src = ref("");
const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("directions_photo")
      .download(imgUrl.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};
onMounted(async () => await downloadImage());
</script>
<template>
  <div class="card">
    <img class="scale-img" :src="src" />
    <p>{{ name.toUpperCase() }}</p>
  </div>
</template>
<style lang="scss" scoped>
.card {
  width: 550px;
  height: 123px;
  display: flex;
  align-items: center;
  color: $third-color;
  gap: 10px;
  img {
    width: 120px;
  }
  p {
    font-size: 24px;
  }
}
</style>
