import Link from "next/link";

export default function F1(){
    return <>
     <div className="text-lg text-lime-500 p-3 bg-gradient-to-tr from-gray-400 to-gray-600 " >F1 Page</div>
     <Link href="/f1/f2" className="text-blue-600 p-2 text-center text-sm text-shadow-blue-900" >Navigate To F2</Link>
     <Link href="/f3" className="text-blue-600 p-2 text-center text-sm text-shadow-blue-900" >Navigate To F3</Link>
     <Link href="/f4" className="text-blue-600 p-2 text-center text-sm text-shadow-blue-900" >Navigate To F4</Link>
    </>
}
