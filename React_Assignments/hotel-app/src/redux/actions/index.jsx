export const user_auth = (acceptUser) => {
  return {
    type: "USER_AUTH",
    payload: acceptUser,
  };
};

export const rooms_data = (data) => {
  return {
    type: "ROOMS_DATA",
    payload: data,
  };
};
