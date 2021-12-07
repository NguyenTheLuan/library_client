import accountApi from "apis/authApi";
import ActiveEmail from "components/Auth/ActiveEmail/ActiveEmail";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";
import "./Profile.scss";

function Profile() {
  document.title = "Thông tin cá nhân";

  // const { path, url } = useRouteMatch();
  // console.log(path);
  const user = useSelector(selectUser);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getInfo();
  }, []);

  // console.log("User Info: ", userInfo);

  const isActiveEmail = (active) => {
    if (!active) {
      return <ActiveEmail email={user.email} />;
    } else {
      return <Button disabled>Đã kích hoạt</Button>;
    }
  };

  const getInfo = async () => {
    try {
      const response = await accountApi.getInfoUser(user.id);
      // console.log(response);
      setUserInfo([response]);
    } catch (error) {
      // // setError(error.response.data.message);
      console.log("lỗi rồi", { error });
    }
  };

  const renderInfo = userInfo?.map((info) => {
    return (
      <>
        <div>
          <strong>Tên người dùng</strong> {info.name}
        </div>
        <div>
          <span>
            <strong>Địa chỉ email</strong> {info.email}
          </span>
          <span>{isActiveEmail(info.isEmailVerified)}</span>
        </div>
      </>
    );
  });

  return (
    <div className="menuProfile">
      <div className="menuProfile_info">{renderInfo}</div>
      <button>Thay đổi thông tin</button>
    </div>
  );
}

export default Profile;
