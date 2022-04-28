const mongoose = require('mongoose');

const { Schema } = mongoose;

const setSchema = new Schema({
  name: String,
  description: String,
  flashcards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Flashcard',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Set = mongoose.model('Set', setSchema);

module.exports.Set = Set;
