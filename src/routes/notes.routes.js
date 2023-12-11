const {Router} = require('express');
const router = Router();

const {renderNotForm, CreateNewNote, RenderNote, RenderEditF, UpdateNote, DeleteNote} = require('../controllers/notes.controller')

//Nota nueva
router.get('/notes/add', renderNotForm);
router.post('/notes/new_notes', CreateNewNote);

//Obtener todas las notas
router.get('/notes', RenderNote);

//editar notas
router.get('/notes/edit/:id', RenderEditF);

router.put('/notes/edit/:id', UpdateNote);

//Eliminar nota
router.delete('/notes/delete/:id', DeleteNote);


module.exports = router;