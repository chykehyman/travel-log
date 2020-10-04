const { Schema, model } = require('mongoose');

const requiredNumber = {
  type: Number,
  required: true,
};

const LogEntrySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitedDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const LogEntry = model('LogEntry', LogEntrySchema);

module.exports = {
  LogEntry,
};