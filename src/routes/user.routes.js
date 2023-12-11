const {Router} = require('express');
const router = Router();


const { renderSingUpForm, signup, renderSingInForm, signin, logout } = require('../controllers/user.controllers')


router.get('/users/signup', renderSingUpForm);
router.post('/users/signup', signup);

router.get('/users/signin', renderSingInForm);
router.post('/users/signin', signin);

router.get('/users/logout', logout);

module.exports = router;