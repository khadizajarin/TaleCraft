// databaseConnection/models/postModel.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.models.Post || mongoose.model('Post', postSchema);

export default PostModel;
