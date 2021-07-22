const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {
    // Routes
    app.post('/account/login', async (req, res) => {

        const { username, password } = req.body;
        if (username == null || password == null) {
            res.send("Invalid credentials.");
            return;
        }

        var userAccount = await Account.findOne({ username: username});
        if (userAccount != null) {
            // Retrieve account.
            if (password == userAccount.password) {
                userAccount.lastAuthentication = Date.now();
                await userAccount.save();

                console.log("Retrieving account...");
                res.send(userAccount);
                return;
            }
        }
        
        res.send("Invalid credentials.");
        return;
    });

    app.post('/account/create', async (req, res) => {
        console.log(req.body.username);

        const { username, password } = req.body;
        if (username == null || password == null) {
            res.send("Invalid credentials.");
            return;
        }

        var userAccount = await Account.findOne({ username: username});
        if (userAccount == null) {
            // Create new account.
            console.log("Creating a new account...");

            var newAccount = new Account({
                username : username,
                password : password,

                lastAuthentication : Date.now()
            });
            await newAccount.save();

            res.send(newAccount);
            return;
        } else {
            res.send("Username is already in use.");

        }
        return;
    });
}