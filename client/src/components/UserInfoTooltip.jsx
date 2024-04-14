import React from 'react';

const UserInfoTooltip = ({ user }) => {
  return (
    <div className="user-info-tooltip">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserInfoTooltip;
