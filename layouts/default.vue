<script lang="ts" setup>
import { modalValue } from "~/components/modal/useModal";

import { commentValue } from "~/components/drawer/useDrawer";
import { useAuthStore } from "~/store/auth.store";
import { fetchDirections } from "~/util/useDirections";
import { allOrganizations, fetchOrganizations } from "~/util/useOrganizations";
import { fetchProjects } from "~/util/useProjects";
import { allProfiles, fetchProfiles } from "~/util/useProfiles";
import { fetchSchedules } from "~/util/useSchedules";
import { allAssessments, fetchAssessments } from "~/util/useAssessments";

const store = useAuthStore();
const supabase = useSupabaseClient();
const isLoadingStore = useIsLoadingStore();
const organization = ref();
const myProfile = ref();

const seeUser = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      myProfile.value = Object.values(allProfiles.value).find(
        (profile: any) => profile.id == data.session.user?.id
      );

      store.set({
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
    console.log(store.user);
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
  await fetchOrganizations();
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
      <div style="min-height: 581px">
        <Drawer v-if="commentValue.show"></Drawer>
        <ModalCommon
          v-if="modalValue.show"
          :title="modalValue.title"
          :name-form="modalValue.name"
          :back-show="modalValue.backShow"
          :from-name-modal="modalValue.nameFrom"
          :from-title-modal="modalValue.titleFrom"
        ></ModalCommon>
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
@media screen and (max-width: 1280px) {
  div {
    max-width: 1280px;
  }
}
</style>
