export const modalValue = reactive({
  name: "",
  title: "",
  show: false,
  nameFrom: "",
  titleFrom: "",
  backShow: false,
});
export const itemValue = ref();
export const openModal = (
  name: string,
  title: string,
  back: boolean,
  item?: any
) => {
  modalValue.name = name;
  modalValue.title = title;
  modalValue.show = true;
  modalValue.backShow = back;
  if (item != null) {
    itemValue.value = item;
  }
};
export const closeModal = () => {
  modalValue.show = false;
};
export const fromModal = (name: string, title: string, back: boolean) => {
  modalValue.nameFrom = name;
  modalValue.titleFrom = title;
  modalValue.show = true;
  modalValue.backShow = back;
};
