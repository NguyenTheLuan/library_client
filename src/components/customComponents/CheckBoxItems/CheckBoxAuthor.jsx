import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function CheckBoxAuthor({ onAuthorName }) {
  const [authorNames, setAuthorNames] = useState(null);
  //render lại
  useEffect(() => {
    getAuthorName();
  }, []);

  const getAuthorName = async () => {
    try {
      const response = await productsApi.getAuthorName();
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
      name="authors"
      className="formSearchAdmin_search_items"
      onChange={(e) => onAuthorName({ [e.target.name]: e.target.value })}
    >
      <option>Tên tác giả</option>
      {adminCheckBox}
    </Form.Select>
  );
}

export default CheckBoxAuthor;
