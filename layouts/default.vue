<script lang="ts" setup>
import { useAuthStore } from "~/store/auth.store";
import { fetchDirections } from "~/util/useDirections";
import { fetchProjects } from "~/util/useProjects";
import { allProfiles, fetchProfiles } from "~/util/useProfiles";
import { fetchSchedules } from "~/util/useSchedules";
import { fetchAssessments } from "~/util/useAssessments";
import { useModalStore } from "~/store/modal.store";

const authStore = useAuthStore();
const { modal } = useModalStore();
const supabase = useSupabaseClient();
const isLoadingStore = useIsLoadingStore();
const myProfile = ref();

const seeUser = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      myProfile.value = Object.values(allProfiles.value).find(
        (profile: any) => profile.id == data.session.user?.id
      );
      authStore.set({
        id: myProfile.value.id,
        email: data.session.user?.email,
        name: myProfile.value.name,
        surname: myProfile.value.surname,
        patronymic: myProfile.value.patronymic,
        avatar_url: myProfile.value.avatar_url,
        post: myProfile.value.post,
        about_me: myProfile.value.about_me,
        directions: myProfile.value.directions,
        organization: myProfile.value.organization,
        city: myProfile.value.city,
        role: myProfile.value.role,
        status: true,
      });
    }
    if (error) throw error;
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingStore.set(false);
  }
};
onMounted(async () => {
  await fetchProfiles();
  await fetchDirections();
  await fetchProjects();
  await fetchAssessments();
  await fetchSchedules();
  await seeUser();
});
</script>
<template>
  <LayoutLoader v-if="isLoadingStore.isLoading"></LayoutLoader>
  <div v-else>
    <div style="min-height: 100%; display: flex; flex-direction: column">
      <LayoutHeader></LayoutHeader>
      <div class="wrapper">
        <ModalCommon v-if="modal.show"></ModalCommon>
        <slot></slot>
      </div>
      <LayoutFooter></LayoutFooter>
    </div>
  </div>
</template>

<style scoped lang="scss">
div {
  width: 100%;
  max-width: 1920px;
  margin: auto;
  overflow: hidden;
}
.wrapper {
  min-height: 581px;
  margin-top: 70px;
}
@media screen and (max-width: 1280px) {
  div {
    max-width: 1280px;
  }
  .wrapper {
    min-height: 481px;
    margin-top: 50px;
  }
}
</style>
