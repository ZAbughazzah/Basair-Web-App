import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sectionsSchema = new Schema({
    id: {type: Number, required : true},
    text: {type: String, required : true},
    startAya: {type: Number, required : true},
    endAya:{type: Number, required : true}
});

const mahawerSchema = new Schema({
    id: {type: Number, required : true},
    counter: {type: String, required : true},
    title: {type: String, required : true},
    text: {type: String, required : true},
    range:  {type: String, required : true},
    sections: {type: [sectionsSchema], default: undefined }
});

const moqademaSchema = new Schema({
    title: {type: String, required : true},
    range: {type: String, required : true},
    sections: {type: [sectionsSchema], default: undefined }
});

const quarterMahawerSchema = new Schema({
    surahID: {type: Number, required : true, unique: true},
    moqadema: {type: moqademaSchema, default: undefined },
    mahawer: {type: [mahawerSchema], default: undefined }
});

export default mongoose.model('QuarterMahawer', quarterMahawerSchema);