//const { use } = require("passport");

const userController = {};

const passport = require ('passport');
const Usuario = require('../models/Usuario');

userController.renderSingUpForm = (req, res) => {
    res.render('users/signup');
};
userController.signup = (req, res) => {
    res.send('sign up');
};

userController.renderSingInForm = (req, res) => {
    res.render('users/signin');
};

userController.signin = passport.authenticate('local', {
    failureRedirect : '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});
userController.logout = (req, res) => {
    res.send (' log out');
};

module.exports = userController;