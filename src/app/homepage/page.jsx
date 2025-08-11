"use client";
import React, { useEffect, useState, useContext } from "react";
import background from "@/assets/image.png";
import { Almarai } from 'next/font/google';
import { AuthContext } from "@/lib/AuthProvider";
import Navbar from "./Navbar";
import API from "../../../utils/api";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../(dashboard)/page";
import Content from "../(dashboard)/content/page";

const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800']
});



const Page = ( {children}) => {
  const [bgImage, setBgImage] = useState("");
  const [postText, setPostText] = useState("");
  const [images, setImages] = useState([]); // ✅ Store selected images
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext); // ✅ Get user from context

  

  useEffect(() => {
    setBgImage(`url(${background.src})`);
    fetchPosts(); // ✅ Fetch posts on mount
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/posts");
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handlePostSubmit = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (postText.trim() === "" && images.length === 0) {
      console.error("Post cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("name", user.displayName);
    formData.append("postContent", postText);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const { data: savedPost } = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(savedPost)

      setPosts([savedPost.post, ...posts]);
      setPostText(""); 
      setImages([]); // ✅ Clear images after posting
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

    const hasChildren = React.Children.count(children) > 0;


  return (
    <PrivateRoute>
      <div className={`${almarai.className} h-screen relative bg-no-repeat bg-cover bg-center`} 
        style={{ backgroundImage: bgImage }}
      >
        <div className="relative z-20 max-w-[84rem] mx-auto">
          <Navbar className="fixed top-0 left-0 w-full bg-opacity-80 z-50" />

          <div className="flex gap-1 mt-1"> {/* Two-column layout */}
            
            {/* Left Sidebar - Dashboard */}
            <div className="w-1/3 bg-secondary bg-opacity-30 rounded-lg shadow-[1px_1px_5px_0_rgba(0,0,0,0.1)] p-4 h-[calc(100vh-5rem)] overflow-y-auto">
              <Dashboard></Dashboard>            
            </div>

            {/* Right Content - Post editor + feed */}
            <div className="w-2/3 h-[calc(100vh-5rem)] overflow-y-auto">
                {hasChildren ? children : <Content />}
              </div>
            </div>
          </div>
        </div>

    </PrivateRoute>
  );
};

export default Page;

