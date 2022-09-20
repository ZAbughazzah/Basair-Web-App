import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const surahSchema = new Schema({
    id: {type: Number, required : true, unique: true},
    name: {type: String, required : true},
    englishName: {type: String, required : true},
    ayaCount: {type: Number, required : true},
    type:{type: String, required : true},
    juz:{type: Number, required : true}
});

export default mongoose.model('Surah', surahSchema);