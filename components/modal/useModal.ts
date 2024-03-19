export const nameModal = ref("");
export const titleModal = ref("");
export const modalShow = ref(false);

export const openModal = (name: string, title: string) => {
  nameModal.value = name;
  titleModal.value = title;
  modalShow.value = true;
};
export const closeModal = () => {
  modalShow.value = false;
  console.log(modalShow.value);
};
