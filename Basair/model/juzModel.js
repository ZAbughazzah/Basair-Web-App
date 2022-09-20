import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const juzSchema = new Schema({
    index: {type: Number, required : true, unique: true},
    sura: {type: Number, required : true},
    aya: {type: Number, required : true},
    name: {arabic: String, english: String}
});

export default mongoose.model('Juz', juzSchema);