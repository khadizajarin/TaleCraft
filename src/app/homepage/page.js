"use client";
import { useEffect, useState } from "react";
import background from "@/assets/image.png";
import { Almarai } from 'next/font/google';
import Navbar from "./Navbar";
import PrivateRoute from "../components/PrivateRoute";

const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800']
});

const Page = () => {
  const [bgImage, setBgImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBgImage(`url(${background.src})`);

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
        } else {
          console.error("Error fetching posts:", data.error);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
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
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className="bg-glass p-4 rounded-lg shadow-md mb-4">
                  <h2 className="text-2xl font-bold">{post.postText}</h2>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
