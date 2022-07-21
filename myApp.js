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

	done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	done(null /*, data*/);
};

const removeById = (personId, done) => {
	done(null /*, data*/);
};

const removeManyPeople = (done) => {
	const nameToRemove = 'Mary';

	done(null /*, data*/);
};

const queryChain = (done) => {
	const foodToSearch = 'burrito';

	done(null /*, data*/);
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
