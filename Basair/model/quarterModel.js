import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const quarterSchema = new Schema({
    index: {type: Number, required : true, unique: true},
    sura: {type: Number, required : true},
    aya: {type: Number, required : true},
});

export default mongoose.model('Quarter', quarterSchema);

