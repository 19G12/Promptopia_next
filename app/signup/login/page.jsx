"use client";
import LoginSignUp from "@components/LoginSignUp";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const Login = () => {
    
    const {data: session, status} = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        "username": "",
        "email": "",
        "password": ""
    });
    
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            router.push("/");
        }
    },[session, status])
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/sign-auth",{
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password
                })
            });
                        
            if(response.ok) {
                const res = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    username: formData.username
                });
                console.log(`Login page: ${res.ok}`);
                
                if(! res.ok) {
                    console.log(`Error in logging in please try again`);
                }
            } else {
                console.log(`Post request error`);
            }
        } catch (error) {
            console.log(`Error in logging in: ${error}`);
            
        }
    }
    
    
  return (
    <LoginSignUp handleSubmit={handleSubmit} type={"Sign Up"} formData={formData} handleChange={handleChange} />
  )
}

export default Login;