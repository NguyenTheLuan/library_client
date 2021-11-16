import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";
import "./SearchForm.scss";

function SearchUsersAdmin({ onChangeInfo }) {
  const [searchInfo, setSearchInfo] = useState();

  const isRole = useSelector(selectUser);

  //Check role
  const checkRole = () => {
    if (isRole.role === "admin") {
      return (
        <>
          <option value="user">Người Dùng</option>
          <option value="librarian">Thủ thư</option>
          <option value="admin">Admin</option>
        </>
      );
    }
    if (isRole.role === "librarian") {
      return <option value="user">Người Dùng</option>;
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
  };

  const handleChangeInfo = () => {
    // console.log("Truyền cho view user", searchInfo);
    onChangeInfo(searchInfo);
  };

  return (
    <Form className="formSearchAdmin_search" onSubmit={handleForm}>
      {/* <div className="formSearchAdmin_search"> */}
      <Form.Group
        className="formSearchAdmin_search_items"
        onClick={() => handleChangeInfo()}
      >
        <Form.Control
          name="name"
          className="formInput"
          placeholder="Nhập tên người dùng"
          onChange={(e) => {
            if (e.target.value !== "") {
              setSearchInfo({
                ...searchInfo,
                [e.target.name]: e.target.value,
              });
            } else {
              setSearchInfo({
                ...searchInfo,
                [e.target.name]: " ",
              });
            }
          }}
        ></Form.Control>
      </Form.Group>

      <Form.Group
        className="formSearchAdmin_search_items"
        onClick={() => handleChangeInfo()}
      >
        <Form.Select
          name="role"
          onChange={(e) =>
            setSearchInfo({
              ...searchInfo,
              [e.target.name]: e.target.value,
            })
          }
        >
          {checkRole()}
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="formSearchAdmin_search_items"
        onClick={() => handleChangeInfo()}
      >
        <Form.Select
          name="status"
          onChange={(e) =>
            setSearchInfo({
              ...searchInfo,
              [e.target.name]: e.target.value,
            })
          }
        >
          <option value="active">Kích hoạt</option>
          <option value="inactive">Không kích hoạt</option>
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="formSearchAdmin_search_items"
        onClick={() => handleChangeInfo()}
      >
        <Form.Select
          name="sortBy"
          onChange={(e) =>
            setSearchInfo({
              ...searchInfo,
              [e.target.name]: e.target.value,
            })
          }
        >
          <option value="name:asc">{`A -> Z`}</option>
          <option value="name:desc">{`Z -> A`}</option>
        </Form.Select>
      </Form.Group>
      {/* </div> */}
      <Button type="submit" onClick={() => handleChangeInfo()}>
        Tìm Kiếm Người dùng
      </Button>
    </Form>
  );
}

export default SearchUsersAdmin;
