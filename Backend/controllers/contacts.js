const Contact = require('../models/contact');

exports.getContacts = (req, res, next) => {
  Contact.find({creator: req.userData.userId})
 .then((data)=>{
  res.status(200).json(data);
  })
 .catch((err)=>{
   console.log(err);
   res.status(500).json({
      message: 'Fetching contacts failed!',
      error: err
    });
  });
}

exports.getContact = (req, res, next) => {
  Contact.find({ _id:req.params.id, creator: req.userData.userId}).then(contact => {
    if (contact.length > 0) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({message: 'Contact not found!'});
    }
  })
  .catch(err => {
    if (err.name === 'CastError') {
      res.status(404).json({message: 'Contact not found!'});
    }
    res.status(500).json({
      message: 'Fetching contact failed!',
      error: err
    });
  });
}

exports.createContact = (req, res, next)=> {
  const contact = new Contact({...req.body, creator: req.userData.userId});
  contact.save().then(createdContact => {
    // Response should include id that was created by MongoDB
    res.status(201).json({
      message: 'Contact added successfully',
      contact: {
        ...createdContact,
        id: createdContact._id
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      message: 'Creating contact failed!',
      error: err
    });
  });
}

exports.updateContact = (req, res, next) => {
  const contact = new Contact({...req.body, creator: req.userData.userId});
  contact._id = req.params.id;
  Contact.updateOne({ _id: req.params.id, creator: req.userData.userId }, contact).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Update successful!' });
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Couldn't update contact!",
      error: err
    });
  });
}

exports.deleteContact = (req, res, next) => {
  // params gives access to all encoded parameters (id in this case)
  Contact.deleteOne({ _id: req.params.id }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Deletion successful!' });
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: 'Deleting contact failed!',
      error: err
    });
  });
}
