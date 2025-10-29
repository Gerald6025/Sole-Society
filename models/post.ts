import mongoose from 'mongoose'


const { Schema } = mongoose

const postSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,

    },

    imageurl:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

 },{timestamps:true})

 export default mongoose.models.post || mongoose.model('post', postSchema)