// dd-mm-yy
export const renderDate = (time) => {
  const date = new Date(time);
  var dd = String(date.getUTCDate()).padStart(2, "0");
  var mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  //January is 0!
  var yyyy = date.getUTCFullYear();

  //time
  // var minutes = date.getUTCMinutes();
  // var hours = date.getUTCHours();
  var minutes = ("0" + date.getUTCMinutes()).slice(-2);
  var hours = ("0" + date.getUTCHours()).slice(-2);

  return dd + "/" + mm + "/" + yyyy + " lúc " + hours + ":" + minutes;
};

export const renderDateNow = (time) => {
  const date = new Date(time);
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  //January is 0!
  var yyyy = date.getFullYear();

  //time
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);

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

//Pagination
export const renderPagination = (c, m) => {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

// render status
export const renderStatus = (status) => {
  switch (status) {
    //Lịch hẹn
    case "pending":
      return <>Đang hẹn</>;
    case "fulfilled":
      return <>Thành công</>;
    case "expired":
      return <>Hết hạn</>;

    //Trạng thái sách
    case "returned":
      return <>Đã trả</>;
    case "available":
      return <>Đang trống</>;
    case "borrowing":
      return <>Đang mượn</>;
    case "borrowed":
      return <>Đang mượn</>;
    case "canceled":
      return <>Đã huỷ</>;
    default:
      return <>{status} </>;
  }
};

// render activities
export const renderActions = (actions) => {
  switch (actions) {
    //Sách
    case "import":
      return <> Nhập sách</>;
    case "delete_book":
      return <> Xoá sách</>;
    case "update_book":
      return <> Cập nhật sách</>;
    case "lease":
      return <> Cho mượn sách</>;
    case "receive":
      return <> Nhận lại sách</>;
    //Người dùng
    case "create_user":
      return <> Tạo người dùng</>;
    case "update_user":
      return <> Cập nhật người dùng</>;
    case "delete_user":
      return <> Xoá người dùng</>;
    default:
      return <>{actions}</>;
  }
};

export const renderBarCode = (barCode, id) => {
  if (barCode) {
    return <>{barCode}</>;
  } else {
    return <>{id}</>;
  }
};


export const renderCheckActive = (active) => {
  if (active === "active") {
    return <> Kích hoạt </>
  }
  if (active === "inactive") {
    return <> Không kích hoạt </>
  }
}