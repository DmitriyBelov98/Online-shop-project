function createUserSession(req, user, action) {
  req.session.uid = user._id.toString(); // получить id изера с бд
  req.session.isAdmin = user.isAdmin;
// принудительное сохранение только тогда когда данные сохранятся в бд будет произведено дальнейшее действие
  req.session.save(action); 
}
function destroyUserAuthSession(req) {
    req.session.uid = null; // обнуляет id пользователя
    
}
module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession
};
