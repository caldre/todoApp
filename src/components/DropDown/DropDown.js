import React from "react";

const DropDown = (props) => {
  const { setSelectedUser, options } = props;

  const handleChange = (e) => {
    setSelectedUser(Number(e.target.value));
  };

  const renderedUserList = options.map((option) => {
    return (
      <option key={option} onChange={() => setSelectedUser(option)}>
        {option}
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
