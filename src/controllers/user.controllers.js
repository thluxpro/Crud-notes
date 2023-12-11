//const { use } = require("passport");

const userController = {};
const passport = require ('passport');
const Usuario = require('../models/Usuario');

userController.renderSingUpForm = (req, res) => {
    res.render('users/signup');
};
userController.signup = async (req, res) => {
    const {name, password, email} = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({email});
        if (usuarioExistente){
            req.flash('error_msg', 'El correo electronico ya esta usado');
            return res.redirect('/users/signup');
        }
        const newUser = new Usuario({name: name, password:password, email:email});
        await newUser.save()
        req.flash('success_msg',' registro existoso');
        res.redirect('/users/signin');
    } catch (error) {
        console.error(error);
        req.flash('error_msg',' error intente de nuevo');
        res.redirect('/users/signup');
    }
  
    
    res.redirect('/users/signup');
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