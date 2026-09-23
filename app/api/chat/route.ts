import {NextResponse} from "next/server";

export async function POST(req:Request){
  try{
    const {message}=await req.json();
    const text=String(message||"").trim();
    if(!text) return NextResponse.json({reply:"Please enter a message."},{status:400});

    // Temporary chatbot response. Groq will be connected here next.
    const lower=text.toLowerCase();
    let reply="Thanks for your message. I'm Orken AI, an AI assistant for automation and practical AI solutions. Groq API can be connected to this endpoint next.";

    if(lower.includes("what can you do"))
      reply="I can help with AI automation, chatbots, workflows, software ideas, and technical questions. We can connect Groq next for full AI-generated responses.";
    else if(lower.includes("orken"))
      reply="Orken AI builds and deploys production AI agents and automation systems for real business work.";
    else if(lower.includes("hello")||lower.includes("hi"))
      reply="Hello! 👋 I'm Orken AI. What would you like to build?";

    return NextResponse.json({reply});
  }catch{
    return NextResponse.json({reply:"Server error. Please try again."},{status:500});
  }
}
