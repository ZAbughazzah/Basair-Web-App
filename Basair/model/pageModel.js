import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pageSchema = new Schema({
    index: {type: Number, required : true, unique: true},
    startingSura: {type: Number, required : true},
    startingAya: {type: Number, required : true},
    endingSura:{type: Number, required : true},
    endingAya:{type: Number, required : true}
});

export default mongoose.model('Page', pageSchema);