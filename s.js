let mongoose = require('mongoose');
const server = '127.0.0.1:27017';
require('dotenv').config();
const database = process.env.MONGO_URI;

//connect mongoose
mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    })


//create schema 
var personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: [String]
});



//create Model
var personModel = mongoose.model('persons', personSchema);


//Create and Save a Record of a Model
var person = new personModel({ name: "sarah", age: 24, favoriteFoods: ["meklabnina", "hajabnina"] })

person.save(function (err, data) {
    if (err) { throw err; }
    console.log('element is added');
});

//Create Many Records with model.create()
var array1 = [
    { name: "mohamed", age: 13, favoriteFoods: ["pizza", "kosksi"] },
    { name: "medamine", age: 47, favoriteFoods: ["borghol", "mosli"] },
    { name: "nihel", age: 20, favoriteFoods: ["burrito"] },
    { name: "ahmed", age: 39, favoriteFoods: ["felfel"] }
];

console.log(array1)

personModel.create(array1, (err, person) => {
    if (err) { throw err; }
    mongoose.connection.close();
    console.log('table is added')
});

//Model.find() to Search Database
personModel.find({})
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    });

//model.findOne()
personModel.findOne({})
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

//model.findById() 
personModel.findById({
    _id: "5f3c40820412cb367093d765"
})
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

//simple update
personModel.update({ _id: "5f3c40820412cb367093d765" }, { $push: { favoriteFoods: "fricassé" } }, { multi: true }, function (err, data) {
    if (err) { throw err; }
    console.log("fricassé is added");
});

//update by findOneAndUpdate()
personModel.findOneAndUpdate({ name: "mohamed" }, { age: 62 }, { new: true })
    .then(doc => {
        console.log("l'age de  Mohamed est modifié" + doc)
    })
    .catch(err => {
        console.error(err)
    })

//findByIdAndRemove
personModel.findByIdAndRemove({
    _id: "5f3c3eb79a6fb93224b7012f"

})
    .then(response => {
        console.log("element is removed")
    })
    .catch(err => {
        console.error(err)
    })
//remove()
personModel.remove({ age: { $gt: 25 } }, function (err, data) {
    if (err) { throw err; }
    console.log('persons who have above 25 years old are removed');
});

//Query Helpers
personModel.find({ favoriteFoods: "burrito" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: true })
    .exec()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

