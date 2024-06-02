<script setup lang="ts">
import { ref, defineProps } from "vue";

const { user } = useAuthStore();
const supabase = useSupabaseClient();

const props = defineProps({
  id: Number,
  comments: Array,
  onReloadComments: Function,
});

const loading = ref(false);
const textComment = ref("");

const addComment = async () => {
  if (textComment.value == "") return;
  try {
    loading.value = true;
    const { error } = await supabase.from("comments").insert({
      text: textComment.value,
      project_id: props.id,
      user_id: user.id,
    });

    if (error) {
      console.log("error", error);
      return;
    }
    textComment.value = "";
    props.onReloadComments();
  } catch (err) {
    console.error("Ошибка", err);
  } finally {
    loading.value = false;
  }
};
const deleteComment = async (id: number) => {
  try {
    await supabase.from("comments").delete().eq("id", id);
    props.onReloadComments();
  } catch (error) {
    console.error("error", error);
  }
};
</script>
<template>
  <h2>Отзывы от экспертов ({{ props.comments?.length }}):</h2>
  <div class="add flex" v-if="user.role == 'expert' || user.role == 'admin'">
    <textarea
      wrap="soft"
      class="scroll"
      spellcheck="true"
      v-model="textComment"
    ></textarea>
    <button @click="addComment()" :disabled="loading">
      <h3>Отправить</h3>
    </button>
  </div>
  <div class="full-w flex flex-column project">
    <div class="comments" v-if="props.comments?.length > 0">
      <ProjectComment
        v-for="comment in props.comments"
        :key="comment.id"
        :comment="comment"
        :on-delete-comment="() => deleteComment(comment.id)"
      ></ProjectComment>
    </div>
    <div
      v-else
      style="text-align: center; min-height: 400px"
      class="full-wh"
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      <h5 style="margin-top: 200px">Комментариев нет</h5>
    </div>
  </div>
</template>
<style scoped lang="scss">
h2 {
  margin-top: 40px;
}
.project {
  position: relative;
}
.comments {
  min-height: 400px;
  max-height: 600px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  .comment:first-child {
    margin-top: 25px;
  }
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $first-color;
    border-radius: 20px;
  }
}
.add {
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 50px;
  margin-bottom: 20px;
  textarea {
    min-width: 600px;
    max-width: 600px;
    min-height: 100px;
    max-height: 200px;
    padding: 10px 20px;
    background: rgb(204, 204, 204, 0.1);
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 18px;
    color: $third-color;
  }
}
@media screen and (max-width: 1280px) {
  .project {
    position: relative;
  }
  .add {
    width: 400px;
    textarea {
      min-width: 400px;
      max-width: 400px;
      min-height: 50px;
      max-height: 100px;
    }
  }
}
@media screen and (max-width: 800px) {
  .comments {
    min-width: 300px;
  }
  .project {
    position: relative;
    height: 600px;
  }
  .add {
    width: 250px;
    textarea {
      min-width: 250px;
      max-width: 250px;
      min-height: 50px;
      max-height: 100px;
    }
  }
}
</style>
