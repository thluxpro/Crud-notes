const passport = require('passport');
const Usuario = require('../models/Usuario');
const localStra= require('passport-local').Strategy;
//require('../models/Usuario')

passport.use(new localStra({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //comprobar si existe el correo del usuario
   const user = await Usuario.findOne({email})
   if (!user) {
    return done(null, false, {message: 'No se encontro el usuario'})
   } else {
    // validar la contraseña
       const Ismatch = await user.comparacionPassw(password);
       if (Ismatch) {
            return done(null, user);

       }else {
            return done(null, false, {message: 'Contraseña incorrecta '});
       }

   }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
} );

// passport.deserializeUser((id, done)=>{
//     Usuario.findById(id, (err, user) => {
//         done(err, user);
//     });
// });

passport.deserializeUser((id, done) => {
    // Buscar al usuario por su ID en la base de datos
    Usuario.findById(id)
        .then(user => {
            // Llamar a done con el objeto de usuario recuperado
            done(null, user);
        })
        .catch(err => {
            // Llamar a done con el error, si ocurre
            done(err, null);
        });
});