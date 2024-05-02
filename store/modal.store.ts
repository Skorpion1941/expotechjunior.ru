// const modalStore = useModalStore();
// store.open({ name: 'login', title: 'Вход' })
interface IModalStore {
  show?: boolean;
  name: string;
  title: string;
  item?: any;
  backShow?: boolean;
  nameFrom?: string;
  titleFrom?: string;
  tableDelete?:
    | "projects"
    | "assessments"
    | "schedules"
    | "forms"
    | "directions"
    | "profiles"
    | null;
  textDelete?: string;
  textNotice?: string;
}
const modalValue: { modal: IModalStore } = {
  modal: {
    show: false,
    name: "",
    title: "",
    item: [],
    backShow: false,
    nameFrom: "",
    titleFrom: "",
    tableDelete: null,
    textDelete: "",
    textNotice: "",
  },
};
export const useModalStore = defineStore("modal", {
  state: () => modalValue,
  actions: {
    open(value: IModalStore) {
      this.$patch({ modal: value });
      this.modal.show = true;
    },
    close() {
      this.$patch({ modal: { show: false } });
    },
  },
});
