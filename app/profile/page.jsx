"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const MyProfile = () => {
    
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const route = useRouter();
    const {data: session} = useSession();
    const [post, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
          try {
              if(userId === session?.user.id) {
                const posts = await fetch(`/api/users/${session?.user.id}/posts`);
                if (!posts.ok) {
                    throw new Error(`Error: ${posts.status}`);
                }
                const post_data = await posts.json();
                setPosts(post_data);
              }
              else {
                const posts = await fetch(`/api/users/${userId}/posts`);
                if (!posts.ok) {
                    throw new Error(`Error: ${posts.status}`);
                }
                const post_data = await posts.json();                
                setPosts(post_data);
              }
          } catch (error) {
              console.error("Failed to fetch posts:", error);
          }
        };
        
        fetchPosts();
      },[]);    
    
    const handleEdit = async (data) => {
        route.push(`/update-prompt?id=${data._id}`);
        return
    }
    
    const handleDelete = async (data) => {
        
        const userConfirmed = confirm("Are you sure you want to delete this post?");
        if(!userConfirmed) {
            return
        }
        
        try {
            const response = await fetch(`/api/prompt/${data._id}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                alert("Post deleted successfully");
                const filteredPost = post.filter((val, ind) => {
                    return val._id !== data._id
                });
                setPosts(filteredPost);
            } else {
                alert("Failed to delete post");
                return
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
        
        return
    }

    return (
        <Profile 
            name={userId === session?.user.id 
                ? "My" 
                : post?.creator
              }
            desc={"Welcome to your personalized profile page"}
            data={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile