export function addChecked(array: any, item: any, checked: boolean) {
  if (checked) {
    array.push(item);
  } else {
    array.splice(array.indexOf(item), 1);
  }
}
