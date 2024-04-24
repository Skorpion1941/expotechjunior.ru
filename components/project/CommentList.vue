<script setup>
import { ref, defineProps } from "vue";
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const props = defineProps({
  id: Number,
});
console.log(props.id);
const commentsProject = ref();
const textComment = ref("");
const fetchComments = async () => {
  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*, profiles(*)")
      .eq("project_id", props.id)
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    if (comments === null) {
      commentsProject.value = [];
      return;
    }
    commentsProject.value = comments;
  } catch (err) {
    console.error("Ошибка", err);
  }
};
const addComment = async () => {
  if (textComment.value == "") return;
  try {
    const { error } = await supabase.from("comments").insert({
      text: textComment.value,
      project_id: props.id,
      user_id: user.id,
    });

    if (error) {
      console.log("error", error);
      return;
    }
    fetchComments();
    textComment.value = "";
  } catch (err) {
    console.error("Ошибка", err);
  }
};
onMounted(async () => {
  await fetchComments();
  console.log(commentsProject.value);
});
</script>
<template>
  <h2>Комментарии к проекту ({{ commentsProject?.length }}):</h2>
  <div class="full-w flex flex-column project">
    <div class="comments scroll" v-if="commentsProject?.length > 0">
      <ProjectComment
        v-for="assessment in commentsProject"
        :key="assessment.id"
        :comment="assessment"
      ></ProjectComment>
    </div>
    <div v-else style="text-align: center" class="full-wh">
      <h5 style="margin-top: 200px">Комментариев нет</h5>
    </div>
    <div class="add flex" v-if="user.role == 'expert'">
      <textarea wrap="soft" class="scroll" v-model="textComment"></textarea>
      <button @click="addComment()"><h3>Отправить</h3></button>
    </div>
  </div>
</template>
<style scoped lang="scss">
h2 {
  margin-top: 40px;
}
.project {
  position: relative;
  height: 800px;
}
.comments {
  height: 600px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.add {
  width: 600px;
  position: absolute;
  right: 0;
  bottom: 0;
  justify-content: end;
  flex-wrap: wrap;
  gap: 10px;
  textarea {
    right: 0;
    min-width: 600px;
    max-width: 600px;
    min-height: 100px;
    max-height: 200px;
    padding: 10px 20px;
    background: rgb(204, 204, 204, 0.1);
    border: 1px solid #ccc;
    border-radius: 20px;
    color: $third-color;
    resize: none;
  }
}
@media screen and (max-width: 1280px) {
  .project {
    position: relative;
    height: 600px;
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
    height: 300px;
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
