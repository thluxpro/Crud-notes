const{ Schema, model} = require ('mongoose');
const bcrypt = require ('bcryptjs');


const UserSC = new Schema({
    name:{
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true
    }
},{
    timestamps:true
});

UserSC.methods.encriptacion = async (password) => {
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

UserSC.methods.comparacionPassw = async function (password) {
    return await bcrypt.compare(password, this.password );
};

module.exports = model("user", UserSC)