'use server'

import PostModel from "../models/postmodel"
import connectDB from "../config/database"


export default async function getPosts(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const posts = await PostModel.find();
      res.status(200).json(posts);
      return posts;
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
