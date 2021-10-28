import Logout from "components/Auth/Logout/Logout";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/userSlice";

function AdminPage() {
  const admin = useSelector(selectUser);
  return (
    <div className="adminMenu">
      <h2>Xin chào, {admin.name}</h2>
      <Logout />
    </div>
  );
}

export default AdminPage;
