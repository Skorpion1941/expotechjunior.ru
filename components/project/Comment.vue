<script setup lang="ts">
import { defineProps } from "vue";
const supabase = useSupabaseClient();
const { user } = useAuthStore();
const props = defineProps({
  comment: Object,
  onClickDelete: Function,
});
const deleteComment = async () => {
  try {
    await supabase
      .from("comments")
      .delete()
      .eq("id", props.comment?.id as number);
    console.log("deleted comment", props.comment?.id);
    props.onClickDelete();
  } catch (error) {
    console.error("error", error);
  }
};
</script>
<template>
  <div class="comment">
    <div class="comment-info">
      <div class="avatar">
        <UiAvatar
          :path="props.comment?.profiles.avatar_url"
          width="100%"
          height="100%"
        ></UiAvatar>
      </div>
      <h4>
        {{ props.comment?.profiles.surname }} {{ props.comment?.profiles.name }}
        {{ props.comment?.profiles.patronymic }}
      </h4>
    </div>
    <div class="flex">
      <h6>
        {{ props.comment?.text.replace(/\s/g, "&nbsp;") }}
      </h6>
      <button
        @click="deleteComment"
        style="
          background: none !important;
          border: none !important ;
          margin-top: -25px;
        "
        v-if="user.role == 'admin'"
      >
        <Icon
          name="material-symbols:delete-forever-outline-sharp"
          size="40"
          color="#02caaf"
        ></Icon>
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.img {
  width: 70px;
}

.comment {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &-info {
    display: flex;
    gap: 5px;
    justify-content: flex-start;
    h4 {
      align-self: center;
    }
    .avatar {
      width: 50px;
      height: 50px;
    }
  }
  h6 {
    //background: rgb(2, 202, 175, 0.2);
    background: rgb(4, 144, 214, 0.2);
    overflow: hidden;
    text-align: left;
    width: 700px;
    border: 1px solid white;
    padding: 10px;
    border-radius: 15px;
    margin: -20px 0 0 50px;
  }
}
@media screen and (max-width: 1280px) {
  .comment {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &-info {
      display: flex;
      gap: 5px;
      justify-content: flex-start;
      h4 {
        align-self: center;
      }
      .avatar {
        width: 35px;
        height: 35px;
      }
    }
    h6 {
      padding: 7px;
      width: 450px;
      margin: -17px 0 0 35px;
    }
  }
}
</style>
