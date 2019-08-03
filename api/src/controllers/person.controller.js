const Person = require('../models/person.model');

exports.create = (req, res) => {
  const personData = req.body;
  const newPerson = new Person(personData);

  newPerson.save()
    .then((person) => {
      res.status(201).send({ message: 'Added with success!', person });
    })
    .catch((err) => {
      res.status(400).send({ message: (err.message || 'Failed to add person!') });
    });
};

exports.findAll = async (req, res) => {
  const persons = await Person.find();

  // Get the total amount of participation
  const totalParticipation = persons.reduce((total, person) => total + person.participation, 0);

  const personsWithPercentageParticipation = persons.map(({ _id, firstName, lastName, participation }) => {
    // Returns participation in percent 
    return {
      _id: _id,
      firstName: firstName,
      lastName: lastName,
      participation: Math.round(participation * 100 / totalParticipation),
    };
  });

  res.status(200).send(personsWithPercentageParticipation);
};