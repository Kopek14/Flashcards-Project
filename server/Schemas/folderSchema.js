const mongoose = require('mongoose');

const { Schema } = mongoose;

const folderSchema = new Schema({
  title: String,
  description: String,
  sets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Set',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports.Folder = Folder;
