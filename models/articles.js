const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  stock: { type: Number },
  weight: { type: Number},
  img: { type: String }
});

module.exports = mongoose.model('articles', articleSchema);