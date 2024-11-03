"use client"
import { useEffect, useState } from "react";
import background from "@/assets/image.png";
import { Almarai } from 'next/font/google';
import Navbar from "./Navbar";
import PrivateRoute from "../components/PrivateRoute";

import { getPosts } from "../../../databaseConnection/_actions/postAction";

const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800']
});

const Page = () => {

    //db connect response
    const res = getPosts();
    console.log("Homepage response",res);
  


    const [bgImage, setBgImage] = useState("");
    const [posts, setPosts] = useState([]);

    

    useEffect(() => {
        setBgImage(`url(${background.src})`);
    
        const fetchPosts = async () => {
          try {
            const res = await getPosts();
            if (res.errMsg) {
              console.error("Error fetching posts:", res.errMsg);
            } else {
                console.log("dataaaaaaaa", res)
              setPosts(res); // Assuming res is the array of posts
            }
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
    
        fetchPosts();
      }, []);

    return (
        <PrivateRoute>
            <div className={`${almarai.className} h-screen relative bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: bgImage }}>
                <div className="max-w-5xl mx-auto">
                    <Navbar className="absolute" />
                </div>

                <div className="mt-20 p-4 max-w-5xl mx-auto">
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                    <div key={index} className="bg-glass p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-2xl font-bold">{post.postText}</h2>
                        {/* <p>{post.content}</p> */}
                    </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )
                }
            </div>
                
            </div>
        </PrivateRoute>
    );
};

export default Page;
