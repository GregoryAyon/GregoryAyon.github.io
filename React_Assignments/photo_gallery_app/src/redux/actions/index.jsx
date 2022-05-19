export const fb_create = (submittedData) => {
  return {
    type: "FB_CREATE",
    payload: submittedData,
  };
};

export const user_auth = (acceptUser) => {
  return {
    type: "USER_AUTH",
    payload: acceptUser,
  };
};
