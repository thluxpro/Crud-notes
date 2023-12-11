const {Schema, model} = require ('mongoose')

const Shemaa = new Schema({
    titulo:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    }

}, {
    timestamps:true
})

module.exports = model('Note', Shemaa);
