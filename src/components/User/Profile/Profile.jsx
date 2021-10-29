import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/userSlice";
import { Button } from "react-bootstrap";
import ActiveEmail from "components/Auth/ActiveEmail/ActiveEmail";

function Profile() {
  const user = useSelector(selectUser);
  const isActiveEmail = (active) => {
    if (!active) {
      return <ActiveEmail email={user.email} />;
    } else {
      return <Button disabled>Đã kích hoạt</Button>;
    }
  };

  return (
    <div>
      <h2>Hello, {user.name}</h2>
      <h2>Email, {user.email} </h2>
      <h2>{isActiveEmail(user.isEmailVerified)}</h2>
    </div>
  );
}

export default Profile;
