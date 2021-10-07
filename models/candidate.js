
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  name: { type: String, Required: 'Kandidaatilla on oltava nimi!' },
  surname: { type: String, Required: 'Kandidaatilla on oltava sukunimi!' },
  email: { type: String, Required: 'Kandidaatilla on oltava email!' },
  school: { type: String, Required: 'Kandidaatilla on oltava osa koulua!' },
  studentAssociation: { type: String, Required: 'Kandidaatilla on oltava oppilaskunta!' },
  campus: { type: String, Required: 'Kandidaatilla on oltava osa jotain Kampusta!' },
  electoralDistrict: { type: String },
  electoralAlliance: { type: String },
  description: { type: String },
  picture: { type: String },
  image: { type: String },
  filledForm: {},
},
  { versionKey: false },
  { collection: 'candidate' },
  { minimize: false }
);

module.exports = mongoose.model('candidate', candidateSchema);