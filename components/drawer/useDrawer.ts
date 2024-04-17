export const commentValue = reactive({
  show: false,
  comment: [],
});
export const openComment = (item: any) => {
  if (item == null) {
    return;
  }
  commentValue.show = true;
  commentValue.comment = item;
  console.log(commentValue.comment);
};
export const closeComment = () => {
  commentValue.show = false;
};
