const noteCtrl = {};

const Note = require('../models/Note');

noteCtrl.renderNotForm = (req, res) => {
    res.render('./notes/new_notes');
};

noteCtrl.CreateNewNote= async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({titulo:title, descripcion:description});
    await newNote.save()
    req.flash('success_msg', 'Nota agregada correctamente')
    res.redirect('/notes');
}
noteCtrl.RenderNote = async(req, res) =>{
   const notes = await Note.find().lean();
   res.render('notes/all_notes', { notes });
}
noteCtrl.RenderEditF = async(req, res) =>{
    const note = await Note.findById(req.params.id).lean();
    //console.log(note);
    res.render('notes/edit_notes', {note: note});
}
noteCtrl.UpdateNote = async (req, res) =>{
    const {title, description} = req.body
    await Note.findByIdAndUpdate(req.params.id, {titulo:title, descripcion: description})
    //console.log(req.body)
    req.flash('success_msg', 'Nota editada correctamente');
    res.redirect('/notes');
}
noteCtrl.DeleteNote = async(req, res) =>{
    await Note.findByIdAndDelete(req.params.id);
    // console.log(req.params.id); ver el id

    req.flash('success_msg', 'Nota eliminada');
    res.redirect('/notes');
}

module.exports = noteCtrl

