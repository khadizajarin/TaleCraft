"use client"

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import API from "../../../../utils/api";
import TiptapEditor from "../../components/TiptapEditor";
import { AuthContext } from "@/lib/AuthProvider";

const Content = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postText, setPostText] = useState("");
    const [images, setImages] = useState([]); // ✅ Store selected images
    const { user } = useContext(AuthContext); // ✅ Get user from context

    const [bgImage, setBgImage] = useState("");


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
    useEffect(() => {
        fetchPosts();
    }, []);

    return (

        <div>
            <div className="bg-secondary  bg-opacity-30 rounded-lg p-4 flex shadow-[1px_1px_5px_0_rgba(0,0,0,0.1)] mb-1">
                <TiptapEditor onChange={setPostText} />
                <div className="mt-2">
                  <input 
                    type="file" 
                    multiple 
                    id="fileUpload" 
                    onChange={handleImageUpload} 
                    className="hidden"
                  />
                </div>

                <button
                  className="
                    ml-2 px-6 py-2
                    bg-secondary text-white font-semibold
                    rounded-lg shadow-[1px_1px_5px_0_rgba(0,0,0,0.1)]
                    hover:bg-yellow-700
                    focus:outline-none focus:ring-4 focus:ring-yellow-300
                    transform hover:scale-105 transition
                  "
                  onClick={handlePostSubmit}
                >
                  Post
                </button>
              </div>

            
            <div className="bg-secondary bg-opacity-30 rounded-lg overflow-y-auto p-4">
                        {loading ? (
                          <p className="text-gray-600">Loading posts...</p>
                        ) : posts.length > 0 ? (
                          posts.map((post) => (
                            <div key={post._id} className=" p-4 rounded-lg shadow-[1px_1px_5px_0_rgba(0,0,0,0.1)]">
                              <h2
                                className="text-lg font-medium"
                                dangerouslySetInnerHTML={{ __html: post.postContent }}
                              ></h2>
                              <p className="text-sm text-gray-500">
                                {post.name} - {new Date(post.createdAt).toLocaleString()}
                              </p>
                              {post.images?.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {post.images.map((img, index) => (
                                    <Image
                                      width={300}
                                      height={200}
                                      key={index}
                                      src={img}
                                      alt="Uploaded"
                                      className="w-48 h-40 object-cover"
                                    />
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
         
    );
};

export default Content;