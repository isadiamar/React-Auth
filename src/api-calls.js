export const authentication = (url, userEmail, userPassword) => {
  fetch(`${url}${process.env.REACT_APP_AUTH_API_KEY}`, {
    method: "POST",
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    //SUCCESS
    if (res.ok) {
      return res.json();
    }
    //ERROR
    else {
      return res.json().then((data) => {
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
      });
    }
  });
};
