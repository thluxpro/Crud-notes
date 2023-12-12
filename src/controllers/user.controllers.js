//const { use } = require("passport");

const userController = {};
const passport = require ('passport');
const Usuario = require('../models/Usuario');
//const { text } = require('express');

userController.renderSingUpForm = (req, res) => {
    res.render('users/signup');
};
userController.signup = async (req, res) => {
    //const {name, password, email} = req.body;

/*     try {
        const usuarioExistente = await Usuario.findOne({email});
        if (usuarioExistente){
            req.flash('error_msg', 'El correo electronico ya esta usado');
            return res.redirect('/users/signup');
        }
        const newUser = new Usuario({name: name, password:password, email:email});
        await newUser.save()
        req.flash('success_msg',' registro existoso');
        return res.redirect('/users/signin');
    } catch (error) {
        console.error(error);
        req.flash('error_msg',`error: ${error.message}`);
        return res.redirect('/users/signup');
    } */
    const {name, password, email, confirm_password} = req.body;
    const errors = [];
   // const newUser = new Usuario({name:name, password:password, email:email});
    if (password != confirm_password){
        errors.push({text:' la contraseña no coincide'})
    }
    if (password.length < 4){
        errors.push({text: ' la contraseña debera de tener mas de 4 caracteres'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
        })
    } else {
        const emailUser = await Usuario.findOne({email:email})
        if (emailUser){
            req.flash('error_msg', 'Este email ya esta en uso');
            res.redirect('/users/signup')
        } else {
            const newUsers = new Usuario({ name, password, email});
            newUsers.password = await newUsers.encriptacion(password);
            await newUsers.save();
            req.flash('success_msg','Usuario creado exitosamente');
            res.redirect('/users/signin');
        }
    }

/*     await newUser.save()
    req.flash('success_msg', 'User agregada correctamente') 
    res.redirect('/users/signup');
    console.log(req.body);
    res.send('recibido') */
};

userController.renderSingInForm = (req, res) => {
    res.render('users/signin');
};

userController.signin = passport.authenticate('local', {
    failureRedirect : '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});
/* userController.logout = (req, res) => {
    req.logout();
    req.flash('success_msg','se ha cerrado tu sesion');
    res.redirect('/users/signin')
};
 */
userController.logout = (req, res) => {
    // Utiliza req.logout con una función de devolución de llamada
    req.logout((err) => {
        if (err) {
            // Manejar el error, si ocurre
            console.error(err);
            req.flash('error_msg', 'Error al cerrar la sesión');
            return res.redirect('/notes'); // o redirige a donde sea necesario
        }

        // Si no hay error, se ejecuta la lógica de éxito
        req.flash('success_msg', 'Se ha cerrado tu sesión con éxito');
        res.redirect('/users/signin');
    });
};

module.exports = userController;