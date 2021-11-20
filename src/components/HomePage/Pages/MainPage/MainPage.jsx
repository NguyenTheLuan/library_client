import React from "react";
import About from "../About/About";
import Contact from "../Contact/Contact";
import DanhMuc from "../DanhMuc/DanhMuc";
import Rating from "../Rating/Rating";

function MainPage() {
  return (
    <>
      <About />
      <DanhMuc />
      <Rating />
      <Contact />
    </>
  );
}

export default MainPage;
