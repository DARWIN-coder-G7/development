import Link from "next/link";

export default function InterceptedF2(){
    return <div className="text-lg text-lime-500 p-3 bg-gradient-to-tr from-gray-400 to-gray-600 " >
        <p>
        Hey Hi From Intercepted From 
        </p>
        <Link href={'/f4'} className="text-fuchsia-900 p-3 text-center" >Navigate TO F4</Link>
    </div>
}