export const nameModal = ref("");
export const titleModal = ref("");
export const modalShow = ref(false);

export const nameFromModal = ref("");
export const titleFromModal = ref("");
export const backShow = ref(false);
export const openModal = (name: string, title: string, back: boolean) => {
  nameModal.value = name;
  titleModal.value = title;
  modalShow.value = true;
  backShow.value = back;
};
export const closeModal = () => {
  modalShow.value = false;
  console.log(modalShow.value);
};
export const fromModal = (name: string, title: string, back: boolean) => {
  nameFromModal.value = name;
  titleFromModal.value = title;
  modalShow.value = true;
  backShow.value = back;
};
