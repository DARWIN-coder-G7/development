import Link from "next/link";

export default function InnerF2(){
    return <>
    <div className=" p-2 text-center" >
        <p className="text-2xl text-teal-500 mb-1.5" >Inner F2 will be reachable by f1/12/inner-f2</p>
        <Link href="/f5" className="text-black" >navigate user To F5</Link>
         </div>
    </>;
}