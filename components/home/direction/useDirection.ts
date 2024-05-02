export const directionValue = reactive({
  id: 0,
  name: "Все",
});
export const selectDirection = (id: number, name: string) => {
  directionValue.id = id;
  directionValue.name = name;
};
