import UserAuth from "@models/userAuth";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
    const email = req.headers.get("email");
    console.log(email);
    
    try {
        await connectToDB();
        
        const foundUser = await UserAuth.findOne({email: email});
        console.log(`sign-auth: ${foundUser}`);
        
        if(foundUser) {
            return new Response(JSON.stringify({"message":"OK"}), {status: 200});
        } else return new Response(JSON.stringify({"message":"REDIRECT"}), {status: 200});
    } catch (error) {
        return new Response(`Error: ${error}`, {status: 500});
    }
}

export const POST = async (req) => {
    const {email, username, password} = await req.json();
    
    try {
        await connectToDB();
        
        await UserAuth.create({
            email: email,
            username: username,
            password: password
        });
        
        return new Response(JSON.stringify({message: "Logged in"}),
            {
                status: 200
            }
        )
    } catch (error) {
        return new Response(JSON.stringify({message: "Error logging in"}),
            {
                status: 500
            }
        )
    }
}