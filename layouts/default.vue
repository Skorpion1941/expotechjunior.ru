<script lang="ts" setup>
import { nameModal, modalShow, titleModal } from "~/components/modal/useModal";
import { useAuthStore } from "~/store/auth.store";
import { fetchDirections } from "~/util/useDirections";

const store = useAuthStore();
const supabase = useSupabaseClient();
const isLoadingStore = useIsLoadingStore();
const organization = ref({ name: [], city: [] });
const fetchOrganization = async (id: string) => {
  const { data } = await supabase
    .from("organizations")
    .select("name, city")
    .eq("id", id);
  organization.value = data as any;
};
const seeUser = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      await fetchOrganization(data.session.user?.user_metadata.organization_id);
      store.set({
        id: data.session.user?.id,
        email: data.session.user?.email,
        name: data.session.user?.user_metadata.name,
        surname: data.session.user?.user_metadata.surname,
        patronymic: data.session.user?.user_metadata.patronymic,
        avatar_url: data.session.user?.user_metadata.avatar_url,
        post: data.session.user?.user_metadata.post,
        about_me: data.session.user?.user_metadata.about_me,
        directions: data.session.user?.user_metadata.directions,
        organization: organization.value,
        role: data.session.user?.user_metadata.role,
        status: true,
      });
      console.log(store.user);
    }
    if (error) throw error;
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingStore.set(false);
  }
};
onMounted(async () => {
  await seeUser();
  await fetchDirections();
  console.log(store.user);
});
</script>

<template>
  <LayoutLoader v-if="isLoadingStore.isLoading"></LayoutLoader>
  <div v-else>
    <ModalCommon
      v-if="modalShow"
      :title="titleModal"
      :name-form="nameModal"
    ></ModalCommon>
    <LayoutHeader></LayoutHeader>
    <div>
      <slot></slot>
    </div>
    <LayoutFooter></LayoutFooter>
  </div>
</template>

<style scoped lang="scss">
div {
  width: 100%;
  max-width: 1920px;
  margin: auto;
}
</style>
