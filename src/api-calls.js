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
