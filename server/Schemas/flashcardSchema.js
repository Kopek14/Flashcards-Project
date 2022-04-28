const mongoose = require('mongoose');

const { Schema } = mongoose;

const flashcardSchema = new Schema({
  term: String,
  definition: String,
  resemblance: String,
  image: String,
  star: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports.Flashcard = Flashcard;
