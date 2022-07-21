const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crmSources = new Schema({
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
    title: String,
    value: String,
    _id: String,
    canDragDrop: Boolean,
    code: String,
    originalData: Array,
    status: Number,
    canDelete: Boolean,
    state: Number,
    title: String,
    originalName: String,
    data: Array,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
    extraFields: Array,
    type: String,
    privateLevel: String,
    urgencyLevel: String,
    prevStage: String,

});
module.exports = mongoose.model('crmsources', crmSources);

