function createUserSession(req, user, action) {
  req.session.uid = user._id.toString(); // получить id изера с бд
// принудительное сохранение только тогда когда данные сохранятся в бд будет произведено дальнейшее действие
  req.session.save(action); 
}

module.exports = {
  createUserSession: createUserSession,
};
