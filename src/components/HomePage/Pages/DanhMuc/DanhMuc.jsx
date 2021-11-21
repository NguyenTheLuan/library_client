import CheckBoxAuthor from "components/customComponents/CheckBoxItems/CheckBoxAuthor";
import CheckBoxCategory from "components/customComponents/CheckBoxItems/CheckBoxCategory";
import SearchForm from "components/customComponents/InputForms/SearchForm/SearchForm";
import { BookHome } from "components/HomePage/Contains/BookHome/BookHome";
import React, { useState } from "react";
import "./DanhMuc.scss";

function DanhMuc() {
  // const { path } = useRouteMatch();
  // console.log(path);

  const [searchInfo, setSearchInfo] = useState({});

  const handleCategoryName = (categoryName) => {
    // console.log("đã lấy được thể loại", categoryName);
    setSearchInfo({ ...searchInfo, ...categoryName });
  };
  const handleAuthorName = (authorName) => {
    // console.log("đã lấy được tên tác giả", authorName);
    setSearchInfo({ ...searchInfo, ...authorName });
  };

  return (
    <div id="danh-muc-sach" className="pageContainer">
      <div className="pageContainer_contents danh-muc">
        <div className="categoriesForm">
          <legend className="form_name">Danh mục sách</legend>
          <div className="categoriesForm_search">
            <div className="searchInput">
              <SearchForm />
            </div>
            <div className="searchChecbox">
              <CheckBoxAuthor onAuthorName={handleAuthorName} />
              <CheckBoxCategory onCategoryName={handleCategoryName} />
            </div>
          </div>
          <div className="categoriesForm_contents">
            <BookHome searchInfo={searchInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DanhMuc;
