const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:String,
  user_id:{ type: String, default: '' },
  price:String,
  qty: Number,
  color: String,
  description: String,
  qrcode: String,
  images: [],
  created_at:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', schema);
