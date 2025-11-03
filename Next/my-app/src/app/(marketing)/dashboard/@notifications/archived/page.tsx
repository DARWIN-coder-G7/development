import Link from "next/link";

export default function Archived (){
    return <>
    <div className="p-3 text-xl text-blue-600">Archived</div>
    <Link className="p-3 text-center text-neutral-600" href="/dashboard">Return To default Notifications</Link>
    </>
}