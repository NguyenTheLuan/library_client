import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import "./ProductDetails.scss";

function ProductDetails() {
  const [getDetails, setGetDetails] = useState([]);
  const { itemsId } = useParams();
  //   console.log("trang details", itemsId);

  useEffect(() => {
    // let isCancelled = false;
    // !isCancelled && getDetail();
    // return () => {
    //   isCancelled = true;
    // };
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const response = await productsApi.getBooksById(itemsId);
      setGetDetails([response]);
    } catch (error) {
      console.log({ error });
    }
  };

  //   console.log(getDetails);
  const renderBook = getDetails?.map((details) => {
    return (
      <div className="contain">
        <div className="contain_img">
          <img alt="img-title" src={details.cover} />
        </div>
        <div className="contain_contents">
          <span className="contain_contents_title">{details.title}</span>
          <span className="contain_contents_author">
            Tác giả: {details.author}
          </span>
          <span className="contain_contents_quantity">
            Còn lại: {details.coppies}
          </span>
          <span className="contain_contents_periods">
            Thời gian cho mượn: {details.loanPeriodDays}
          </span>
          <Button className="contain_contents_btn">Mượn Ngay</Button>
        </div>
      </div>
    );
  });

  return <div className="box">{renderBook}</div>;
}

export default ProductDetails;
