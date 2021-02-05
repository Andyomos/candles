import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        requied: true
    },
    
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);



export default Member;
