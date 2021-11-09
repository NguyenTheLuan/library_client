import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./SearchForm.scss";

function SearchUsersAdmin({ onChangeInfo }) {
  const [searchInfo, setSearchInfo] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
  };
  const handleChangeInfo = () => {
    onChangeInfo(searchInfo);
  };

  return (
    <>
      <Form className="formSearchAdmin" onSubmit={handleForm}>
        <div className="formSearchAdmin_search">
          <Form.Group
            className="formSearchAdmin_search_items"
            onClick={() => handleChangeInfo()}
          >
            <Form.Control
              name="name"
              className="formInput"
              placeholder="Nhập tên người dùng"
              onChange={(e) =>
                setSearchInfo({
                  ...searchInfo,
                  [e.target.name]: e.target.value,
                })
              }
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
              <option value="user">Người Dùng</option>
              <option value="librarian">Thủ thư</option>
              <option value="admin">Admin</option>
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
        </div>
        <Button type="submit" onClick={() => handleChangeInfo()}>
          Tìm
        </Button>
      </Form>
    </>
  );
}

export default SearchUsersAdmin;
