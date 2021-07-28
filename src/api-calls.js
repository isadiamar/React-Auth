export const signUp = (userEmail, userPassword) => {
  fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_AUTH_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  ).then((res) => {
    //OK
    if (res.ok) {
      //...
    }
    //ERROR
    else {
      res.json().then((data) => {
        console.log(data);
      });
    }
  });
};
