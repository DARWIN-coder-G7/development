"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorBoundary({error,reset}:{error:Error,reset:()=> void}){
    
    const tryAgain = () =>{
        console.log("Getting called");
        //But directly calling reset wont work for server side components
        reset();
    }
// will work for Server side components
    const router = useRouter(); 
    const reload = ()=>{
        startTransition(()=>{
            router.refresh();
            reset();
        })
    }
    return <>
    <h1 className="text-red-600 p-2.5 bg-amber-200 m-2" > Error In Review ID {error.message}</h1>
    <button onClick={()=> reload()} className="bg-gradient-to-r from-cyan-400 to-blue-500 border-0 p-1.5 rounded-lg m-2 cursor-pointer " >Try Again</button>
    </>
}