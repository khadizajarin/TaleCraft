"use client";
import { useEffect, useState, useContext } from "react";
import API from "../../../utils/api";
import background from "@/assets/image.png";
import { Almarai } from 'next/font/google';
import Navbar from "./Navbar";
import PrivateRoute from "../components/PrivateRoute";
import { AuthContext } from "@/lib/AuthProvider";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapEditor from "../components/TiptapEditor";

const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800']
});



const Page = () => {
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

  return (
    <PrivateRoute>
      <div className={`${almarai.className} h-screen relative bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: bgImage }}>
        <div className="max-w-5xl mx-auto">
          <Navbar className="fixed top-0 left-0 w-full bg-opacity-80 z-50" />
        </div> 

        <div className="mt-4 max-w-5xl mx-auto">
          {/* ✅ Post Input Section */}
          <div className="bg-transparent p-4 flex shadow-md mb-6">
             <TiptapEditor onChange={setPostText} />
           <div className="mt-2">
              {/* Hidden File Input */}
              <input 
                type="file" 
                multiple 
                id="fileUpload" 
                onChange={handleImageUpload} 
                className="hidden"
              />
              
              {/* Clickable Icon as File Upload */}
              <label htmlFor="fileUpload" className="cursor-pointer p-2">
                📸 {/* You can replace this with an actual icon component */}
              </label>
            </div>

            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600"
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>

          <div className=" max-w-5xl mx-auto overflow-y-auto h-[calc(100vh-25rem)]">
            {/* ✅ Posts Display Section */}
            {loading ? (
              <p className="text-gray-600">Loading posts...</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="bg-glass p-4 rounded-lg shadow-md mb-4">
                  <h2 className="text-lg font-bold">{post.postContent}</h2>
                  <p className="text-sm text-gray-500">
                    {post.name} - {new Date(post.createdAt).toLocaleString()}
                  </p>
                  {post.images?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.images.map((img, index) => (
                        <Image width={300} height={200} key={index} src={img} alt="Uploaded" className="w-24 h-24 object-cover" />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
