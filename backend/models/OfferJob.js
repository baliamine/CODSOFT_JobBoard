const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OfferJobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  requirements: { type: String, required: true },
  company: { type: String, required: true },
  publicationDate: { type: String, required: true },
  idEmployer: { type: Schema.Types.ObjectId, ref: 'Employer', required: true } ,
  candidatures: [{ type: Schema.Types.ObjectId, ref: 'Candidature' }] 

});

module.exports = mongoose.model("OfferJob", OfferJobSchema);
