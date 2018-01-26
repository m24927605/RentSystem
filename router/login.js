module.exports = (app, db) => {
    const SQLManager = require('../repository/Manager')(db);
    const login = require('../services/login')();
    let errorMessage = require('../services/helpers/error')();

    app.post('/login', async (req, res) => {
        try {
            let Account = req.body.Account;
            let Password = req.body.Password;
            let authResult = await login.authenticate(Account, Password);
            if (authResult && authResult.result) {
                authResult.token = login.setToken(Account, authResult.role);
                res.status(200).json(authResult);
            }
            else {
                res.status(500).json(authResult);
            }
        } catch (error) {
            if (error.message === 'Wrong Account') {
                res.status(500).json(errorMessage.logicSend("loginAccount", error));
            }
            else if (error.message === 'Wrong Password') {
                res.status(500).json(errorMessage.logicSend("loginPwd", error));
            }
            
            else {
                res.status(500).json(errorMessage.logicSend("login", error));
            }
        }

    })
}