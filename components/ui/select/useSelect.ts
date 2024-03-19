export function addChecked(array: any, item: any, checked: boolean) {
  if (checked) {
    array.push(item);
    console.log(array);
  } else {
    array.splice(array.indexOf(item), 1);
    console.log(array);
  }
}
