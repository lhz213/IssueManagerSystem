var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

/* GET users listing. */
router.get('/list', function (req, res, next) {
    console.log("List All Users");
    req.db.collection('users').find({'role': {$in: ['employee', 'manager']}}, {'password': 0}, function (err, result) {
        res.send(JSON.stringify(result));
    });
});

router.get('/', function (req, res, next) {
    console.log('Username validation');
    var username = req.query.username;
    req.db.collection('users').find({'username': username}, {'username': 1}, function (err, result) {
        console.log(result);
        if (result.length > 0) {
            res.send('Username duplicated!');
        } else {
            res.send('Username allowed!');
        }
    });
});

router.post('/', function (req, res, next) {
    var action = req.body.action;
    var info = req.body.info;
    switch (action) {
        case 'userSignIn':
            userSignIn(req, res, info);
            break;
        case 'userSignUp':
            userSignUp(req, res, info);
            break;
    }
});

function userSignIn(req, res, info) {
    console.log('User Sign In');
    req.db.collection('users').findOne({
        'username': info.username,
        'password': info.password
    }, {password: 0}, function (err, user) {
        if (user) {
            console.log('-->' + user.role + ':' + user.username + ' Sign in successful!');
            res.send(JSON.stringify(user));
        } else {
            req.db.collection('users').findOne({'username': info.username}, {username: 1}, function (err, result) {
                if (result) {
                    console.log('-->' + user.username + 'Password incorrect!');
                    user.errorMessage = 'Password incorrect!';
                    res.send(JSON.stringify(user));
                } else {
                    console.log('-->' + user.username + 'User does not exist!');
                    user.errorMessage = 'User does not exist!';
                    res.send(JSON.stringify(user));
                }
            });
        }
    });

}

function userSignUp(req, res, info) {
    console.log('User Sign Up');
    var user = info;
    user.registrationDate = Date.now();
    console.log(user);
    req.db.collection('users').insert(user);
    res.status(200);
    res.send();
}

module.exports = router;
