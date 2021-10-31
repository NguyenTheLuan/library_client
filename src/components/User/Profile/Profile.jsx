import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/userSlice";
import { Alert, Button } from "react-bootstrap";
import ActiveEmail from "components/Auth/ActiveEmail/ActiveEmail";
import accountApi from "apis/authApi";

import "./Profile.scss";

function Profile() {
  const user = useSelector(selectUser);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getInfo();
  }, []);

  console.log("User Info: ", userInfo);

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
      setUserInfo(response);
    } catch (error) {
      setError({ error });
    }
  };

  return (
    <div className="menuProfile">
      {error && (
        <Alert variant="warning" style={{ width: "90%" }}>
          {error}
        </Alert>
      )}
      <div className="menuProfile_info">
        <h2>
          Tên người dùng:<span>{userInfo.name}</span>
        </h2>
        <h2>
          Địa chỉ email:<span>{userInfo.email}</span>
        </h2>
        <h2>{isActiveEmail(userInfo.isEmailVerified)}</h2>
      </div>
    </div>
  );
}

export default Profile;
