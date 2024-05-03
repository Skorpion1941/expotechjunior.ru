export interface TableData {
  name: string;
  table: string;
  select: boolean;
  nameCreateModal: string;
  titleCreateModal: string;
}

export const TABLE_DATA = ref<TableData[]>([
  {
    name: "Пользователи",
    table: "profile",
    select: false,
    nameCreateModal: "userCreate",
    titleCreateModal: "Добавить проект",
  },
  {
    name: "Проекты",
    table: "project",
    select: true,
    nameCreateModal: "projectCreate",
    titleCreateModal: "Добавить проект",
  },
  {
    name: "Направления",
    table: "direction",
    select: false,
    nameCreateModal: "directionCreate",
    titleCreateModal: "Добавить напрваление",
  },
  {
    name: "Расписание",
    table: "schedule",
    select: false,
    nameCreateModal: "scheduleCreate",
    titleCreateModal: "Добавить проект в рассписание",
  },
  {
    name: "Формы для оценивания",
    table: "form",
    select: false,
    nameCreateModal: "formCreate",
    titleCreateModal: "Добавить YandexForm",
  },
]);
