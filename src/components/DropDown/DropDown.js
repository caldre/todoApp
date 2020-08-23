import React from "react";

const DropDown = (props) => {
  const { setSelectedUser, users } = props;

  const handleChange = (e) => {
    setSelectedUser(Number(e.target.value));
  };

  const renderedUserList = users.map((user) => {
    return (
      <option key={user} onChange={() => setSelectedUser(user)} value={user}>
        {user}
      </option>
    );
  });

  return (
    <form onChange={(e) => handleChange(e)}>
      <label htmlFor="users">Select a user ID</label>
      <select name="users" id="userlist">
        {renderedUserList}
      </select>
    </form>
  );
};

export default DropDown;
