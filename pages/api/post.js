// pages/api/posts.js
import connectDB from '../../databaseConnection/config/database';
import PostModel from '../../databaseConnection/models/postmodel';
// import PostModel from '../../databaseConnection/models/postModel';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const posts = await PostModel.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
