import Link from "next/link";

export default function F2(){
    return <div className="text-lg text-lime-500 p-3 bg-gradient-to-tr from-gray-400 to-gray-600 " >
        <p> From P2 page</p>
        <Link href={'/f4'} className="text-fuchsia-900 p-3 text-center" >Navigate TO F4</Link>
        <Link href={'/f1/f2/inner-f2'} className="text-fuchsia-900 p-3 text-center" >Inner F2</Link>
    </div>
}