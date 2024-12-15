"use client";

import Link from "next/link";
import Image from "next/image";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";
import { useState, useEffect } from "react";

const Navbar = () => {
  
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null); 
  const [toggleDropDown, setToggleDropDown] = useState(false);
  
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    
    fetchProviders();
  },[])
    

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg" alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      
      <div className="lg:hidden md:flex hidden">
      {session?.user ? 
        
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post 
          </Link>
          
          <button type="button" onClick={signOut} className="outline_btn">
            Sign Out
          </button>
          
          <Link href="/profile">
            <Image
              src={session?.user.image || null}
              width={37}
              height={37}
              className="rounded-full"
              alt="Profile image"
            />
          </Link>
        </div> 
        : 
        <>
          {/* Dynamically load the auth providers */}
    
          {providers && 
            Object.values(providers).map((provider) => {
              return (
                <button 
                  type="button" 
                  key={provider?.name} 
                  onClick={() => provider.name === "Credentials" ? 
                  signIn() : 
                  signIn(provider.id)
                  } 
                  className="black_btn mx-2"
                >
                  {provider.name === "Credentials" ? "Sign Up" : `Sign In with ${provider?.name}`}
                </button>
              );
            })
          }
        </> 
      }
      </div>
      
      {/* Mobile navbar */}
      
      <div className="md:hidden flex relative">
        {session?.user ? 
          <Image
          src={session?.user.image || null}
          width={37}
          height={37}
          className="rounded-full"
          alt="Profile image"
          // To make a dropdown function
          onClick={() => {setToggleDropDown((prev) => !prev)}} 
        /> :
        <>
          {providers && 
            Object.values(providers).map((provider) => {
              return (
                <button 
                  type="button" 
                  key={provider?.name} 
                  onClick={() => provider.name === "Credentials" ? signIn() : signIn(provider.id)} 
                  className="black_btn mx-2"
                >
                  {provider.name === "Credentials" ? "Sign Up" : `Sign In with ${provider?.name}`}
                </button>
              );
            })
          }
        </>
        }
        {toggleDropDown && 
          <div className="dropdown">
          
            <Link 
            href="/profile"
            className="dropdown_link"
            onClick={() => {setToggleDropDown(false)}}
            >
              Profile
            </Link>
            
            <Link 
            href="/create-prompt"
            className="dropdown_link"
            onClick={() => {setToggleDropDown(false)}}
            >
              Create Post 
            </Link>
            
            <button type="button" onClick={() => {
              setToggleDropDown(false);
              signOut();
            }} className="mt-5 w-full black_btn ">
              Sign out
            </button>
            
          </div>
        }
      </div>
    </nav>
  )
}

export default Navbar