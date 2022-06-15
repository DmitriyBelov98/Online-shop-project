
const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");
function getSignUp(req, res) {
  let sessionData = sessionFlash.getSessionErrorData(req);

  if(!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: ''
    }
  }
  res.render("customer/auth/signup", {inputData: sessionData});
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body.confirmEmail,
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
  if (
    !validation.userDetailIsValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirm(req.body.email, req.body["confirm-email"])
  ) {
    sessionFlash.flashErrorsToSession(
      req,
      {
        errorMessage: "Пожалуйста проверьте введённые данные",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      sessionFlash.flashErrorsToSession(
        req,
        {
          errorMessage: "Пользователь уже существует!",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionErrorData(req);

  if(!sessionData) {
    sessionData = {
      email: '',
      password: ''
     
    }
  }
  res.render("customer/auth/login", {inputData: sessionData});
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  const sessionErrorDate = {
    errorMessage:
      "Неверно введённые данные - пожалуйста проверьте ваш логин и пароль",
    email: user.email,
    password: user.password,
  };

  if (!existingUser) {
    sessionFlash.flashErrorsToSession(req, sessionErrorDate, function () {
      res.redirect("/login");
    });
    return;
  }
  const passwordIsCorrect = await user.comparePassword(existingUser.password);

  if (!passwordIsCorrect) {
    sessionFlash.flashErrorsToSession(req, sessionErrorDate, function () {
      res.redirect("/login");
    });
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req); // вызов logout метода по id = null пользователя
  res.redirect("/login");
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
