import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    const { userId } = await params; 

    try {
        await connectToDB();
        
        const allPrompts = await Prompt.find({ creator: userId}).populate("creator");
        
        return new Response(JSON.stringify(allPrompts), { status: 200 }); 
    } catch (error) {
        console.error("Error fetching prompts:", error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
};
