const {Router} = require('express');
const router = Router();

const {renderNotForm, CreateNewNote, RenderNote, RenderEditF, UpdateNote, DeleteNote} = require('../controllers/notes.controller')


const {isAuthenticated}= require('../helpers/auth')

//Nota nueva
router.get('/notes/add',isAuthenticated, renderNotForm);
router.post('/notes/new_notes',isAuthenticated, CreateNewNote);

//Obtener todas las notas
router.get('/notes',isAuthenticated, RenderNote);

//editar notas
router.get('/notes/edit/:id',isAuthenticated, RenderEditF);

router.put('/notes/edit/:id',isAuthenticated, UpdateNote);

//Eliminar nota
router.delete('/notes/delete/:id',isAuthenticated, DeleteNote);


module.exports = router;