const { Set } = require('../Schemas/setSchema');
const { Folder } = require('../Schemas/folderSchema');
const { Flashcard } = require('../Schemas/flashcardSchema');

/////////////Methods for folders/////////////

module.exports.addFolder = (req, res) => {
  const newFolder = new Folder({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
    sets: [],
  });

  newFolder.save((err, createdFolder) => {
    if (err) {
      return console.log(err);
    } else {
      return res
        .set({ 'Content-Type': 'application/json' })
        .status(200)
        .send({ createdFolder });
    }
  });
};

module.exports.editFolder = (req, res) => {
  if (req.user.id !== req.body.user) {
    return res.status(401).send('Unauthorized!');
  }
  const { _id, title, description, sets } = req.body;

  Folder.findByIdAndUpdate(_id, { title, description, sets }, { new: true })
    .populate('sets')
    .exec((err, folder) => {
      if (err) return res.status(404).send('Folder did not edit!');
      return res.status(200).send(folder);
    });
};

module.exports.removeFolder = (req, res) => {
  Folder.deleteOne(
    { _id: req.body.idFolder },
    { single: true },
    (err, folder) => {
      if (req.user.id !== folder.user.toString())
        return res.status(401).send('Unauthorized!');
      if (err) return res.send(404).send('Folder cannot be remove!');
      return res.send(200).send(folder);
    }
  );
};

module.exports.getFolder = (req, res) => {
  Folder.findById(req.body.idFolder, (err, folder) => {
    if (err) return res.status(404).send('Connot get folder!');
    res.set({ 'Content-Type': 'application/json' });
    res.status(200).send(folder);
  });
};

module.exports.getUserFolders = (req, res) => {
  Folder.find({ user: req.user.id })
    .populate('sets')
    .exec((err, folders) => {
      if (err) {
        return res.status(404).send('Cannot get folders!');
      }
      return res.status(200).send(folders);
    });
};

/////////////Methods for Sets/////////////

module.exports.addSet = async (req, res) => {
  const newSet = new Set({
    name: req.body.name,
    description: req.body.description || '',
    flashcards: req.body.flashcards || [],
    folder: req.body.folder || '',
    user: req.user.id,
  });

  await newSet.save((err, createdSet) => {
    if (err) {
      console.log(err);
      return res.status(404).send('Set did not create.');
    }

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .send(createdSet);
  });
};

module.exports.editSet = (req, res) => {
  if (req.user.id !== req.body.user)
    return res.status(401).send('Unauthorized!');
  const { name, description, flashcards } = req.body;
  Set.findByIdAndUpdate(
    req.body._id,
    { name, description, flashcards },
    { new: true },
    (err, set) => {
      if (err) {
        return res.status(404).send('Set did not edit!');
      }

      res.set({ 'Content-Type': 'application/json' });
      res.status(200).send(set);
    }
  )
    .clone()
    .catch(err => console.log('Cannot edit set'));
};

module.exports.removeSet = (req, res) => {
  if (req.user.id !== req.body.user) {
    return res.status(401).send('Unauthorized!');
  }

  Set.deleteOne({ _id: req.body._id }, { single: true }, (err, set) => {
    if (err) {
      return res.send(404).send('Set cannot be remove!');
    }
    res.set({ 'Content-Type': 'application/json' });
    res.status(200).send({ _id: req.body._id });
  });
};

module.exports.getSet = (req, res) => {
  Set.findById(req.params.id)
    .populate(['flashcards', { path: 'user', select: 'name' }])
    .exec((err, set) => {
      if (err) return res.status(404).send('Cannot get set!');

      res.set({ 'Content-Type': 'application/json' });
      res.status(200).send(set);
    });
};
module.exports.getUserSets = (req, res) => {
  Set.find({ user: req.user.id })
    .populate(['flashcards', { path: 'user', select: 'name' }])
    .exec((err, sets) => {
      if (err) {
        return res.status(404).send('Cannot get sets!');
      }
      return res.status(200).send(sets);
    });
};

/////////////Methods for Flashcards/////////////

module.exports.addFlashcard = async (req, res) => {
  const newFlashcard = new Flashcard({
    term: req.body.term,
    definition: req.body.definition,
    resemblance: req.body.resemblance || '',
    image: req.body.image || '',
    user: req.user.id,
    star: req.body.star || false,
  });

  await newFlashcard.save((err, createdFlashcard) => {
    if (err) {
      res.status(404).send('Flashcard did not create!');
    } else {
      Folder.findByIdAndUpdate(
        req.body.setId,
        { $push: { flashcards: createdFlashcard._id } },
        { new: true, useFindAndModify: false }
      );

      res.set({ 'Content-Type': 'application/json' });
      res.status(200).send(createdFlashcard);
    }
  });
};

module.exports.editFlashcard = async (req, res) => {
  if (req.user.id !== req.body.user) {
    return res.status(401).send('Unauthorized!');
  }

  await Flashcard.findByIdAndUpdate(
    req.body._id,
    {
      term: req.body.term,
      definition: req.body.definition,
      resemblance: req.body.resemblance || '',
      image: req.body.image || '',
      star: req.body.star || false,
    },
    { new: true },
    (err, flashcard) => {
      if (err) return res.status(404).send('Flashcard did not edit');
      res.set({ 'Content-Type': 'application/json' });
      res.status(200).send(flashcard);
    }
  )
    .clone()
    .catch(err => console.log(err));
};

module.exports.removeFlashcard = (req, res) => {
  if (req.user.id !== req.body.user)
    return res.status(401).send('Unauthorized!');

  Flashcard.deleteOne(
    { _id: req.body.id },
    { single: true },
    (err, flashcard) => {
      if (err) {
        return res.status(404).send('Flashcard did not delete');
      }
      res.set({ 'Content-Type': 'application/json' });
      res.status(200).send(flashcard);
    }
  )
    .clone()
    .catch(err => console.log(err));
};

module.exports.getFlashcard = async (req, res) => {
  await Flashcard.findById(req.body.idFlashcard, (err, flashcard) => {
    if (err) res.status(404).send('Cannot get flashcard!');
    else res.status(200).send(flashcard);
  })
    .clone()
    .catch(err => console.log(err));
};
