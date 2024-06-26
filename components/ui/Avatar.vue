<script setup>
import { ref, toRefs, watch } from "vue";

const supabase = useSupabaseClient();

const prop = defineProps(["path", "width", "height", "update"]);
const { path, width, height, update } = toRefs(prop);

const emit = defineEmits(["upload", "update:path"]);
const uploading = ref(false);
const src = ref("");
const files = ref();

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

const uploadAvatar = async (evt) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;
    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;

    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    emit("update:path", filePath);
    emit("upload");
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

watch(path, () => {
  if (path.value) downloadImage();
});
onMounted(async () => {
  await downloadImage();
});
</script>

<template>
  <div class="avatar" :style="{ height: height, width: width }">
    <div class="image">
      <!-- <img
        v-if="src"
        :src="src"
        alt="Avatar"
        :style="{
          height: '100%',
          width: '100%',
        }"
      /> -->
      <NuxtImg v-if="src" :src="src"></NuxtImg>
      <div
        v-else
        class="no-image"
        :style="{ height: height, width: width }"
      ></div>
    </div>
    <div class="avatar-btn button" v-if="update == true">
      <label for="single">
        {{ uploading ? "Загрузка ..." : "Загрузить фото" }}
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.avatar {
  .image {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .avatar-btn {
    margin: 15px auto;
  }
}
.no-image {
  border-radius: 50%;
}
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  background-color: #02c9af;
  transition: background-color 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: $second-color;
  }
}
@media screen and (max-width: 1280px) {
  .button {
    padding: 6px 12px;
  }
}
</style>
