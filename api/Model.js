const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableTest = new Schema({
    id: { type: String },
    name: { type: String },
    old: { type: Number },
    address: { type: String },
    department: { type: String },
    code: { type: String },
    status: { type: String },
    pride: { type: String },
    total: { type: String },
    color: { type: String },
    price: { type: String },
    nameProduct: { type: String },
    priceProduct: { type: String },
    countProduct: { type: String },
    createdAt: { type: Date },
    createdBy: { type: String },
});

module.exports = mongoose.model('tabletest', tableTest);



