import productsApi from "apis/productsApi";
import ButtonAddCarts from "components/customComponents/ButtonHandleCarts/ButtonAddCarts";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./BookDetails.scss";

function BookDetails() {
  const [productDetails, setProductDetails] = useState([]);
  const { itemsId } = useParams();
  // console.log("trang details", itemsId);

  const checkQuantity = (books) => {
    // console.log(books);
    return books.length;
  };
  const checkAuthorName = (author) => {
    // console.log("tác giả", author);
    return author;
  };
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await productsApi.getBooksById(itemsId);
      setProductDetails([response]);
    } catch (error) {
      console.log({ error });
    }
  };

  // console.log(productDetails);
  //   console.log(getDetails);
  const renderBook = productDetails?.map((details, index) => {
    return (
      <div className="containProducts_details" key={index}>
        {/* Hình ảnh minh hoạ */}
        <div className="containProducts_details_img">
          <img alt="img-title" src={details.cover} />
        </div>
        {/* Thông tin chi tiết */}
        <table className="containProducts_details_contents">
          <tbody>
            <tr className="containProducts_details_contents_rows">
              <td>
                <strong>Tên</strong>
              </td>
              <td>{details.title}</td>
              <td></td>
            </tr>
            <tr className="containProducts_details_contents_rows">
              <td>
                <strong>Tác giả</strong>
              </td>
              <td>{checkAuthorName(details.authors)}</td>
              <td></td>
            </tr>
            <tr className="containProducts_details_contents_rows">
              <td>
                <strong>Số lượng còn lại</strong>
              </td>
              <td>{checkQuantity(details.copies)}</td>
              <td></td>
            </tr>
            <tr className="containProducts_details_contents_rows">
              <td>
                <strong>Thời gian cho mượn</strong>
              </td>
              <td>{details.loanPeriodDays}</td>
              <td></td>
            </tr>
            <tr className="containProducts_details_contents_rows">
              <td>
                <ButtonAddCarts product={details} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });

  return (
    <div className="containProducts">
      <div className="containProducts_title">
        <span>Thông tin chi tiết</span>
      </div>
      {renderBook}
      <div className="containProducts_title">
        <span>Những cuốn sách liên quan</span>
      </div>
    </div>
  );
}

export default BookDetails;