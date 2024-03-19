import type { UiInput } from "../ui/Input.vue";
export interface ModalData {
  label: string;
  name: string;
  value: string;
  type?: string;
}
export const MODAL_DATA: UiInput[] = [
  {
    label: "Email",
    name: "email",
    modelValue: "authValue.email",
    type: "email",
    placeholder: "string",
    errors: "errors.email",
  },
  {
    label: "Пароль",
    name: "password",
    modelValue: "authValue.password",
    type: "text",
    placeholder: "string",
    errors: "errors.password",
  },
];
