const noteCtrl = {};

const Note = require('../models/Note');

noteCtrl.renderNotForm = (req, res) => {
    //console.log(req.user)
    res.render('./notes/new_notes');
};

noteCtrl.CreateNewNote= async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({titulo:title, descripcion:description});
    newNote.user = req.user.id;
    await newNote.save()
    req.flash('success_msg', 'Nota agregada correctamente')
    res.redirect('/notes');
}
noteCtrl.RenderNote = async(req, res) =>{
   const notes = await Note.find({user: req.user.id}).sort({createdAt:'desc'}).lean();
   res.render('notes/all_notes', { notes });
}
noteCtrl.RenderEditF = async(req, res) =>{
    const note = await Note.findById(req.params.id).lean();
    //console.log(note);
    if (note.user != req.user.id){
        req.flash('error_msg', 'Queriendo editar la nota de otros pto?')
        return res.redirect('/notes');
    }
    res.render('notes/edit_notes', {note: note});
}
noteCtrl.UpdateNote = async (req, res) =>{
    const {title, description} = req.body
    await Note.findByIdAndUpdate(req.params.id, {titulo:title, descripcion: description})
    //console.log(req.body)
    
    req.flash('success_msg', 'Nota editada correctamente');
    if (note.user != req.user.id){
        req.flash('error_msg', 'Queriendo editar la nota de otros pto?')
        return res.redirect('/notes');
    }
    res.redirect('/notes');
}
noteCtrl.DeleteNote = async(req, res) =>{
    await Note.findByIdAndDelete(req.params.id);
    // console.log(req.params.id); ver el id

    req.flash('success_msg', 'Nota eliminada');
    res.redirect('/notes');
}

module.exports = noteCtrl

