require('dotenv').config();
const mongoose = require('mongoose');

//let PersonModel = require('./models/person');

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
	let johnDoe = new Person({
		name: 'John',
		age: 100,
		favoriteFoods: ['Artichokes', 'Banana', 'Cucumber'],
	});

	johnDoe.save((err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

let personA = new Person({
	name: 'Ana',
	age: 100,
	favoriteFoods: ['A', 'B', 'C'],
});
let personB = new Person({
	name: 'Belle',
	age: 100,
	favoriteFoods: ['B', 'C', 'A'],
});
let personC = new Person({
	name: 'Chloe',
	age: 100,
	favoriteFoods: ['C', 'A', 'B'],
});
let arrayOfPeople = [personA, personB, personC];

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findPersonById = (personId, done) => {
	Person.findById({ _id: personId }, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = 'hamburger';

	Person.findById({ _id: personId }, (err, person) => {
		if (err) return console.error(err);

		person.favoriteFoods.push(foodToAdd);

		person.save((err, updatedPerson) => {
			if (err) return console.error(err);
			done(null, updatedPerson);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		(err, updatedPerson) => {
			if (err) return console.error(err);
			done(null, updatedPerson);
		}
	);
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, removedPerson) => {
		if (err) return console.error(err);
		done(null, removedPerson);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = 'Mary';

	Person.remove({ name: nameToRemove }, (err, outcome) => {
		if (err) return console.error(err);
		done(null, outcome);
	});
};

const queryChain = (done) => {
	const foodToSearch = 'burrito';

	Person.find({ favoriteFoods: foodToSearch })
		.sort({ name: 1 })
		.limit(2)
		.select({ age: 0 })
		.exec((err, data) => {
			if (err) return console.error(err);
			done(null, data);
		});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
