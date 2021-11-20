import SearchForm from "components/customComponents/InputForms/SearchForm/SearchForm";
import { BookHome } from "components/HomePage/Contains/BookHome/BookHome";
import React from "react";
import { useRouteMatch } from "react-router";
import "./DanhMuc.scss";

function DanhMuc() {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <div id="danh-muc-sach" className="pageContainer">
      <div className="pageContainer_contents">
        <div className="categoriesForm">
          <legend className="form_name">Danh mục sách</legend>
          <div className="categoriesForm_search">
            <SearchForm />
          </div>
          <div className="categoriesForm_contents">
            <BookHome />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DanhMuc;
