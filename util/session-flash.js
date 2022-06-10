function getSessionErrorData(req) {
    const sessionInputData = req.session.inputData;
    
    req.session.inputData = null;
    return sessionInputData;
}


function flashErrorsToSession(req, data, action) {
    req.session.inputData = data;
    req.session.save(action);
}

module.exports = {
    getSessionErrorData: getSessionErrorData,
    flashErrorsToSession: flashErrorsToSession
}