import userApi from "apis/userApi";
import React from "react";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteBookById } from "reducers/bookSlice";
import { selectUser } from "reducers/userSlice";
import "./ButtonStyleCarts.scss";

function ButtonDeleteCarts({ product, onUpdateCart }) {
  // console.log("delete products", { product });
  const user = useSelector(selectUser);
  const history = useHistory();
  const { id } = product;

  const dispatch = useDispatch();

  // const [update, setUpdate] = useState(false);
  // useEffect(() => {}, []);

  const deleteCarts = async () => {
    //Truyền vào userId và bookId để tiến thành xoá
    const userId = user.id;
    const bookId = product.id;
    try {
      await userApi.deleteBooksOfCart(userId, bookId);
      console.log("xoá thành công");

      //set lại carts
      // setUpdate(!update);

      //xoá bookById và resetup cho redux
      dispatch(deleteBookById(bookId));
      //Thông báo xoá thành công
      // alert("Xoá sản phẩm thành công");
    } catch (error) {
      console.log("lỗi tại delecarts", { error });
    }
  };

  const handleClick = () => {
    if (!user) {
      history.push("/login");
    } else {
      //Xoá book by id
      deleteCarts();

      //truyền id xoá cho thằng cha
      getIdCart(id);
    }
  };

  //truyền props cho cha để reset cart
  const getIdCart = (isUpdate) => {
    return onUpdateCart(isUpdate);
  };
  return (
    <>
      <Button
        variant="danger"
        className="btnClick"
        onClick={() => handleClick()}
      >
        <MdDeleteForever className="btnClick_icon" />
        <span className="btnClick_name">Xoá sách</span>
      </Button>
    </>
  );
}

export default ButtonDeleteCarts;
