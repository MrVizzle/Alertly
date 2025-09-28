const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  description: { type: String, default: '' },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  isActive: { type: Boolean, default: true },
  responders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
}, { timestamps: true });

module.exports = mongoose.model('alerts', alertSchema);
