"use client";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoginSignUp from "@components/LoginSignUp";
import { useSession } from "next-auth/react";

const SignUp = () => {
    
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
            const response = await fetch("/api/auth/sign-auth", {
                method: "GET",
                headers: {
                    email: formData.email,
                },
                redirect: "manual", 
            });
    
            const data = await response.json();
            if (response.ok) {
                if (data?.message === "REDIRECT") router.push("/signup/login") 
                else{ 
                    const res = await signIn("credentials", {
                        email: formData.email,
                        password: formData.password,
                        username: formData.username,
                        redirect: false
                    });
                    
                    if(!res.ok) {
                        console.log(`Incorrect password`);
                    }
                    
                 }
            }
        } catch (error) {
            console.log(`SignIn handling error: ${error}`);
        }
    };

    
  return (
    <LoginSignUp handleSubmit={handleSubmit} type={"Login"} formData={formData} handleChange={handleChange} />
  )
}

export default SignUp;