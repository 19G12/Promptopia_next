import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET all prompts
export const GET = async (req, {params}) => {
    const {id} = await params;
    
    try {
        await connectToDB();
    
        const allPrompts = await Prompt.findById(id).populate("creator");
        if(!allPrompts) return new Response("No Prompts were found", {status: 404});
        return new Response(JSON.stringify(allPrompts), {status: 200});
    } catch (error) {
        return new Response(`Unexpected server occured ${error}`, {status: 500});
    }
}

// PATCH the post
export const PATCH = async (req, {params}) => {
    const {id} = await params;
    try {
        const {prompt, tag} = await req.json();
    
        const currentPrompt = await Prompt.findById(id);
        if(!currentPrompt) return new Response("No prompts found", {status: 404});
        
        currentPrompt.prompt = prompt;
        currentPrompt.tag = tag;
        
        await currentPrompt.save();
        
        return new Response(JSON.stringify(currentPrompt), {status: 200});
    } catch (error) {
        return new Response("Unexpected server error", {status: 500});
    }
}

//DELETE the post
export const DELETE = async (req, {params}) => {
    const {id} = await params;
    
    try {
        await connectToDB();
        
        const deleted = await Prompt.findByIdAndDelete(id);
        if(!deleted) return new Response("No posts were found", {status: 404});
        
        return new Response("Post deleted successfully", {status: 200});
    } catch (error) {
        return new Response("Failed to delete post", { status: 500 });
    }
}