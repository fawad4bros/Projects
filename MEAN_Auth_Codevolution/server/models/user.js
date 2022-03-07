const mongoose = require('mongoose')
const schema = mongoose.Schema
const userSchema = new schema({
    email: String,
    password: String
})
module.exports = mongoose.model('user', userSchema, 'user')
// (model_name, schema_name, collection_name_in_database)