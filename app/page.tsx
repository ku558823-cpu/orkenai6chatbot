"use client";

import {FormEvent, useState} from "react";

type Message={role:"user"|"assistant";content:string};

export default function Home(){
  const [messages,setMessages]=useState<Message[]>([
    {role:"assistant",content:"Hi! I'm Orken AI. How can I help you today?"}
  ]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);

  async function sendMessage(e?:FormEvent){
    e?.preventDefault();
    const text=input.trim();
    if(!text || loading) return;
    setInput("");
    const next=[...messages,{role:"user" as const,content:text}];
    setMessages(next);
    setLoading(true);
    try{
      const res=await fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:text})
      });
      const data=await res.json();
      setMessages([...next,{role:"assistant",content:data.reply || "Sorry, I could not generate a reply."}]);
    }catch{
      setMessages([...next,{role:"assistant",content:"Something went wrong. Please try again."}]);
    }finally{setLoading(false);}
  }

  return <main className="shell">
    <section className="chat">
      <header className="header">
        <div className="brand"><div className="logo">O</div><div><h1>Orken AI</h1><p>AI Assistant</p></div></div>
        <span className="status"><i/> Online</span>
      </header>

      <div className="messages">
        {messages.map((m,i)=><div key={i} className={"row "+m.role}>
          <div className="avatar">{m.role==="assistant"?"O":"You"}</div>
          <div className="bubble">{m.content}</div>
        </div>)}
        {loading && <div className="row assistant"><div className="avatar">O</div><div className="bubble typing"><span/><span/><span/></div></div>}
      </div>

      <div className="suggestions">
        {["What can you do?","Help me with AI automation","Tell me about Orken AI"].map(x=>
          <button key={x} onClick={()=>{setInput(x)}}>{x}</button>
        )}
      </div>

      <form className="composer" onSubmit={sendMessage}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Message Orken AI..." aria-label="Message"/>
        <button className="send" disabled={loading || !input.trim()} aria-label="Send">➤</button>
      </form>
      <p className="note">Orken AI can make mistakes. Check important information.</p>
    </section>
  </main>;
}
