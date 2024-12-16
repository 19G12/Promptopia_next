"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { useEffect, useState } from "react";

const updatePrompt = () => {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });
      
    useEffect(() => {
        if (id) {
            // Fetch the prompt details using the ID
            const fetchPromptDetails = async () => {
              try {
                const response = await fetch(`/api/prompt/${id}`);
                if (response.ok) {
                  const data = await response.json();
                  
                  setPost({ prompt: data.prompt, tag: data.tag });
                } else {
                  console.error("Failed to fetch prompt details");
                }
              } catch (error) {
                console.error("Error fetching prompt details:", error);
              }
            };
      
            fetchPromptDetails();
          }
        }, [id]);  
    
    const handleEdit = async (e) => {

        e.preventDefault();
        setSubmitting(true);
        
        try {
          const response = await fetch(`/api/prompt/${id}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
              })
            }
        )
        
        if(response.ok) {
          router.push('/');
        }
        } catch (error) {
          console.log("Error: ",error);
        } finally {
          setSubmitting(false);
        }
    }

  return (
    <Form 
      type = "Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleEdit}
    />
  )
}

export default updatePrompt;