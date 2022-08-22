const removeByItemIndex = (list: Array<any>, item: any) => {
  const index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
  }
};

export default removeByItemIndex;
