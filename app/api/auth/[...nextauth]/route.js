import NextAuth from "next-auth";
// import Google providers
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import UserAuth from "@models/userAuth";

const authOptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Your name"},
                password: {label: "Password", type: "password", placeholder: "Password"},
                email: {label: "Email", type: "email", placeholder: "Email Id"},
            },
            
            async authorize(credentials) {
                try {
                    //logic here
                    connectToDB();
                    
                    const user = await UserAuth.findOne({email: credentials?.email});
                    // an extremely basic structure 
                    if(user && user.password === credentials?.password) {
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            username: user.username,
                            image: user.image
                        }
                    }
                    else {
                        console.log("Bad authentication");
                        return false
                    }
                    
                } catch (error) {
                    console.log(`error in cred-auth: ${error}`);
                    return null;
                }
                
            }
            
        }),
    ],
    callbacks: {
        async session({session, token}) {
            //Update the session with user info to maintain it 
            try {
                if(token.provider === "credentials") {
                    session.user.id = token.sub;
                    session.user.email = token.email;
                    session.user.username = token.username;
                } else {
                    const sessionUser = await User.findOne({email: session.user.email});
                    if (sessionUser){
                        session.user.id = sessionUser._id;
                        console.log("welcome user");
                        
                    }   
                }
            } catch (error) {
                console.log(`Session callback error: ${error}`);
                return false
            }
            
            return session; 
        },
        async signIn({profile, account}) {
            if (account.provider === "google") {
                try {
                    connectToDB();
                    
                    const foundUsers = await User.find(
                    {email: profile.email}
                    )            
                    
                    if(!foundUsers.length){
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ","").toLowerCase(),
                            image: profile?.picture
                        })
                        
                    }
                    
                    return true;
                    
                } catch (error) {
                    console.log(error);
                    return false;
                    
                }
            }
            // allow all other sign ins
            return true;
        },
        jwt({user, token, account}) {
            if (user) {
                token.provider = account?.provider || "credentials";
                if (account?.provider === "credentials") {
                    token.sub = user.id; 
                    token.email = user.email;
                    token.username = user.username;
                }
            }
            
            return token;
        }
    },
    
    pages: {
        signIn: "/signup",    
    }
})

export { authOptions as GET, authOptions as POST}; 