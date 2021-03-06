export const sortArrayByDueDate = (array) => {
  return array.sort(function(firstItem, secondItem) {
    var firstItemDueDate = new Date(firstItem.due_date);
    var secondItemDueDate = new Date(secondItem.due_date);
    return firstItemDueDate - secondItemDueDate;
  })
}

export const removeItem = (list, key) => {
  let items = list.filter(function(item) { 
    return item !== key; 
  });
  return items;
}

export const getToday = () => {
  var today = new Date();
      var now_date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      return now_date;
}