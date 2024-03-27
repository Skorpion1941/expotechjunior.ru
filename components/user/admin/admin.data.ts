interface TableData {
  name: string;
  table: string;
  select: boolean;
}
export const TABLE_DATA = ref<TableData[]>([
  {
    name: "Пользователи",
    table: "profile",
    select: false,
  },
  {
    name: "Проекты",
    table: "project",
    select: true,
  },
  {
    name: "Направления",
    table: "profile",
    select: false,
  },
  {
    name: "Организации",
    table: "profile",
    select: false,
  },
  {
    name: "Рассписагие",
    table: "profile",
    select: false,
  },
  {
    name: "Формы оценивания",
    table: "profile",
    select: false,
  },
]);
