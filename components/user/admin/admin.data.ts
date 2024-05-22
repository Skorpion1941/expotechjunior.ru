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
    titleCreateModal: "Добавить пользователя",
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
    titleCreateModal: "Добавить направление",
  },
  {
    name: "Расписание",
    table: "schedule",
    select: false,
    nameCreateModal: "scheduleCreate",
    titleCreateModal: "Добавить проект в расписание",
  },
  {
    name: "Формы оценки проектов",
    table: "form",
    select: false,
    nameCreateModal: "formCreate",
    titleCreateModal: "Добавить YandexForm",
  },
]);
