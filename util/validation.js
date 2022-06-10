function isEmpty(value) {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password) {
    return email &&
        email.includes("@") &&
        password &&
        password.trim().length >= 6 
      
}

function userDetailIsValid( email, password, name, street, postal, city) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirm(email, confirmEmail) {
    return email === confirmEmail;
}

module.exports = {
  userDetailIsValid: userDetailIsValid,
  emailIsConfirm: emailIsConfirm
};
