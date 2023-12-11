require('dotenv').config();

const app = require ('./server');
require ('./database');

//console.log(process.env.Testing)

app.listen(app.get('port'), () =>{
    console.log('Te veeeeeo')
})

