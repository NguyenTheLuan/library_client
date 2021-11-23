// dd-mm-yy
export const renderDate = (time) => {
  const date = new Date(time);
  var dd = String(date.getUTCDate()).padStart(2, "0");
  var mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  //January is 0!
  var yyyy = date.getUTCFullYear();

  //time
  var minutes = date.getUTCMinutes();
  var hours = date.getUTCHours();

  return dd + "/" + mm + "/" + yyyy + " lúc " + hours + ":" + minutes;
};

export const renderDateSearch = (time) => {
  const date = new Date(time);
  var dd = String(date.getUTCDate()).padStart(2, "0");
  var mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  //January is 0!
  var yyyy = date.getUTCFullYear();

  return dd + "/" + mm + "/" + yyyy;
};
