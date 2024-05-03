export const directionValue = reactive({
  id: 0,
  name: "Все",
  active: false,
});
export const selectDirection = (id: number, name: string) => {
  directionValue.active = true;
  directionValue.id = id;
  directionValue.name = name;
};
