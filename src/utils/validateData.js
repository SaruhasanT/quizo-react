export const validateEmail = (email) => {
  const isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (email == "") {
    return "Field is empty!";
  } else if (!isValid) {
    return "Email is not valid";
  }
  return null;
};

export const validatePassword = (password) => {
  const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
    password
  );
  if (password == "") {
    return "Field is empty!";
  } else if (!isValid) {
    return "Password is not valid";
  }
  return null;
};
