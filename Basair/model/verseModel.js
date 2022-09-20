import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const verseSchema = new Schema({
    id: {type: Number, required : true, unique: true},
    name: {type: String, required : true},
    transliteration: {type: String, required : true},
    type: {type: String, required : true},
    total_verses: {type: Number, required : true},
    verses: [{id: Number, text: String}],
});

export default mongoose.model('Verse', verseSchema);