'use server'

import PostModel from "../models/postmodel"
import connectDB from "../config/database"

export async function getPosts(){
    try {
        await connectDB();
        const data = await PostModel.find();
        console.log(data)

        return data; 
    } catch (error) {
        return {errMsg : error.message}
    }
}
