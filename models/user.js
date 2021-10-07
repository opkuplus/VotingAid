var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, Required: 'Käyttäjällä oltava email!' },
  password: { type: String, Required: 'Käyttäjällä oltava Salasana!' },
  status: { type: String, Required: 'Käyttäjällä oltava status' },
  school: { type: String, Required: 'Käyttäjällä oltava koulu' }
},
  { versionKey: false },
  { collection: 'users' }
);

module.exports = mongoose.model('user', userSchema);