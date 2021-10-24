import React from "react";
import { Route } from "react-router";

export function MainRoute() {
  return (
    <>
      <Route path="/community" component={() => "trang cộng đỒng"} />
      <Route path="/tu-lieu" component={() => "trang tư liệu"} />
      <Route path="/bai-giang" component={() => "trang bài giảng"} />
    </>
  );
}
