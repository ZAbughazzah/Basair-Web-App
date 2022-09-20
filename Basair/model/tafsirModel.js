import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tafsirSchema = new Schema({
    ayat : [{index: String, text: String} ],
    index: {type: String, required : true},
    surah: {type: String, required : true}
});

export default mongoose.model('Tafsir', tafsirSchema);