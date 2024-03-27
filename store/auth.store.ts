interface IAuthStore {
  id: any;
  email: any;
  name: any;
  surname: any;
  patronymic: any | undefined;
  avatar_url: any | undefined;
  post: any;
  about_me: any | undefined;
  directions: any | undefined;
  organization: any;
  role: any;
  status: boolean;
}
const defineValue: { user: IAuthStore } = {
  user: {
    id: "",
    email: "",
    name: "",
    surname: "",
    patronymic: "",
    avatar_url: "",
    post: "",
    about_me: "",
    directions: {},
    organization: {},
    role: "",
    status: false,
  },
};
export const useAuthStore = defineStore("auth", {
  state: () => defineValue,
  getters: {
    isAuth: (state) => state.user.status,
  },
  actions: {
    clear() {
      this.$patch({ user: defineValue.user });
    },
    set(input: IAuthStore) {
      this.$patch({ user: input });
    },
  },
});

export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({ isLoading: true }),
  actions: {
    set(load: boolean) {
      this.$patch({ isLoading: load });
    },
  },
});
