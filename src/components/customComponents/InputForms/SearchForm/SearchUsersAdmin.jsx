import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";

import { FcSearch } from "react-icons/fc";

import "./SearchForm.scss";

function SearchUsersAdmin({ onChangeInfo }) {
  //Search Form
  const [searchInfo, setSearchInfo] = useState({});

  useEffect(() => {
    onChangeInfo(searchInfo);
  }, [searchInfo]);

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
    onChangeInfo(searchInfo);
  };

  return (
    <Form className="formSearch" onSubmit={handleForm}>
      <div className="checkboxForm">
        <Form.Group className="checkboxForm_items">
          <Form.Label className="checkboxForm_items_label">Chức vụ</Form.Label>
          <Form.Select
            className="checkboxForm_items_control"
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
        <Form.Group className="checkboxForm_items">
          <Form.Label className="checkboxForm_items_label">
            Trạng thái
          </Form.Label>
          <Form.Select
            className="checkboxForm_items_control"
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
        <Form.Group className="checkboxForm_items">
          <Form.Label className="checkboxForm_items_label">Sắp xếp</Form.Label>
          <Form.Select
            className="checkboxForm_items_control"
            name="sortBy"
            onChange={(e) =>
              setSearchInfo({
                ...searchInfo,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="name:asc">Tăng dần</option>
            <option value="name:desc">Giảm dần</option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="inputForm">
        <Form.Group className="inputForm_items">
          <Form.Label className="inputForm_items_label">
            Tên người dùng
          </Form.Label>
          <Form.Control
            name="name"
            className="inputForm_items_control"
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
          />
        </Form.Group>
        <Button
          className="inputForm_button"
          type="submit"
          onClick={() => handleChangeInfo()}
        >
          <FcSearch style={{ fontSize: "30px" }} />
          Tìm Kiếm
        </Button>
      </div>
    </Form>
  );
}

export default SearchUsersAdmin;
