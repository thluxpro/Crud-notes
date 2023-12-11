const { route } = require("../routes/index.routes");

const indexContr= {};

indexContr.renderIndex = (req, res) => {
    res.render('index')
};

indexContr.renderAbout = (req, res) => {
    res.render('about')
};


module.exports = indexContr;