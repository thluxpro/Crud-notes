const mongoose = require('mongoose');


const MONGODB_URL= process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {

})
    .then(db => console.log('Database conectado'))
    .catch(err => console.log(err));