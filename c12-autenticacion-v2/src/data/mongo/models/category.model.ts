import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'BD_Mongo: Name is required']
    },
    available : {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


categorySchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options){
    },
})



export const CategoryModel = mongoose.model('Category', categorySchema);