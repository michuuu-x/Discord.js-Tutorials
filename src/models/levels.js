const mongoose = require('mongoose');

module.exports = mongoose.model( 
'level', //naming your model 
new mongoose.Schema({ 
    guild: String, //main key
    choice: Boolean
}));