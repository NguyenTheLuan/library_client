import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function CheckBoxCategory({ onCategoryName, status }) {
  // console.log("categories", status);
  const [authorNames, setAuthorNames] = useState(null);
  //render lại
  useEffect(() => {
    getAuthorName();
  }, []);

  const getAuthorName = async () => {
    try {
      const response = await productsApi.getCategoriesName();
      //   console.log("đã nhận được tên tác giả", response);
      setAuthorNames(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const adminCheckBox = authorNames?.map((adminName, index) => {
    if (adminName) {
      return <option key={index}>{adminName}</option>;
    }
  });

  return (
    <Form.Select
      disabled={status}
      name="categories"
      className="formSearchAdmin_search_items"
      onChange={(e) => onCategoryName({ [e.target.name]: e.target.value })}
    >
      <option value=" ">Thể loại</option>
      {adminCheckBox}
    </Form.Select>
  );
}

export default CheckBoxCategory;
