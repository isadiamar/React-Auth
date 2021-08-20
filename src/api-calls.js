export const authentication = async (url, userEmail, userPassword) => {
  return await fetch(`${url}${process.env.REACT_APP_AUTH_API_KEY}`, {
    method: "POST",
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const change_password = async (url, userToken, userPassword) => {
  return await fetch(`${url}${process.env.REACT_APP_AUTH_API_KEY}`, {
    method: "POST",
    body: JSON.stringify({
      idToken: userToken,
      password: userPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
