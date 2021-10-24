import Forgot_Password from "components/Auth/Forgot-Password/Forgot_Password";
import Register from "components/Auth/Register/Register";
import Auth from "containers/Auth/Auth";
import HomePage from "containers/HomePage/HomePage";

export const MAIN_PAGES = [
  {
    name: "Trang chủ",
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    name: "Đăng nhập",
    path: "/login",
    exact: false,
    main: () => <Auth />,
  },
  {
    name: "Đăng Ký",
    path: "/register",
    exact: false,
    main: () => <Register />,
  },
  {
    name: "Quên Mật Khẩu",
    path: "/forgot-password",
    exact: false,
    main: () => <Forgot_Password />,
  },
];

export const AUTH_USER_ROUTES = [
  // {
  //   name: "Đăng nhập",
  //   path: "/login",
  //   exact: false,
  //   main: () => "Trang Đăng Nhập",
  // },
  // {
  //   name: "Đăng Ký",
  //   path: "/register",
  //   exact: false,
  //   main: () => "Trang Đăng Ký",
  // },
  // {
  //   name: "Quên Mật Khẩu",
  //   path: "/forgot-password",
  //   exact: false,
  //   main: () => "Trang Tìm Lại Mật Khẩu",
  // },
];

export const AUTH_ADMIN_ROUTES = [
  {
    name: "Trang đăng nhập admin",
    path: "/admin/login",
    exact: false,
    main: () => "Đăng nhập",
  },
];

export const ADMIN_DASHBOARD_ROUTES = [
  {
    name: "Dash-board",
    // path: ["/admin/dash-board", "/admin"],
    path: "/admin",
    exact: true,
    main: () => "Trang dash-board",
  },
];
export const ADMIN_DASHBOARD_USER = [
  {
    name: "Quản lý user",
    path: "/admin/users",
    exact: false,
    main: () => "Trang admin quản lý user",
  },
];

export const HOME_ROUTES = [
  {
    name: "Cộng đồng",
    path: "/community",
    exact: false,
    main: () => "cộng đồng trang",
  },
  {
    name: "Tư Liệu",
    path: "/tu-lieu",
    exact: false,
    main: () => "cộng đồng trang tư liệu",
  },
  {
    name: "Bài giảng",
    path: "/bai-giang",
    exact: false,
    main: () => "cộng đồng bài giảng",
  },
];
