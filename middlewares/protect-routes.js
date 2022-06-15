function protectRoutes(req,res, next) {
    if (!res.locals.isAuth) {
        return res.redirect('/401'); // код ошибки аутентификации
    }
    // проверка на путь начинающийся с заданного и проверка на админа
    if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
        return res.redirect('/403'); // код ошибки авторизации
    }
    next();
}

module.exports = protectRoutes;