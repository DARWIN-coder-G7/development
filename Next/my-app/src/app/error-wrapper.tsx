"use client";

import "./globals.css";

import {  useState } from "react";

interface WrapperProps{
    children:React.ReactNode
}

const ErrorSimulator = ({message="An Error Occured",}:{message?:string}) =>{
    const [error,setError] = useState(false);
    if(error) throw new Error(message);
    return(
        <button
        title="simulate An Error"
        className="bg-red-950 text-red-500 rounded p-1 leading-none font-semibold text-sm"
        onClick={()=> setError(true)}
        >
            Simulate An Error
        </button>
    )
}

export const ErrorWrapper =({children}:WrapperProps) =>{
    return(
        <div className="flex flex-col rounded-lg mt-8 relative p-4 border border-gray-300" >
            <div className="absolute top-0 left-4 -translate-y-1.5 ">
                <ErrorSimulator message="Simulated Error In Root Layout" />
            </div>
            {children}
        </div>
    )
}