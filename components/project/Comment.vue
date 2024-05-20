<script setup lang="ts">
import { defineProps } from "vue";
const supabase = useSupabaseClient();
const { user } = useAuthStore();
const props = defineProps({
  comment: Object,
  onDeleteComment: Function,
});
const deleteComment = async (id: number) => {
  try {
    await supabase.from("comments").delete().eq("id", id);
    props.onReloadComments;
  } catch (error) {
    console.error("error", error);
  }
};
</script>
<template>
  <div class="flex">
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
          {{ props.comment?.profiles.surname }}
          {{ props.comment?.profiles.name }}
          {{ props.comment?.profiles.patronymic }}
        </h4>
        <p style="text-align: end">
          {{ props.comment?.created_at.slice(0, 10) }}
        </p>
      </div>
      <div class="flex">
        <h6>
          {{ props.comment?.text.replace(/\s/g, "&nbsp;") }}
        </h6>
      </div>
    </div>
    <button
      @click="props.onDeleteComment"
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
</template>
<style scoped lang="scss">
.img {
  width: 70px;
}

.comment {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &-info {
    display: flex;
    gap: 5px;
    justify-content: flex-start;
    h4,
    p {
      align-self: center;
    }
    p {
      flex-grow: 1;
      text-align: end;
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
    width: 100%;
    border: 1px solid white;
    word-wrap: break-word;
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
      margin: -17px 0 0 35px;
    }
  }
}
</style>
