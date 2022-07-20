const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outGoingDocuments = new Schema({
    name: String,
    toBook: String,
    toBookCode: String,
    toBookCode_en: String,
    secondBook: String,
    documentType: String,
    senderUnit: String,
    documentDate: Date,
    receiveDate: Date,
    toBookDate: Date,
    documentField: String,
    id: String,
    isImportFile: Boolean,

});


module.exports = mongoose.model('outgoingdocuments', outGoingDocuments)



